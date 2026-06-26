#!/usr/bin/env python3
"""
Willard battery selector scraper.

This script extracts fitment data from the same API used by:
https://willard.co.za/battery-selection-tool/

Key reliability features:
- HTTP retry with exponential backoff
- Request timeout handling
- Polite rate limiting between API calls
- Progressive CSV appends + flush (data is persisted while running)
- Safe resume behavior (deduplicates against already-written rows)
"""

from __future__ import annotations

import argparse
import csv
import os
import random
import re
import sys
import time
from dataclasses import dataclass
from typing import Dict, Iterable, List, Set, Tuple

import requests
from requests.adapters import HTTPAdapter
from urllib3.util import Retry

API_BASE = "https://www.action.ecatonline.co.za/EcatApi/Autox"
CATALOGUE_ID = "6265ABC8-D533-4E31-85CA-B94B3BC167A8"
CSV_FIELDS = [
    "vehicle_type",
    "manufacturer",
    "year",
    "model",
    "battery_code",
    "replacement_type",
    "technology",
    "description",
    "image_link",
]


@dataclass
class Config:
    output_file: str
    timeout: float
    delay_seconds: float
    max_retries: int
    backoff_factor: float
    request_jitter: float
    vehicle_type_filter: Set[str]
    manufacturer_filter: Set[str]
    min_year: int
    max_vehicle_types: int
    max_manufacturers: int
    max_years: int
    max_models: int


def normalize_vehicle_type(value: str) -> str:
    return value.strip().lower()


def normalize_manufacturer(value: str) -> str:
    return value.strip().lower()


def manufacturer_matches(name: str, cfg: Config) -> bool:
    if not cfg.manufacturer_filter:
        return True
    normalized = normalize_manufacturer(name)
    for allowed in cfg.manufacturer_filter:
        allowed_normalized = normalize_manufacturer(allowed)
        if normalized == allowed_normalized:
            return True
        if allowed_normalized == "toyota" and normalized.startswith("toyota"):
            return True
    return False


def year_matches(year: str, cfg: Config) -> bool:
    if cfg.min_year <= 0:
        return True
    try:
        return int(str(year).strip()) >= cfg.min_year
    except ValueError:
        return False


def sanitize_text(value: str) -> str:
    value = (value or "").replace("\r", " ").replace("\n", " | ")
    value = re.sub(r"\s+", " ", value).strip()
    # Keep this mapping to normalize legacy wording.
    value = re.sub(r"\bcalcium\b", "Lead Acid", value, flags=re.IGNORECASE)
    return value


def build_session(cfg: Config) -> requests.Session:
    retry = Retry(
        total=cfg.max_retries,
        connect=cfg.max_retries,
        read=cfg.max_retries,
        status=cfg.max_retries,
        backoff_factor=cfg.backoff_factor,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=frozenset(["GET"]),
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)

    session = requests.Session()
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    session.headers.update(
        {
            "Accept": "application/json",
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
        }
    )
    return session


def call_api(session: requests.Session, endpoint: str, params: Dict[str, str], cfg: Config) -> List[Dict]:
    query = dict(params)
    query["catalogue"] = CATALOGUE_ID
    url = f"{API_BASE}{endpoint}"

    for attempt in range(1, cfg.max_retries + 1):
        try:
            response = session.get(url, params=query, timeout=cfg.timeout)
            if response.status_code >= 400:
                raise requests.HTTPError(
                    f"{response.status_code} for {endpoint} with params={query}"
                )
            payload = response.json()
            if isinstance(payload, list):
                return payload
            return []
        except Exception as exc:
            if attempt >= cfg.max_retries:
                print(
                    f"[ERROR] Endpoint {endpoint} failed after {attempt} attempts: {exc}",
                    file=sys.stderr,
                )
                return []
            sleep_for = cfg.backoff_factor * (2 ** (attempt - 1))
            print(
                f"[WARN] {endpoint} attempt {attempt}/{cfg.max_retries} failed: {exc}. "
                f"Retrying in {sleep_for:.1f}s..."
            )
            time.sleep(sleep_for)
        finally:
            throttle = cfg.delay_seconds + random.uniform(0, cfg.request_jitter)
            if throttle > 0:
                time.sleep(throttle)

    return []


