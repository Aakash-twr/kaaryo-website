import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import Seo from './components/Seo'
import Analytics from './components/Analytics'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BookingProvider from './context/BookingContext'

/**
 * Every page is split into its own chunk, so a visitor reading the home page no
 * longer downloads the earnings calculator, the India map geometry and seven
 * other pages before the hero can render.
 *
 * Splitting normally trades that for a request waterfall on deep links — the
 * shell has to parse and mount before it discovers which page chunk it needs.
 * scripts/build-static.mjs closes that gap: each route's HTML gets a
 * <link rel="modulepreload"> for its own chunk, so the page and the main bundle
 * download together and Suspense usually resolves without ever painting.
 */
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const ForWorkers = lazy(() => import('./pages/ForWorkers'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const NotFound = lazy(() => import('./pages/NotFound'))

/**
 * Holds roughly a viewport of height while a chunk resolves. Empty rather than
 * a spinner: with the chunk preloaded this is on screen for a frame at most, and
 * a spinner that flashes reads worse than nothing. The height stops the footer
 * from jumping up and back down.
 */
function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />
}

export default function App() {
  return (
    /**
     * Components animate with `m` rather than `motion`, and the feature set is
     * supplied here once. `motion` statically pulls in every feature — drag,
     * layout projection, path drawing — whether a page uses them or not; the
     * codebase uses none of the heavy ones, so `domAnimation` covers it at a
     * fraction of the bytes.
     *
     * strict only in development: it throws on any `motion.*` that slips back
     * in, which is exactly what you want while editing and never what you want
     * on a live marketing page, where the graceful path is a slightly larger
     * bundle rather than a blank screen.
     */
    <LazyMotion features={domAnimation} strict={import.meta.env.DEV}>
      <BookingProvider>
        <Seo />
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-paper-50"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/for-workers" element={<ForWorkers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <Analytics />
      </BookingProvider>
    </LazyMotion>
  )
}
