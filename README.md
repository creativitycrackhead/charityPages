# Masjid Community Ideas

A small static website where mosques and Islamic centers can browse low-cost, volunteer-run program ideas that save their community money and strengthen the jama'ah: a halal grocery co-op, a local zakat and qard hasan fund, a benefits help desk, community iftars, tutoring, and more.

Each idea has:

- a short summary and why it matters
- real organizations (many of them mosques or Muslim-led charities) already doing it, with links
- what you need, step-by-step actions (with "start when / done when" criteria for the bigger steps), and things to watch out for

Ideas are scored 1-5 on **savings**, **ease** and **reach**, and the site ranks them by total.

## Run it locally

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages

In the repository's **Settings → Pages**, set the source to "Deploy from a branch", pick the default branch and the `/ (root)` folder. The site will appear at `https://<user>.github.io/<repo>/`.

## Edit or add ideas

All content lives in [`assets/ideas.js`](assets/ideas.js). Add an object to `window.IDEAS` with the same fields as the others. Rank is computed from the scores automatically, so you only need to set `scores`. Categories are defined in `window.CATEGORIES` at the top of the same file.

## Files

| Path | What it is |
|---|---|
| `index.html` | Page shell |
| `assets/ideas.js` | All idea content and scores |
| `assets/app.js` | List, search, filter, sort and detail views (hash routes like `#/idea/<id>`) |
| `assets/styles.css` | Styles, with light and dark themes |
| `assets/favicon.svg` | Eight-pointed star icon |

The real-world examples were checked to exist in October 2026. Programs change, so confirm current details with each organization before relying on them.