def load_existing_keys(output_file: str) -> Set[Tuple[str, ...]]:
    if not os.path.exists(output_file):
        return set()

    keys: Set[Tuple[str, ...]] = set()
    try:
        with open(output_file, "r", newline="", encoding="utf-8") as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                key = (
                    row.get("vehicle_type", ""),
                    row.get("manufacturer", ""),
                    row.get("year", ""),
                    row.get("model", ""),
                    row.get("battery_code", ""),
                    row.get("replacement_type", ""),
                    row.get("technology", ""),
                    row.get("image_link", ""),
                )
                keys.add(key)
    except Exception as exc:
        print(f"[WARN] Could not read existing CSV for resume keys: {exc}", file=sys.stderr)
    return keys


def maybe_write_header(output_file: str) -> None:
    if os.path.exists(output_file) and os.path.getsize(output_file) > 0:
        return
    with open(output_file, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_FIELDS)
        writer.writeheader()


def limit_iter(items: Iterable[Dict], max_items: int) -> Iterable[Dict]:
    if max_items <= 0:
        yield from items
        return
    for idx, item in enumerate(items):
        if idx >= max_items:
            break
        yield item


def run(cfg: Config) -> None:
    session = build_session(cfg)
    maybe_write_header(cfg.output_file)
    seen_keys = load_existing_keys(cfg.output_file)

    total_written = 0
    total_seen = 0

    vehicle_types = call_api(session, "/VehicleType", {}, cfg)
    if not vehicle_types:
        raise RuntimeError("No vehicle types returned from API.")

    with open(cfg.output_file, "a", newline="", encoding="utf-8") as out_fh:
        writer = csv.DictWriter(out_fh, fieldnames=CSV_FIELDS)

        for vt_node in limit_iter(vehicle_types, cfg.max_vehicle_types):
            vt = (vt_node.get("name") or "").strip()
            if not vt:
                continue
            if cfg.vehicle_type_filter and normalize_vehicle_type(vt) not in cfg.vehicle_type_filter:
                continue

            print(f"\n=== Vehicle Type: {vt} ===")
            manufacturers = call_api(session, "/Manufacturer", {"vt": vt}, cfg)

            for manu_node in limit_iter(manufacturers, cfg.max_manufacturers):
                manu = (manu_node.get("name") or "").strip()
                if not manu:
                    continue
                if not manufacturer_matches(manu, cfg):
                    continue
                print(f"-> Manufacturer: {manu}")

                years = call_api(session, "/Year", {"vt": vt, "manu": manu}, cfg)
                for year_node in limit_iter(years, cfg.max_years):
                    year = str(year_node.get("year") or "").strip()
                    if not year:
                        continue
                    if not year_matches(year, cfg):
                        continue

                    models = call_api(
                        session,
                        "/ModelType",
                        {"vt": vt, "manu": manu, "year": year},
                        cfg,
                    )
                    for model_node in limit_iter(models, cfg.max_models):
                        model = (model_node.get("name") or "").strip()
                        if not model:
                            continue

                        batteries = call_api(
                            session,
                            "/Battery",
                            {"vt": vt, "manu": manu, "year": year, "mt": model},
                            cfg,
                        )
                        if not batteries:
                            continue

                        for bat in batteries:
                            total_seen += 1
                            code = sanitize_text(str(bat.get("code", "")))
                            replacement_type = sanitize_text(str(bat.get("replacement_type", "")))
                            technology = sanitize_text(str(bat.get("technology", "")))
                            description = sanitize_text(str(bat.get("description", "")))
                            image_link = sanitize_text(str(bat.get("imagelink", "")))

                            row_key = (
                                vt,
                                manu,
                                year,
                                model,
                                code,
                                replacement_type,
                                technology,
                                image_link,
                            )
                            if row_key in seen_keys:
                                continue

                            row = {
                                "vehicle_type": vt,
                                "manufacturer": manu,
                                "year": year,
                                "model": model,
                                "battery_code": code,
                                "replacement_type": replacement_type,
                                "technology": technology,
                                "description": description,
                                "image_link": image_link,
                            }
                            writer.writerow(row)
                            out_fh.flush()
                            seen_keys.add(row_key)
                            total_written += 1
                            print(
                                f"   [saved] {manu} {model} ({year}) -> {code or 'UNKNOWN'}"
                            )

    print("\nDone.")
    print(f"Rows examined: {total_seen}")
    print(f"Rows written:  {total_written}")
    print(f"Output:        {os.path.abspath(cfg.output_file)}")


