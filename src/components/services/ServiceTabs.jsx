import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import ServiceRow from './ServiceRow'
import Button from '../ui/Button'
import { CATEGORIES, startingItem, startingPriceLabel, priceOf } from '../../data/services'
import { useBooking } from '../../context/BookingContext'
import { SERVICE_ICONS } from '../icons/ServiceIcons'
import { ArrowRightIcon, CheckIcon } from '../icons/UiIcons'
import { ShieldIcon, SparkleIcon } from '../icons/FeatureIcons'

const INCLUDED = [
  'Verified, skill-tested professional',
  'Tools and materials the pro brings',
  '30-day workmanship guarantee',
]

/** Subscription plan cards — rendered below the price list for Shine categories. */
function MonthlyPlans({ plans, accent, cat, onChoosePlan }) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-500 uppercase">
          Monthly plans · lock in your rate
        </p>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.1em] font-semibold uppercase"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <SparkleIcon size={11} />
          Kaaryo Shine
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <m.div
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 0.84, 0.24, 1] }}
            className={`relative flex flex-col rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
              plan.highlight
                ? 'border-transparent bg-brand-800 text-paper-100 shadow-[0_20px_48px_-24px_rgba(15,23,42,0.7)]'
                : 'border-ink-900/8 bg-paper-50 hover:bg-white hover:shadow-[0_12px_32px_-20px_rgba(15,23,42,0.3)]'
            }`}
            style={plan.highlight ? { borderColor: `${accent}40` } : {}}
          >
            {plan.highlight && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[0.6rem] tracking-[0.14em] font-bold uppercase text-brand-800"
                style={{ backgroundColor: accent }}
              >
                Most popular
              </span>
            )}

            <p
              className={`font-display text-[1.05rem] font-extrabold tracking-[-0.02em] ${
                plan.highlight ? 'text-paper-50' : 'text-ink-900'
              }`}
            >
              {plan.name}
            </p>
            <p
              className={`mt-1 text-[0.8rem] ${
                plan.highlight ? 'text-ink-400' : 'text-ink-500'
              }`}
            >
              {plan.tagline}
            </p>

            <div className="mt-4 flex items-end gap-1">
              <span
                className={`font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] ${
                  plan.highlight ? 'text-paper-50' : 'text-ink-900'
                }`}
              >
                {priceOf(plan.price)}
              </span>
              <span
                className={`mb-0.5 text-[0.8rem] ${
                  plan.highlight ? 'text-ink-400' : 'text-ink-500'
                }`}
              >
                / mo
              </span>
            </div>

            <span
              className="mt-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold"
              style={{
                backgroundColor: `${accent}22`,
                color: plan.highlight ? accent : accent,
              }}
            >
              <CheckIcon size={10} strokeWidth={3} />
              Saves {priceOf(plan.saves)} vs per wash
            </span>

            <Button
              size="sm"
              variant={plan.highlight ? 'primary' : 'ghost'}
              className="mt-5"
              onClick={() => onChoosePlan(plan)}
            >
              Choose plan
              <ArrowRightIcon size={14} />
            </Button>
          </m.div>
        ))}
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-500">
        Subscription plans auto-renew monthly. Cancel anytime from the app with no penalty.
        Savings calculated against per-wash pricing at the standard rate.
      </p>
    </div>
  )
}

