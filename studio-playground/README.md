# Local Story Template Playground

Tiny standalone editor for Alberton Battery Mart **9:16 marketing story templates**.

No Next.js. No full website. No `node_modules`. Just open this folder in a browser.

## Why this exists

The full site (and especially `node_modules`) is large. This folder is only the story templates so you can tweak layouts locally, then apply winners to the real React studio later.

## Get only this folder (low disk)

### Option A — download directory in browser
1. Open the folder on GitHub: `studio-playground/`
2. Use a “Download GitHub directory” tool (e.g. https://download-directory.github.io/) with the folder URL
3. Unzip somewhere with free space

### Option B — git sparse checkout (small clone)
```bash
git clone --filter=blob:none --sparse https://github.com/Franksmittt/alberton_battery_mart.git abm-studio-playground
cd abm-studio-playground
git sparse-checkout set studio-playground
```
Only `studio-playground/` is checked out.

## Run it

Any of these:

- Double-click `studio-playground/index.html`
- Or from this folder:
  ```bash
  python3 -m http.server 8765
  ```
  then open http://localhost:8765

Password is not required here (this is a local tool).

## Edit templates

| What | File |
|---|---|
| Layout / colors / type | `css/templates.css` |
| Markup structure | `js/templates.js` |
| Sample products | `js/data.js` |
| Studio chrome UI | `css/shell.css`, `index.html`, `js/app.js` |

Preview updates after a refresh (or soft-reload). Canvas is **360×640** (same proportions as production **1080×1920** — 3× scale when ported).

## Apply winners to the live site

When a template looks right:

1. Note the template id (e.g. `industrial`, `mesh`)
2. Send the changed `css/templates.css` / `js/templates.js` snippets (or a zip of this folder)
3. Ask the agent to **port playground → React** under `src/components/studio/marketing/templates/`
4. One GitHub PR / Vercel deploy for the batch

Do **not** expect this playground to deploy on Vercel as the public site — it is a local design tool only.
