import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import ServiceRow from './ServiceRow'
import Button from '../ui/Button'
import { CATEGORIES, PLATFORM_FEE, priceOf } from '../../data/services'
import { SERVICE_ICONS } from '../icons/ServiceIcons'
import { ArrowRightIcon, CheckIcon } from '../icons/UiIcons'
import { ShieldIcon, SparkleIcon } from '../icons/FeatureIcons'

const INCLUDED = [
  'Verified, skill-tested professional',
  'Tools and materials the pro brings',
  '30-day workmanship guarantee',
]

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
  const cat = CATEGORIES[active]
  const CatIcon = SERVICE_ICONS[cat.slug]
  const from = Math.min(...cat.items.map((i) => i.price))

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
      >
        {CATEGORIES.map((c, i) => (
          <TabButton key={c.slug} cat={c} isActive={i === active} onClick={() => setActive(i)} />
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
                {priceOf(from)}
              </p>
              <p className="mt-2 text-[0.8rem] text-ink-400">
                + {priceOf(PLATFORM_FEE)} platform fee per booking. Nothing else.
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

            <Button to="/contact" size="md" className="relative mt-7 w-full">
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
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-500 uppercase">
              {cat.items.length} services · fixed pricing
            </h3>
            <p className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.12em] text-success-600 uppercase">
              <ShieldIcon size={13} />
              Guaranteed
            </p>
          </div>

          <AnimatePresence mode="wait">
            <m.ul key={cat.slug} className="space-y-2.5" exit={{ opacity: 0 }}>
              {cat.items.map((item, i) => (
                <ServiceRow key={item.name} item={item} accent={cat.accent} index={i} />
              ))}
            </m.ul>
          </AnimatePresence>

          <p className="mt-6 rounded-2xl border border-dashed border-ink-900/14 bg-paper-100 px-5 py-4 text-[0.86rem] leading-relaxed text-ink-600">
            <span className="font-bold text-ink-900">Durations are honest, not optimistic.</span>{' '}
            They reflect the median time our pros actually take on the job — measured, not
            estimated. If the work needs longer, you are not charged more.
          </p>
        </div>
      </div>
    </div>
  )
}
