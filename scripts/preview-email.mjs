/**
 * Renders docs/emailjs-booking-template.html with real data from the app and
 * writes it to dist/, so the template can be checked in a browser without
 * sending anything through EmailJS.
 *
 * Two variants are produced, because they read differently: a fixed-price job
 * and a "from" job, where the total is an estimate and the payment note changes.
 *
 *   npm run preview:email
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const TEMPLATE = 'docs/emailjs-booking-template.html'
const OUT_DIR = 'dist'

const VARIANTS = [
  { file: 'email-preview-fixed.html', slug: 'electrician', service: 'Fan Installation', hours: 1 },
  { file: 'email-preview-hourly.html', slug: 'cleaning', service: 'Basic Home Cleaning', hours: 3 },
  { file: 'email-preview-estimate.html', slug: 'painting', service: 'Wall Painting', hours: 1 },
]

const SAMPLE = {
  name: 'Priya Sharma',
  mobile: '+91 9876543210',
  email: 'priya@example.com',
  address: 'Flat 402, Sai Residency, Road No. 12',
  landmark: 'Opposite Reliance Fresh',
  city: 'Hyderabad',
}

/** The same substitution EmailJS does: {{{raw}}} first, then {{escaped}}. */
function render(template, params) {
  return template
    .replace(/\{\{\{\s*([\w.]+)\s*\}\}\}/g, (_, k) => params[k] ?? '')
    .replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => params[k] ?? '')
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { CATEGORIES } = await vite.ssrLoadModule('/src/data/services.js')
  const { buildQuote, makeReference } = await vite.ssrLoadModule('/src/lib/quote.js')
  const { bookingTemplateParams } = await vite.ssrLoadModule('/src/lib/email.js')

  const template = await readFile(TEMPLATE, 'utf8')
  await mkdir(OUT_DIR, { recursive: true })

  for (const variant of VARIANTS) {
    const cat = CATEGORIES.find((c) => c.slug === variant.slug)
    const item = cat.items.find((i) => i.name === variant.service)
    const quote = buildQuote({ item, cat, hours: variant.hours })
    const params = bookingTemplateParams({
      booking: SAMPLE,
      quote,
      reference: makeReference(),
    })

    const html = render(template, params)
    const leftover = html.match(/\{\{[^}]*\}\}/g)
    if (leftover) {
      console.error(`  ✗ ${variant.file}: unresolved ${[...new Set(leftover)].join(', ')}`)
      process.exitCode = 1
    }

    await writeFile(`${OUT_DIR}/${variant.file}`, html)
    console.log(`  ${variant.service.padEnd(20)} → ${OUT_DIR}/${variant.file}  (${quote.totalLabel})`)
  }

  console.log('\nOpen them in a browser to check the layout.')
} finally {
  await vite.close()
}
