import { CATEGORIES } from '../../data/services'

/**
 * Rates are derived from the real service catalogue rather than invented:
 * average ₹/minute across a category × 60 gives the gross hourly rate.
 * WORKER_SHARE is what the professional keeps (90%); Kaaryo retains 10%.
 * BILLABLE is the share of online hours that turn into paid work once travel
 * and gaps are counted.
 */
export const WORKER_SHARE = 0.9
export const BILLABLE = 0.35
export const BONUS_RATE = 0.08

export const CATEGORY_RATES = CATEGORIES.map((cat) => {
  const perMinute =
    cat.items.reduce((sum, item) => sum + item.price / item.mins, 0) / cat.items.length
  const avgMins = cat.items.reduce((sum, item) => sum + item.mins, 0) / cat.items.length
  return {
    slug: cat.slug,
    name: cat.name,
    accent: cat.accent,
    grossHourly: perMinute * 60,
    effectiveHourly: perMinute * 60 * WORKER_SHARE * BILLABLE,
    avgMins,
    avgTicket: cat.items.reduce((sum, item) => sum + item.price, 0) / cat.items.length,
  }
})

/** Full-timers who clear the weekly rating and job targets earn the bonus. */
export function isBonusEligible(hoursPerDay, daysPerWeek) {
  return hoursPerDay >= 8 && daysPerWeek >= 6
}

export function estimate({ slug, hoursPerDay, daysPerWeek }) {
  const rate = CATEGORY_RATES.find((r) => r.slug === slug) || CATEGORY_RATES[0]
  const weeklyHours = hoursPerDay * daysPerWeek
  const base = rate.effectiveHourly * weeklyHours
  const bonusEligible = isBonusEligible(hoursPerDay, daysPerWeek)
  const bonus = bonusEligible ? base * BONUS_RATE : 0
  const billableMinutes = weeklyHours * 60 * BILLABLE

  return {
    rate,
    weeklyHours,
    weekly: Math.round((base + bonus) / 10) * 10,
    base: Math.round(base),
    bonus: Math.round(bonus),
    bonusEligible,
    monthly: Math.round(((base + bonus) * 52) / 12 / 100) * 100,
    jobsPerWeek: Math.max(1, Math.round(billableMinutes / rate.avgMins)),
    perHour: Math.round(rate.effectiveHourly),
  }
}

export const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`
