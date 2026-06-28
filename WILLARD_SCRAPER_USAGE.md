# Willard Selector Scraper Usage

This project includes a hardened scraper:

- `willard_selector_scraper.py`

It pulls data from the same API used by the public battery selector flow:

- Vehicle type -> manufacturer -> year -> model -> battery list

## Install dependency

```bash
pip install requests
```

## Focused run (recommended)

Nine passenger brands, 2012 and newer only. Writes to a separate CSV so the full legacy database is untouched.

```bash
python willard_selector_scraper.py \
  --output willard_battery_database_focused.csv \
  --vehicle-types "Passenger & SUV" \
  --manufacturers "Toyota,Suzuki,Volkswagen,Hyundai,Ford,GWM,Chery,Jetour,Mahindra" \
  --min-year 2012
```

Or:

```bash
pnpm scrape:willard:focused
```

After any scrape, enforce passenger-only brand/year rules:

```bash
pnpm filter:willard-focused
```

The site API prefers `willard_battery_database_focused.csv` when that file exists.

**Passenger brands kept:** Toyota, Hyundai, Ford, Volkswagen, Suzuki, Mahindra, Chery, GWM, Jetour (2012+ only).

## Full extraction run (legacy)

```bash
python willard_selector_scraper.py --output willard_battery_database.csv
```

## Safe test run (small sample)

```bash
python willard_selector_scraper.py \
  --output willard_battery_sample.csv \
  --manufacturers Toyota \
  --min-year 2020 \
  --max-vehicle-types 1 \
  --max-years 1 \
  --max-models 3
```

## Useful options

- `--manufacturers "Toyota,Ford"` : limit to selected brands (`Toyota` also matches Toyota Crown and Toyota/Hino)
- `--min-year 2012` : skip years before 2012
- `--delay 0.35` : base sleep between requests
- `--jitter 0.15` : random delay added to each request
- `--timeout 20` : request timeout in seconds
- `--retries 4` : retries per API call
- `--backoff 1.0` : exponential backoff factor
- `--vehicle-types "Passenger & SUV,Commercial"` : limit extraction to selected groups

## Resume behavior

The script writes rows progressively and flushes to disk continuously.

If interrupted, re-run the same command:

- existing rows are loaded from CSV
- duplicates are skipped
- missing rows continue appending

## Output columns

- `vehicle_type`
- `manufacturer`
- `year`
- `model`
- `battery_code`
- `replacement_type`
- `technology`
- `description`
- `image_link`
