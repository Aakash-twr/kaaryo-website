import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  absoluteUrl,
  normalizePath,
  seoFor,
} from '../data/seo'
import { SITE } from '../data/site'

/**
 * Keeps the document head in sync with the current route.
 *
 * The build step already bakes correct tags into each route's HTML, which is
 * what social scrapers and crawlers read. This component covers the other
 * half: once React Router takes over navigation, no new document is fetched,
 * so the tab title, canonical and og tags would otherwise stay frozen on
 * whichever page the visitor happened to land on first.
 *
 * Mounted once in App — it derives everything from the pathname, so pages
 * carry no SEO code of their own.
 */

/** Upsert by attribute so repeat navigations mutate tags instead of stacking them. */
function meta(attr, key, content) {
  if (!content) return
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function link(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = seoFor(pathname)
    // Unknown paths render <NotFound>, so canonicalise them to the URL that
    // was actually requested rather than inventing one.
    const url = route.path ? absoluteUrl(route.path) : absoluteUrl(normalizePath(pathname))
    const image = absoluteUrl(OG_IMAGE_PATH)

    document.title = route.title

    meta('name', 'description', route.description)
    link('canonical', url)

    // Only the 404 shell is withheld from indexes; real routes inherit the
    // default from index.html, so this has to be reset both ways.
    meta('name', 'robots', route.noindex ? 'noindex, follow' : 'index, follow')

    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', SITE.name)
    meta('property', 'og:locale', 'en_IN')
    meta('property', 'og:title', route.title)
    meta('property', 'og:description', route.description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', image)
    meta('property', 'og:image:alt', OG_IMAGE_ALT)

    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', route.title)
    meta('name', 'twitter:description', route.description)
    meta('name', 'twitter:image', image)
    meta('name', 'twitter:image:alt', OG_IMAGE_ALT)
  }, [pathname])

  return null
}
