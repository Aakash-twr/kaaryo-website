import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

/**
 * Site measurement. Two separate things:
 *
 *   Analytics    — page views and referrers, so there is some way to tell which
 *                  pages and channels actually bring bookings.
 *   SpeedInsights — real Core Web Vitals from real visitors, rather than a lab
 *                  score. This is the only way to confirm the font and code
 *                  splitting work in the README's Performance section holds up
 *                  on an average Indian mobile connection.
 *
 * Chosen because the site is already on Vercel, both scripts are served from
 * our own origin (no third-party connection on the critical path), and neither
 * sets a cookie or collects a device identifier. That last point is the reason
 * there is no consent banner here: cookieless, non-identifying measurement does
 * not require opt-in under the DPDP Act or GDPR. Swapping in a provider that
 * *does* set cookies — Google Analytics being the obvious one — would mean
 * adding a consent gate and rewriting the "Analytics and cookies" section of
 * the privacy policy.
 *
 * Both need switching on once in the Vercel dashboard (Project → Analytics, and
 * Project → Speed Insights). Until then these render a script that no-ops.
 *
 * To swap providers, replace the two components below; nothing else in the app
 * references them.
 */
export default function Analytics() {
  // Keeps local development out of the numbers, and avoids loading two scripts
  // that only resolve on Vercel's edge anyway.
  if (!import.meta.env.PROD) return null

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  )
}
