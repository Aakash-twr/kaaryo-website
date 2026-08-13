import { Link } from 'react-router-dom'
import { SERVICE_ICONS } from '../icons/ServiceIcons'
import { ArrowUpRightIcon } from '../icons/UiIcons'
import { ClockIcon } from '../icons/FeatureIcons'
import { priceOf } from '../../data/services'

export default function CategoryCard({ cat, to = '/services' }) {
  const CatIcon = SERVICE_ICONS[cat.slug]
  const from = Math.min(...cat.items.map((i) => i.price))
  const fastest = Math.min(...cat.items.map((i) => i.mins))

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
            {priceOf(from)}
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
