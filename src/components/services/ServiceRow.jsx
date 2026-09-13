import { m } from 'framer-motion'
import { durationLabel, priceLabel, priceNote } from '../../data/services'
import { useBooking } from '../../context/BookingContext'
import { ClockIcon } from '../icons/FeatureIcons'
import { ArrowRightIcon } from '../icons/UiIcons'

export default function ServiceRow({ item, cat, index }) {
  const { openBooking } = useBooking()

  return (
    <m.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.055, ease: [0.16, 0.84, 0.24, 1] }}
    >
      <button
        type="button"
        onClick={() => openBooking(item, cat)}
        aria-label={`Book ${item.name} — ${priceLabel(item)}`}
        className="group relative flex w-full items-center gap-4 rounded-2xl border border-ink-900/8 bg-paper-50 px-4 py-4 text-left transition-all duration-300 hover:border-ink-900/16 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)] focus-visible:border-ink-900/25 sm:px-5"
      >
        <span
          className="h-9 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:h-11"
          style={{ backgroundColor: cat.accent }}
        />

        <div className="min-w-0 flex-1">
          <p className="text-[0.98rem] leading-tight font-bold text-ink-900">{item.name}</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.06em] text-ink-500">
            <ClockIcon size={12} className="text-ink-400" />
            {durationLabel(item)}
            <span className="text-ink-300">·</span>
            {priceNote(item)}
          </p>
        </div>

        <p className="font-display shrink-0 text-[1.24rem] leading-none font-extrabold tracking-[-0.03em] text-ink-900">
          {priceLabel(item)}
        </p>

        {/* Collapses to the arrow alone on narrow screens, where the row is
            already tight and the whole thing is tappable anyway. */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink-900/10 py-1.5 pr-1.5 pl-3 text-[0.78rem] font-semibold text-ink-600 transition-all duration-300 group-hover:border-ink-900 group-hover:bg-brand-700 group-hover:text-paper-50 max-sm:border-0 max-sm:p-0">
          <span className="max-sm:hidden">Book</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900/5 transition-colors duration-300 group-hover:bg-paper-50/15 max-sm:h-9 max-sm:w-9 max-sm:border max-sm:border-ink-900/10">
            <ArrowRightIcon size={14} />
          </span>
        </span>
      </button>
    </m.li>
  )
}
