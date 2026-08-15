/**
 * Post-build step: turn the single SPA shell into one real HTML document per
 * route, then emit the sitemap.
 *
 * Why this exists
 * ---------------
 * The site renders on the client. Google's crawler executes JavaScript and
 * would eventually see tags injected by <Seo>, but the scrapers that matter
 * most for a consumer brand in India — WhatsApp, LinkedIn, Slack, iMessage,
 * Facebook — fetch the HTML once and never run a script. A link shared in any
 * of them reads only what is in the served response.
 *
 * So for every route in src/data/seo.js we copy dist/index.html, swap the block
 * between the `seo:start` / `seo:end` markers for that route's real metadata,
 * append its JSON-LD, and write dist/<route>/index.html. Vercel matches the
 * filesystem before applying the SPA rewrite in vercel.json, so those files are
 * served directly; React then hydrates and takes over navigation as usual.
 *
 * Nothing here duplicates copy — titles and descriptions come from
 * src/data/seo.js, structured data from src/lib/structuredData.js.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  ROUTES,
  NOT_FOUND_SEO,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  absoluteUrl,
} from '../src/data/seo.js'
import { SITE } from '../src/data/site.js'
import { graphFor, serializeLd } from '../src/lib/structuredData.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

/** Route path → the page module Vite built it from. */
const PAGE_MODULE = {
  '/': 'src/pages/Home.jsx',
  '/services': 'src/pages/Services.jsx',
  '/how-it-works': 'src/pages/HowItWorks.jsx',
  '/for-workers': 'src/pages/ForWorkers.jsx',
  '/about': 'src/pages/About.jsx',
  '/contact': 'src/pages/Contact.jsx',
  '/privacy-policy': 'src/pages/PrivacyPolicy.jsx',
  '/terms-of-service': 'src/pages/TermsOfService.jsx',
  null: 'src/pages/NotFound.jsx',
}

/**
 * Resolve a page module to every chunk it needs, via Vite's build manifest.
 *
 * Pages are lazy, so the shell would otherwise have to boot before it could
 * discover which chunk to fetch — one round trip of dead time on every deep
 * link. Preloading the chunk (and its shared imports) alongside the entry
 * bundle collapses that back into a single parallel fetch.
 */
async function chunkPreloads(manifest, modulePath) {
  const entry = manifest[modulePath]
  if (!entry) return []

  const files = new Set()
  const walk = (key, depth = 0) => {
    const node = manifest[key]
    // Depth-cap guards against a cycle in the import graph hanging the build.
    if (!node || depth > 10) return
    if (node.file) files.add(node.file)
    for (const dep of node.imports || []) walk(dep, depth + 1)
  }
  walk(modulePath)

  // The entry chunk and its static imports already have tags in the shell.
  const shellChunks = new Set()
  const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)
  if (entryKey) {
    const walkEntry = (key, depth = 0) => {
      const node = manifest[key]
      if (!node || depth > 10) return
      shellChunks.add(node.file)
      for (const dep of node.imports || []) walkEntry(dep, depth + 1)
    }
    walkEntry(entryKey)
  }

  return [...files].filter((f) => !shellChunks.has(f))
}

const START = '<!-- seo:start'
const END = '<!-- seo:end -->'

/** Escape for an HTML attribute value. Copy contains apostrophes and ampersands. */
const attr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Returns null for absent content so the caller can drop the line entirely. */
const tag = (name, key, content) =>
  content ? `    <meta ${name}="${key}" content="${attr(content)}" />` : null

function headFor(route, preloads = []) {
  const image = absoluteUrl(OG_IMAGE_PATH)
  // The 404 shell answers on every unmatched path, so there is no single URL it
  // could honestly declare as canonical — it only declares that it is not to be
  // indexed.
  const url = route.path ? absoluteUrl(route.path) : null

  const lines = [
    `    <title>${attr(route.title)}</title>`,
    tag('name', 'description', route.description),
    tag('name', 'robots', route.noindex ? 'noindex, follow' : 'index, follow'),
    ...(url ? [`    <link rel="canonical" href="${attr(url)}" />`] : []),
    '',
    tag('property', 'og:type', 'website'),
    tag('property', 'og:site_name', SITE.name),
    tag('property', 'og:locale', 'en_IN'),
    tag('property', 'og:title', route.title),
    tag('property', 'og:description', route.description),
    tag('property', 'og:url', url),
    tag('property', 'og:image', image),
    tag('property', 'og:image:width', '1200'),
    tag('property', 'og:image:height', '630'),
    tag('property', 'og:image:alt', OG_IMAGE_ALT),
    '',
    tag('name', 'twitter:card', 'summary_large_image'),
    tag('name', 'twitter:title', route.title),
    tag('name', 'twitter:description', route.description),
    tag('name', 'twitter:image', image),
    tag('name', 'twitter:image:alt', OG_IMAGE_ALT),
  ]

  // Guarded on route.path: the 404 shell has none, and graphFor() normalises a
  // missing path to '/', which would hand it the home page's entities.
  const graph = route.path ? graphFor(route.path) : null
  if (graph) {
    lines.push(
      '',
      `    <script type="application/ld+json">${serializeLd(graph)}</script>`
    )
  }

  if (preloads.length) {
    lines.push(
      '',
      ...preloads.map((file) => `    <link rel="modulepreload" href="/${file}" />`)
    )
  }

  return lines.filter((line) => line !== null).join('\n')
}