def parse_args() -> Config:
    parser = argparse.ArgumentParser(
        description="Scrape Willard battery selector API data to CSV."
    )
    parser.add_argument(
        "--output",
        default="willard_battery_database.csv",
        help="Output CSV file path.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=20.0,
        help="Per-request timeout in seconds.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.35,
        help="Base delay in seconds between requests.",
    )
    parser.add_argument(
        "--jitter",
        type=float,
        default=0.15,
        help="Random jitter added to each request delay.",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=4,
        help="Maximum retry attempts per endpoint call.",
    )
    parser.add_argument(
        "--backoff",
        type=float,
        default=1.0,
        help="Exponential backoff factor.",
    )
    parser.add_argument(
        "--manufacturers",
        default="",
        help=(
            "Comma-separated manufacturer filter, e.g. "
            "\"Toyota,Suzuki,Volkswagen\". Toyota also matches Toyota Crown and Toyota/Hino."
        ),
    )
    parser.add_argument(
        "--min-year",
        type=int,
        default=0,
        help="Only include model years from this year upward (e.g. 2012).",
    )
    parser.add_argument(
        "--vehicle-types",
        default="",
        help=(
            "Comma-separated vehicle type filter, e.g. "
            "\"Passenger & SUV,Commercial\"."
        ),
    )
    parser.add_argument(
        "--max-vehicle-types",
        type=int,
        default=0,
        help="Debug limiter: max vehicle types to process (0 = all).",
    )
    parser.add_argument(
        "--max-manufacturers",
        type=int,
        default=0,
        help="Debug limiter: max manufacturers per vehicle type (0 = all).",
    )
    parser.add_argument(
        "--max-years",
        type=int,
        default=0,
        help="Debug limiter: max years per manufacturer (0 = all).",
    )
    parser.add_argument(
        "--max-models",
        type=int,
        default=0,
        help="Debug limiter: max models per year (0 = all).",
    )

    args = parser.parse_args()

    vehicle_type_filter: Set[str] = set()
    if args.vehicle_types.strip():
        vehicle_type_filter = {
            normalize_vehicle_type(chunk)
            for chunk in args.vehicle_types.split(",")
            if chunk.strip()
        }

    manufacturer_filter: Set[str] = set()
    if args.manufacturers.strip():
        manufacturer_filter = {
            chunk.strip()
            for chunk in args.manufacturers.split(",")
            if chunk.strip()
        }

    return Config(
        output_file=args.output,
        timeout=args.timeout,
        delay_seconds=args.delay,
        max_retries=max(1, args.retries),
        backoff_factor=max(0.1, args.backoff),
        request_jitter=max(0.0, args.jitter),
        vehicle_type_filter=vehicle_type_filter,
        manufacturer_filter=manufacturer_filter,
        min_year=max(0, args.min_year),
        max_vehicle_types=max(0, args.max_vehicle_types),
        max_manufacturers=max(0, args.max_manufacturers),
        max_years=max(0, args.max_years),
        max_models=max(0, args.max_models),
    )


if __name__ == "__main__":
    try:
        configuration = parse_args()
        run(configuration)
    except KeyboardInterrupt:
        print("\nInterrupted by user. Progressive writes are preserved.")
        sys.exit(130)
    except Exception as err:
        print(f"\nFatal error: {err}", file=sys.stderr)
        sys.exit(1)
