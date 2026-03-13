# What Are My Core Values

A single-page web app for discovering your core values through an interactive card-sorting game. Hosted on Netlify at whataremycorevalues.org.

## Architecture
- Single-file app: all HTML, CSS, and JS live in `index.html`
- No build tools, no framework — vanilla HTML/CSS/JS
- Hosted on Netlify (CNAME: whataremycorevalues.org)
- Netlify serverless functions in `netlify/functions/`
- Database: Neon PostgreSQL via Netlify extension (uses `NETLIFY_DATABASE_URL` env var, accessed via `@netlify/neon`)
- Fonts: DM Sans (body) + Fraunces (headings) via Google Fonts
- Color palette uses CSS custom properties (--sunset-orange, --ocean-blue, etc.)

## Development
- To preview locally, open `index.html` in a browser or use `npx serve .`
- Deploying = pushing to `main` (Netlify auto-deploys)

## Conventions
- Keep everything in a single `index.html` file — do not split into separate CSS/JS files
- Mobile-first responsive design using clamp() and media queries
- Use the existing CSS custom properties for colors; don't introduce new hex values