/** Replace the marked block, keeping the markers so the output stays greppable. */
function render(shell, route, preloads = []) {
  const from = shell.indexOf(START)
  const to = shell.indexOf(END)
  if (from === -1 || to === -1) {
    throw new Error(
      'index.html is missing the seo:start / seo:end markers — build-static.mjs cannot inject per-route metadata.'
    )
  }
  return (
    shell.slice(0, from) +
    `<!-- seo: ${route.path || '404'} — generated by scripts/build-static.mjs, do not edit dist -->\n` +
    headFor(route, preloads) +
    '\n    ' +
    shell.slice(to)
  )
}

function sitemap(routes, lastmod) {
  const urls = routes
    .filter((r) => !r.noindex)
    .map((r) =>
      [
        '  <url>',
        `    <loc>${absoluteUrl(r.path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority}</priority>`,
        '  </url>',
      ].join('\n')
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function main() {
  const shellPath = join(DIST, 'index.html')
  const shell = await readFile(shellPath, 'utf8')
  const lastmod = new Date().toISOString().slice(0, 10)

  // Written by Vite when build.manifest is on. Absent means the config changed
  // and every page would silently lose its preload, so fail loudly instead.
  let manifest
  try {
    manifest = JSON.parse(await readFile(join(DIST, '.vite/manifest.json'), 'utf8'))
  } catch {
    throw new Error(
      'dist/.vite/manifest.json not found — set build.manifest = true in vite.config.js'
    )
  }

  for (const route of ROUTES) {
    const preloads = await chunkPreloads(manifest, PAGE_MODULE[route.path])
    if (!preloads.length) {
      console.warn(`  warning: no chunk found for ${route.path} — deep links will waterfall`)
    }
    const html = render(shell, route, preloads)
    // '/' overwrites the shell in place; every other route becomes a flat
    // sibling file. Paired with "cleanUrls": true in vercel.json that resolves
    // /about → about.html, and redirects /about.html back to /about so only one
    // URL is ever canonical.
    const outPath =
      route.path === '/' ? shellPath : join(DIST, `${route.path.slice(1)}.html`)

    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    console.log(
      `  ${route.path.padEnd(20)} → ${outPath.replace(`${ROOT}/`, '').padEnd(28)} +${preloads.length} preload${preloads.length === 1 ? '' : 's'}`
    )
  }

  // Vercel serves 404.html with a real 404 status on any unmatched path. Every
  // legitimate route above now has its own file, so the only requests reaching
  // this shell are genuine misses — which is why there is no SPA catch-all
  // rewrite in vercel.json. React still boots here and renders <NotFound>, so
  // the visitor gets the branded page and crawlers get an honest status code
  // instead of a 200 soft 404.
  const notFoundPreloads = await chunkPreloads(manifest, PAGE_MODULE[null])
  await writeFile(
    join(DIST, '404.html'),
    render(shell, NOT_FOUND_SEO, notFoundPreloads),
    'utf8'
  )
  console.log(`  ${'404'.padEnd(20)} → dist/404.html (noindex)`)

  await writeFile(join(DIST, 'sitemap.xml'), sitemap(ROUTES, lastmod), 'utf8')
  console.log(`  sitemap.xml          → ${ROUTES.length} urls, lastmod ${lastmod}`)

  const withheld = [
    !SITE.contactVerified && 'telephone/address (contactVerified: false)',
    !SITE.metricsVerified && 'aggregateRating (metricsVerified: false)',
  ].filter(Boolean)

  if (withheld.length) {
    console.log(`\n  note: JSON-LD omits ${withheld.join(' and ')} — see src/data/site.js`)
  }
}

main().catch((err) => {
  console.error(`\nbuild-static failed: ${err.message}`)
  process.exitCode = 1
})
