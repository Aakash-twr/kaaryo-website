/**
 * Per-route metadata — the single source of truth, read from two places.
 *
 *  1. At build time by scripts/build-static.mjs, which bakes these values into
 *     a real HTML file per route. This is the half that matters: social
 *     scrapers (WhatsApp, LinkedIn, Slack, iMessage) do not execute
 *     JavaScript, so tags added by React are invisible to them.
 *  2. At runtime by <Seo>, which keeps the tab title, canonical and og tags
 *     honest across client-side navigation.
 *
 * Keep this file import-free — the build script loads it from plain Node.
 */

/** Canonical origin, no trailing slash. Every absolute URL is built off it. */
export const SITE_URL = 'https://kaaryo.vercel.app'

/** 1200×630 sharing card. Facebook and LinkedIn require an absolute URL. */
export const OG_IMAGE_PATH = '/og.png'
export const OG_IMAGE_ALT =
  'Kaaryo — verified home professionals at your door in 20 minutes.'

/**
 * Titles run ~40–60 characters so Google does not truncate them, and each one
 * leads with the page's own subject rather than the brand. Descriptions run
 * ~150–160 for the same reason.
 */
export const ROUTES = [
  {
    path: '/',
    crumb: 'Home',
    title: 'Kaaryo — Get any home work done in 20 minutes',
    description:
      'Book verified electricians, cleaners, cooks and plumbers across Hyderabad, Delhi and Bangalore. Fixed prices, live tracking, someone at your door in 20 minutes.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/services',
    crumb: 'Services',
    title: 'Home Services & Fixed Prices | Kaaryo',
    description:
      'Electrical, cleaning, cooking, plumbing, carpentry and painting from ₹79. You see the exact cost before booking, and we charge no platform fee.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/how-it-works',
    crumb: 'How it works',
    title: 'How Kaaryo Works — Book, Track, Done in 20 Minutes',
    description:
      'Pick a service at a fixed price, get matched with a verified professional in about 48 seconds, track them to your door, then pay by UPI, card or cash.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/for-workers',
    crumb: 'For workers',
    title: 'Work With Kaaryo — Flexible Hours, Weekly Payouts',
    description:
      'Join 500+ verified professionals earning on their own schedule. Weekly payouts every Monday, jobs near home, and 24×7 support in your own language.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/about',
    crumb: 'About',
    title: "About Kaaryo — Building India's Home Services Layer",
    description:
      'Why we verify every professional by hand, publish fixed prices, and launch a city only once we can keep the 20-minute promise. Made in India, for India.',
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    crumb: 'Contact',
    title: 'Contact Kaaryo — Support in 5 Languages, 24×7',
    description:
      'Talk to a human in Hindi, English, Marathi, Kannada or Tamil, any hour. Booking issues, partnerships, housing societies or feedback — someone here can help.',
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    crumb: 'Privacy Policy',
    title: 'Privacy Policy | Kaaryo',
    description:
      'What personal data Kaaryo collects, how we use and store it, who we share it with, and the rights and choices you have over it.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/terms-of-service',
    crumb: 'Terms of Service',
    title: 'Terms of Service | Kaaryo',
    description:
      'The terms governing your use of Kaaryo — bookings, fixed pricing, payments, cancellations, our guarantees and how disputes are resolved.',
    priority: '0.3',
    changefreq: 'yearly',
  },
]

/** Anything not in ROUTES is a 404: same shell, but never indexed. */
export const NOT_FOUND_SEO = {
  path: null,
  crumb: 'Not found',
  title: 'Page not found | Kaaryo',
  description:
    'The page you were looking for has moved or never existed. Everything that does exist is one tap away.',
  noindex: true,
}

const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]))

/** Trailing slashes are equivalent to us; '/' itself must survive the trim. */
export function normalizePath(pathname) {
  if (!pathname) return '/'
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export function seoFor(pathname) {
  return BY_PATH.get(normalizePath(pathname)) || NOT_FOUND_SEO
}

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path === '/' ? '' : path}`
