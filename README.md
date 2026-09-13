# Kaaryo Website

Marketing site for Kaaryo — an on-demand home services platform connecting customers with verified professionals.

Built with React, Vite, Tailwind CSS v4, React Router, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Bundle with Vite, then emit per-route HTML and the sitemap |
| `npm run preview` | Serve the production build locally |
| `npm run preview:email` | Render the booking email into `dist/` for eyeballing |

Note that `npm run preview` resolves routes differently from Vercel: it will
serve `/about.html` but falls back to the SPA shell for `/about`. That is a
preview-server limitation, not a build problem — see below.

## Project structure

```
src/
  components/   Feature and UI components, grouped by page or role
    Seo.jsx     Keeps the head in sync during client-side navigation
  data/         Site copy and content (services, testimonials, FAQs, site info)
    seo.js      Per-route titles, descriptions and sitemap weights
  context/
    BookingContext.jsx Opens the booking modal from anywhere in the tree
  lib/
    structuredData.js  JSON-LD builders
    quote.js           Turns a catalogue item into the priced breakdown
    email.js           EmailJS wrapper + confirmation template variables
  pages/        Route-level pages
  App.jsx       Router and layout shell
  main.jsx      Entry point
scripts/
  build-static.mjs     Post-build: one HTML file per route, plus sitemap.xml
```

Site-wide details — company name, contact info, coverage cities, and headline stats — live in `src/data/site.js`.

## Booking

Every row in the services list opens a booking modal: the customer sees an
itemised price breakdown, fills in name, mobile, email and address, and gets a
confirmation email.

**Setup.** Copy `.env.example` to `.env.local` and fill in three EmailJS values.
The full walkthrough is in [`docs/emailjs-template.md`](docs/emailjs-template.md);
the email itself is [`docs/emailjs-booking-template.html`](docs/emailjs-booking-template.html),
ready to paste into the EmailJS dashboard.

```bash
cp .env.example .env.local   # then fill in and restart `npm run dev`
```

**Deploying.** `.env.local` is gitignored and never reaches Vercel. Add the
same three variables under **Project → Settings → Environment Variables**
(Production *and* Preview) or the deployed build ships without them and every
booking fails closed. Keeping them out of git is deploy hygiene rather than
secrecy — all three are readable in the shipped JavaScript either way, which is
how EmailJS is designed. The real protection is the domain allowlist described
in `.env.example`.

Two things worth knowing:

- **Nothing is stored.** There is no backend. The only record of a booking is
  the email EmailJS sends, so set a **Bcc** to an ops inbox on the template —
  otherwise a customer gets confirmed and nobody at Kaaryo finds out.
- **Prices come from one place.** `src/lib/quote.js` builds the breakdown that
  the modal renders *and* the rows that go into the email, so the screen and
  the inbox cannot quote different totals. Prices themselves live in
  `src/data/services.js`.

`npm run preview:email` renders that template with real catalogue data — one
file per price shape — so you can check it in a browser without sending mail.

If the EmailJS variables are missing the form does not pretend to succeed — it
shows the customer an error and the support number, and in dev it tells you
which variables to set.

## SEO and sharing

The site renders on the client, but social scrapers (WhatsApp, LinkedIn, Slack,
iMessage) never run JavaScript — they read the HTML of the response and nothing
more. So `npm run build` does two things:

1. `vite build` produces the usual SPA bundle and shell.
2. `scripts/build-static.mjs` writes one real HTML file per route
   (`dist/about.html`, `dist/services.html`, …), each with its own title,
   description, canonical, Open Graph and Twitter tags, and JSON-LD. It also
   emits `dist/404.html` and `dist/sitemap.xml`.

`vercel.json` sets `cleanUrls: true`, so `/about` resolves to `about.html` and
`/about.html` redirects back to `/about`. There is deliberately **no** SPA
catch-all rewrite: every real route has its own file, so an unmatched path
should reach `404.html` and return an honest 404 status rather than a 200 soft
404. React still boots there and renders the branded `NotFound` page.

To change page copy, edit `src/data/seo.js` — never `index.html`, whose
`seo:start` / `seo:end` block is overwritten per route at build time. The tags
left in `index.html` are the home page's, and are what the dev server serves.

### Two switches before launch

`src/data/site.js` carries `contactVerified` and `metricsVerified`, both `false`.
While they are false the JSON-LD omits `telephone`, `address` and
`aggregateRating`. Publishing the placeholder phone number as machine-readable
business data is worse than publishing none, and review markup not backed by
real collected ratings breaches Google's structured-data policy. Flip each flag
once the underlying data is real. The build prints which fields it withheld.

## Performance

Three things keep the payload down. Each is easy to undo by accident, so the
reasoning is worth knowing before changing them.

**Fonts are self-hosted** from `public/fonts`, declared in `src/index.css`, and
the two faces the first screen needs are preloaded in `index.html`. They used to
come from a Google Fonts `@import url(...)`, which is the slowest option
available: the browser must download and parse the whole stylesheet before it
learns the fonts exist, then connect to two further origins. Only latin and
latin-ext are shipped, and latin-ext is **not** optional — it carries U+20B9
(₹). The `ital`, `wdth` and `opsz` axes were dropped because nothing in the
design uses them.

**Pages are lazily loaded** (`src/App.jsx`), so a visitor on the home page no
longer downloads the earnings calculator, the India map geometry and seven other
pages first. Code splitting normally costs a request waterfall on deep links;
`scripts/build-static.mjs` avoids that by reading Vite's build manifest and
writing a `<link rel="modulepreload">` for each route's own chunk into that
route's HTML. This is why `build.manifest` is enabled in `vite.config.js` — turn
it off and the build fails rather than silently regressing.

**Animations use `m`, not `motion`.** `motion` statically imports every feature,
including drag and layout projection that this site never uses. `App.jsx`
supplies the `domAnimation` feature set once via `LazyMotion`, which is
sufficient because nothing here uses `layout`, `layoutId` or `drag` — check that
before reaching for one. `strict` is on in development, so any `motion.*` that
creeps back in throws immediately; in production it is off, so the failure mode
is a larger bundle rather than a blank page.

Together these took the home page from **146.6 kB to 125.1 kB gzipped**, and a
legal page from 146.6 kB to **109.6 kB**, while removing two third-party origins
from the critical path.

## Analytics

`components/Analytics.jsx` mounts Vercel Web Analytics (page views, referrers)
and Speed Insights (real-visitor Core Web Vitals). It renders only in production
builds, so local development stays out of the numbers.

Both scripts are served from our own origin under `/_vercel/`, so no third-party
connection is added to the critical path, and neither sets a cookie or collects
a device identifier. That is the reason the site has no consent banner —
cookieless, non-identifying measurement does not require opt-in under the DPDP
Act or GDPR. **Swapping in a provider that does set cookies, Google Analytics
being the obvious candidate, means adding a consent gate and rewriting the
"Analytics and cookies" section of the privacy policy.** That section exists
because the measurement does; if you change one, change the other.

Both features must be switched on once in the Vercel dashboard (Project →
Analytics, and Project → Speed Insights). Until then the scripts load and no-op,
which is also why they 404 against a local static server.

### Regenerating the sharing card

`public/og.png` (1200×630) and the icon set were rendered once in headless
Chromium so the real Bricolage Grotesque face is used, and are committed. If the
brand or tagline changes they need re-rendering rather than editing by hand.
