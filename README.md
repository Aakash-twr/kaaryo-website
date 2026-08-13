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
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
  components/   Feature and UI components, grouped by page or role
  data/         Site copy and content (services, testimonials, FAQs, site info)
  pages/        Route-level pages
  App.jsx       Router and layout shell
  main.jsx      Entry point
```

Site-wide details — company name, contact info, coverage cities, and headline stats — live in `src/data/site.js`.
