/**
 * JSON-LD builders.
 *
 * Emitted as one @graph per page by scripts/build-static.mjs, so the markup is
 * present in the served HTML rather than injected after hydration — crawlers
 * that read structured data parse the initial response.
 *
 * Two rules shape everything here:
 *   - Never claim anything the site does not show. FAQ entities are built from
 *     the same constants the pages render (see data/faqs.js).
 *   - Never claim anything that is not true. Contact details and rating figures
 *     stay out until the flags in data/site.js are flipped; see the note there.
 *
 * Import-free of React on purpose — the build script loads this from Node.
 */

// Extensions are explicit: scripts/build-static.mjs imports this module from
// plain Node, where ESM does not resolve extensionless paths the way Vite does.
import { SITE, LIVE_CITIES, SOON_CITIES, PAYMENT_METHODS } from '../data/site.js'
import { CATEGORIES } from '../data/services.js'
import { FAQS_BY_PATH } from '../data/faqs.js'
import {
  SITE_URL,
  OG_IMAGE_PATH,
  ROUTES,
  absoluteUrl,
  normalizePath,
} from '../data/seo.js'

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const BUSINESS_ID = `${SITE_URL}/#localbusiness`

const cityNode = (name) => ({ '@type': 'City', name })

/** E.164 for machines; the display string in site.js keeps its spaces. */
const e164 = (phone) => phone.replace(/[^\d+]/g, '')

function organizationNode() {
  const sameAs = Object.values(SITE.social).filter(Boolean)

  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.address.company,
    url: SITE_URL,
    description: SITE.secondaryTagline,
    slogan: SITE.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon-512.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(OG_IMAGE_PATH),
    email: SITE.supportEmail,
    areaServed: LIVE_CITIES.map((c) => cityNode(c.name)),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.supportEmail,
        availableLanguage: ['en', 'hi', 'mr', 'kn', 'ta'],
        ...(SITE.contactVerified ? { telephone: e164(SITE.phone) } : {}),
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.businessEmail,
        availableLanguage: ['en', 'hi'],
      },
    ],
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.tagline,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  }
}

/**
 * Only emitted once the address and phone are real. A LocalBusiness with no
 * verifiable location is worth less than no LocalBusiness at all.
 */
function localBusinessNode() {
  if (!SITE.contactVerified) return null

  const { address } = SITE
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    parentOrganization: { '@id': ORG_ID },
    url: SITE_URL,
    image: absoluteUrl(OG_IMAGE_PATH),
    telephone: e164(SITE.phone),
    email: SITE.supportEmail,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    // Derived, so the machine-readable list and the one shown in the footer
    // and on the How it works page cannot drift apart.
    paymentAccepted: PAYMENT_METHODS.map((m) => m.schema).join(', '),
    openingHours: 'Mo-Su 00:00-24:00',
    address: Object.fromEntries(
      Object.entries({
        '@type': 'PostalAddress',
        streetAddress: address.line1,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      }).filter(([, value]) => value)
    ),
    areaServed: [
      ...LIVE_CITIES.map((c) => cityNode(c.name)),
      ...SOON_CITIES.map((c) => cityNode(c.name)),
    ],
  }
}

function faqNode(path) {
  const items = FAQS_BY_PATH[path]
  if (!items?.length) return null

  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/**
 * One Service per category, each carrying its real fixed-price offers.
 *
 * aggregateRating is gated on metricsVerified and deliberately attached here
 * rather than to Organization or LocalBusiness — Google ignores self-serving
 * review markup on those two types.
 */
function serviceNodes() {
  const areaServed = LIVE_CITIES.map((c) => cityNode(c.name))

  return CATEGORIES.map((cat) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/services#${cat.slug}`,
    serviceType: cat.name,
    name: `${cat.name} services`,
    description: cat.blurb,
    provider: { '@id': ORG_ID },
    areaServed,
    ...(SITE.metricsVerified
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            ratingCount: '38412',
          },
        }
      : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${cat.name} — fixed prices`,
      itemListElement: cat.items.map((item) => ({
        '@type': 'Offer',
        name: item.name,
        price: String(item.price),
        priceCurrency: 'INR',
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          serviceType: cat.name,
        },
      })),
    },
  }))
}

function breadcrumbNode(route) {
  if (route.path === '/') return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(route.path)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: route.crumb,
        item: absoluteUrl(route.path),
      },
    ],
  }
}

/** The full @graph for one route, ready to serialise. */
export function graphFor(pathname) {
  const path = normalizePath(pathname)
  const route = ROUTES.find((r) => r.path === path)
  if (!route) return null

  const nodes = [organizationNode(), websiteNode()]

  if (path === '/') nodes.push(localBusinessNode())
  if (path === '/services') nodes.push(...serviceNodes())
  nodes.push(faqNode(path), breadcrumbNode(route))

  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}

/**
 * Serialise for inlining in a <script> tag. Escaping `<` is what stops a
 * stray "</script>" inside any copy from terminating the block early.
 */
export function serializeLd(graph) {
  return JSON.stringify(graph).replace(/</g, '\\u003c')
}
