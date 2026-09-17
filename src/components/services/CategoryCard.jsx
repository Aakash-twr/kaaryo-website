import { Link } from 'react-router-dom'
import { SERVICE_ICONS } from '../icons/ServiceIcons'
import { ArrowUpRightIcon } from '../icons/UiIcons'
import { ClockIcon } from '../icons/FeatureIcons'
import { startingPriceLabel } from '../../data/services'

export default function CategoryCard({ cat, to = '/services', wide = false }) {
  const CatIcon = SERVICE_ICONS[cat.slug]
  const fastest = Math.min(...cat.items.map((i) => i.mins))

  if (wide) {
    return (
      <Link
        to={to}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900/14 hover:shadow-[0_34px_70px_-42px_rgba(15,23,42,0.6)] sm:p-8 lg:flex-row lg:items-center lg:gap-8 lg:p-9"
      >
        {/* accent bloom on hover */}
        <span
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-70"
          style={{ backgroundColor: cat.accent }}
        />

        {/* Left / Info side */}
        <div className="relative flex-1">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span
              className="flex h-13 w-13 items-center justify-center rounded-2xl p-3 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              style={{ backgroundColor: `${cat.accent}1f`, color: cat.accent }}
            >
              <CatIcon size={26} />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-600/20 bg-cyan-500/10 px-3 py-1 font-mono text-[0.68rem] font-semibold text-cyan-800">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Vehicle Care
            </span>
            {cat.note && (
              <span className="inline-flex items-center rounded-full border border-ink-900/8 bg-ink-900/4 px-3 py-1 font-mono text-[0.68rem] text-ink-600">
                {cat.note}
              </span>
            )}
          </div>

          <div className="mt-4 sm:mt-5">
            <h3 className="text-[1.45rem] font-bold text-ink-900 sm:text-[1.75rem]">
              {cat.name}
            </h3>
            <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-ink-600 sm:text-[0.95rem]">
              {cat.blurb}
            </p>
          </div>

          {/* Key tags / highlights */}
          <div className="mt-4 flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-ink-900/6 bg-white/70 px-2.5 py-1 text-[0.78rem] font-medium text-ink-700">
              🛵 Bike & Scooter Wash from ₹79
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-ink-900/6 bg-white/70 px-2.5 py-1 text-[0.78rem] font-medium text-ink-700">
              🚗 Car Exterior & Foam from ₹149
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-ink-900/6 bg-white/70 px-2.5 py-1 text-[0.78rem] font-medium text-ink-700">
              💧 Low-water eco foam
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-ink-900/6 bg-white/70 px-2.5 py-1 text-[0.78rem] font-medium text-ink-700">
              📅 Monthly wash subscriptions
            </span>
          </div>
        </div>

        {/* Right / Price & CTA side */}
        <div className="relative mt-6 flex items-center justify-between border-t border-ink-900/8 pt-5 sm:gap-6 lg:mt-0 lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <div className="lg:text-right">
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-ink-500 uppercase">
              Starting at
            </p>
            <p className="font-display text-[1.65rem] leading-none font-extrabold tracking-[-0.03em] text-ink-900 sm:text-[1.95rem]">
              {startingPriceLabel(cat)}
            </p>
            <div className="mt-2 flex items-center gap-2 lg:justify-end">
              <p className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-semibold text-ink-600">
                <ClockIcon size={13} className="text-brand-500" />
                from {fastest} min
              </p>
              <span className="text-ink-300">·</span>
              <p className="text-[0.74rem] text-ink-400">
                {cat.items.length} services
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/90 px-4 py-2.5 text-[0.84rem] font-semibold text-ink-900 shadow-sm transition-all duration-300 group-hover:border-ink-900 group-hover:bg-brand-700 group-hover:text-paper-50 sm:px-5">
            <span>Explore services</span>
            <ArrowUpRightIcon size={15} />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900/14 hover:shadow-[0_34px_70px_-42px_rgba(15,23,42,0.6)] sm:p-7"
    >
      {/* accent bloom on hover */}
      <span
        className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-60"
        style={{ backgroundColor: cat.accent }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className="flex h-13 w-13 items-center justify-center rounded-2xl p-3 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ backgroundColor: `${cat.accent}1f`, color: cat.accent }}
        >
          <CatIcon size={26} />
        </span>
        <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 text-ink-400 transition-all duration-500 group-hover:border-ink-900 group-hover:bg-brand-700 group-hover:text-paper-50">
          <ArrowUpRightIcon size={15} />
        </span>
      </div>

      <h3 className="relative mt-6 text-[1.42rem] text-ink-900">{cat.name}</h3>
      <p className="relative mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-600">
        {cat.blurb}
      </p>

      <div className="relative mt-6 flex items-end justify-between border-t border-ink-900/8 pt-5">
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.16em] text-ink-500 uppercase">
            Starting at
          </p>
          <p className="font-display text-[1.5rem] leading-none font-extrabold tracking-[-0.03em] text-ink-900">
            {startingPriceLabel(cat)}
          </p>
        </div>
        <div className="text-right">
          <p className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-semibold text-ink-600">
            <ClockIcon size={13} className="text-brand-500" />
            from {fastest} min
          </p>
          <p className="mt-1 text-[0.74rem] text-ink-400">
            {cat.items.length} services
          </p>
        </div>
      </div>
    </Link>
  )
}
