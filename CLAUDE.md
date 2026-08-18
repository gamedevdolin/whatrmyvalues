# What Are My Core Values

A free, interactive card-sorting web app that helps people discover their core values. Live at www.WhatAreMyCoreValues.org.

## Project Context
- Creator: Adam Dolin — designer, UX designer, creative lead, and developer (via Claude)
- Collaborator: A psychologist partner (joining soon) who will guide the behavioral science aspects
- Goal: A free public tool grounded in real psychology, not a commercial product
- The values list and descriptions will be collaboratively refined with the psychologist over time

## Architecture
- **Frontend:** Single-file app — all HTML, CSS, and JS live in `index.html`. No frameworks, no build tools.
- **Hosting:** Netlify (auto-deploys on push to `main`)
- **Domain:** whataremycorevalues.org (DNS via Cloudflare)
- **Database:** Neon PostgreSQL via Netlify extension (`NETLIFY_DATABASE_URL` env var, accessed via `@netlify/neon`)
- **Serverless functions:** `netlify/functions/` directory
- **Repository:** GitHub

## Design System
- **Fonts:** DM Sans (body, weights 400/500/600) + Fraunces (headings, weights 600/700) via Google Fonts
- **Color palette:** CSS custom properties defined in `:root` — use these exclusively:
  - `--sunset-orange` (#E07A5F) — primary brand
  - `--sunset-gold` (#F2CC8F), `--sunset-coral` (#F4A261) — warm accents
  - `--deep-brown` (#3D2C29) — dark text
  - `--cream` (#FAF8F5), `--light-gray` (#E8E4E0) — backgrounds
  - `--ocean-blue` (#5B8A8A), `--muted-sage` (#81B29A) — cool accents
- **Do not** introduce new hex values or colors outside this palette

## Game Flow (subject to change)
Users choose from the full values list (56 as of Aug 2026, see `values.json`) → 10 → 5 → 3 across multiple screens. The number of screens, the specific narrowing steps, and the flow may all evolve as we refine the experience with the psychologist:
1. **Intro** — explains the exercise
2. **Select 10** — browse all values in a card grid, pick 10
3. **Narrow to 5** — keep/remove toggle to cut to 5 (all start selected)
4. **Pick top 3** — positive selection: all start unchecked, pick exactly 3 (timer feature exists but is currently disabled)
5. **Results** — shows final 3 values with definitions, optional feedback form, shareable image
6. **SMART goal (optional)** — "Turn a value into action →" on the results screen opens a guided SMART-goal form for one chosen value (stored locally only, designed with the psychologist)

## Conventions
- **Keep everything in `index.html`** — do not split into separate CSS/JS files
- **Mobile-first responsive design** using `clamp()` and media queries
- **Use existing CSS custom properties** for all colors
- **Handle loading and error states** in all UI interactions
- **Never store secrets in code** — use environment variables
- When adding serverless functions, use **parameterized queries** (already done via `@netlify/neon`) — never concatenate user input into SQL
- Batch API calls where possible — never loop individual requests

## Data & Content
- The values and their definitions live in `values.json`, committed to the repo — this is the source of truth the app loads at runtime
- `index.html` also has a hardcoded copy of the list as a fallback in case `values.json` fails to load — keep both in sync when editing values
- History: values briefly lived in a Notion database fetched at build time; that integration was removed in Aug 2026 when Adam stopped using Notion

## Disabled Features (commented out in index.html)
- **Kindred Spirits:** Matching users to philosophical schools and fictional characters based on their values. ~200 lines of commented code including 15 philosophy profiles and 20 character profiles.
- **Timer round:** 10-second countdown on the final selection screen to force gut decisions. Uses Web Audio API for alarm.
- These are intentionally disabled, not bugs. Do not remove the commented code without asking.

## Security Requirements
- Feedback data (values selected, email, free text) must be **private and only accessible to Adam**
- No public GET endpoints for user-submitted data
- Serverless functions must validate input and reject malformed requests
- Use HTTPS everywhere (handled by Netlify + Cloudflare)
- Do not log sensitive user data (emails, feedback text) to console in production

## Development
- **Local preview:** Open `index.html` in a browser, or `npx serve .`
- **Deploy:** Push to `main` branch — Netlify auto-deploys
- **Database:** Neon PostgreSQL, connection string in `NETLIFY_DATABASE_URL` env var
- **Testing serverless functions locally:** `npx netlify dev`

## Working with Claude
- Adam is learning to code — explain technical decisions briefly when they're non-obvious
- When proposing changes, describe what the change does and why before implementing
- Prefer simple, readable code over clever abstractions
- When in doubt about UX or behavioral science decisions, flag them for Adam to discuss with the psychologist
- Don't refactor or "improve" code that isn't part of the current task