function TabButton({ cat, isActive, onClick }) {
  const CatIcon = SERVICE_ICONS[cat.slug]
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${cat.slug}`}
      id={`tab-${cat.slug}`}
      className={`relative flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-[0.88rem] font-bold whitespace-nowrap transition-all duration-300 ${
        isActive
          ? 'border-ink-900 bg-brand-700 text-paper-50 shadow-[0_12px_28px_-16px_rgba(15,23,42,0.8)]'
          : 'border-ink-900/10 bg-paper-50 text-ink-700 hover:border-ink-900/25 hover:bg-white'
      }`}
    >
      <CatIcon
        size={18}
        style={{ color: isActive ? cat.accent : undefined }}
        className={isActive ? '' : 'text-ink-400'}
      />
      {cat.name}
      <span
        className={`font-mono text-[0.66rem] font-medium ${isActive ? 'text-paper-300' : 'text-ink-400'}`}
      >
        {cat.items.length}
      </span>
    </button>
  )
}

export default function ServiceTabs() {
  const [active, setActive] = useState(0)
  const [activeGroup, setActiveGroup] = useState(() =>
    CATEGORIES[0]?.groups ? (CATEGORIES[0].defaultGroup || CATEGORIES[0].groups[0].id) : null,
  )
  const cat = CATEGORIES[active]
  const CatIcon = SERVICE_ICONS[cat.slug]
  const { openBooking, openPlan } = useBooking()

  /** Reset the group toggle whenever the user switches category. */
  function handleTabChange(i) {
    setActive(i)
    const next = CATEGORIES[i]
    setActiveGroup(next.groups ? (next.defaultGroup || next.groups[0].id) : null)
  }

  /** Items visible in the price list — filtered by group when a toggle is active. */
  const visibleItems =
    cat.groups && activeGroup
      ? cat.items.filter((item) => item.group === activeGroup)
      : cat.items

  /** Starting item for the selected group (or overall cheapest). */
  const groupStartItem = visibleItems.reduce(
    (min, i) => (i.price < min.price ? i : min),
    visibleItems[0],
  )
  const groupStartLabel = groupStartItem
    ? groupStartItem.unit === 'hour'
      ? `${priceOf(groupStartItem.price)}/hr`
      : priceOf(groupStartItem.price)
    : startingPriceLabel(cat)

  /** Subscription plans for the active group (all plans if no group). */
  const visibleSubscriptions = cat.subscriptions
    ? activeGroup
      ? cat.subscriptions.filter((s) => s.vehicleType === activeGroup)
      : cat.subscriptions
    : null

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
      >
        {CATEGORIES.map((c, i) => (
          <TabButton key={c.slug} cat={c} isActive={i === active} onClick={() => handleTabChange(i)} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7">
        {/* Category summary */}
        <AnimatePresence mode="wait">
          <m.aside
            key={cat.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.16, 0.84, 0.24, 1] }}
            className="relative h-fit overflow-hidden rounded-4xl border border-ink-900/8 bg-brand-800 p-7 text-paper-100 lg:sticky lg:top-28"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full opacity-30 blur-[70px]"
              style={{ backgroundColor: cat.accent }}
            />
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${cat.accent}26`, color: cat.accent }}
            >
              <CatIcon size={28} />
            </span>

            <h2 className="relative mt-6 text-[1.9rem] text-paper-50">{cat.name}</h2>
            <p className="relative mt-2.5 text-[0.94rem] leading-relaxed text-ink-300">
              {cat.blurb}
            </p>

            <p className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-paper-50/8 px-3.5 py-1.5 font-mono text-[0.64rem] tracking-[0.14em] text-brand-300 uppercase">
              <SparkleIcon size={13} />
              {cat.note}
            </p>

            <div className="relative mt-7 border-t border-paper-50/10 pt-6">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-400 uppercase">
                Starting at
              </p>
              <p className="font-display text-[2.6rem] leading-none font-extrabold tracking-[-0.02em] text-paper-50">
                {groupStartLabel}
              </p>
              <p className="mt-2 text-[0.8rem] text-ink-400">
                No platform fee, no booking fee, no &ldquo;convenience&rdquo; fee.
                That number is the number.
              </p>
            </div>

            <ul className="relative mt-6 space-y-2.5">
              {INCLUDED.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[0.86rem] text-ink-300">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-success-500/16 text-success-300">
                    <CheckIcon size={10} strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <Button
              size="md"
              className="relative mt-7 w-full"
              onClick={() => openBooking(groupStartItem ?? startingItem(cat), cat)}
            >
              Book {cat.name.toLowerCase()}
              <ArrowRightIcon size={16} />
            </Button>
          </m.aside>
        </AnimatePresence>

        {/* Price list */}
        <div
          role="tabpanel"
          id={`panel-${cat.slug}`}
          aria-labelledby={`tab-${cat.slug}`}
          tabIndex={-1}
        >
          {/* Car / Bike toggle — only shown for grouped categories like Kaaryo Shine */}
          {cat.groups && (
            <div className="mb-5 flex items-center gap-2">
              {cat.groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGroup(g.id)}
                  className={`rounded-full px-5 py-2 text-[0.85rem] font-semibold transition-all duration-200 ${
                    activeGroup === g.id
                      ? 'bg-brand-700 text-paper-50 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.6)]'
                      : 'bg-paper-100 text-ink-600 hover:bg-paper-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-500 uppercase">
              {visibleItems.length} services · tap to book
            </h3>
            <p className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.12em] text-success-600 uppercase">
              <ShieldIcon size={13} />
              Guaranteed
            </p>
          </div>

          <AnimatePresence mode="wait">
            <m.ul key={`${cat.slug}-${activeGroup}`} className="space-y-2.5" exit={{ opacity: 0 }}>
              {visibleItems.map((item, i) => (
                <ServiceRow key={item.name} item={item} cat={cat} index={i} />
              ))}
            </m.ul>
          </AnimatePresence>

          <p className="mt-6 rounded-2xl border border-dashed border-ink-900/14 bg-paper-100 px-5 py-4 text-[0.86rem] leading-relaxed text-ink-600">
            <span className="font-bold text-ink-900">Durations are honest, not optimistic.</span>{' '}
            They reflect the median time our pros actually take on the job — measured, not
            estimated. If the work needs longer, you are not charged more.
          </p>

          {visibleSubscriptions && (
            <MonthlyPlans
              plans={visibleSubscriptions}
              accent={cat.accent}
              cat={cat}
              onChoosePlan={(plan) => openPlan(plan, cat)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
