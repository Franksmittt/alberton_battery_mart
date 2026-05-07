# Willard Selector Scraper Usage

This project includes a hardened scraper:

- `willard_selector_scraper.py`

It pulls data from the same API used by the public battery selector flow:

- Vehicle type -> manufacturer -> year -> model -> battery list

## Install dependency

```bash
pip install requests
```

## Full extraction run

```bash
python willard_selector_scraper.py --output willard_battery_database.csv
```

## Safe test run (small sample)

```bash
python willard_selector_scraper.py \
  --output willard_battery_sample.csv \
  --max-vehicle-types 1 \
  --max-manufacturers 2 \
  --max-years 1 \
  --max-models 3
```

## Useful options

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
