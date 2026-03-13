# What Are My Core Values

A static single-page web app for discovering your core values through an interactive card-sorting game. Hosted on GitHub Pages at whataremycorevalues.org.

## Architecture
- Single-file app: all HTML, CSS, and JS live in `index.html`
- No build tools, no framework — vanilla HTML/CSS/JS
- Hosted via GitHub Pages (CNAME: whataremycorevalues.org)
- Fonts: DM Sans (body) + Fraunces (headings) via Google Fonts
- Color palette uses CSS custom properties (--sunset-orange, --ocean-blue, etc.)

## Development
- To preview locally, open `index.html` in a browser (no server needed)
- Deploying = pushing to `main` (GitHub Pages auto-deploys)

## Conventions
- Keep everything in a single `index.html` file — do not split into separate CSS/JS files
- Mobile-first responsive design using clamp() and media queries
- Use the existing CSS custom properties for colors; don't introduce new hex values
