import { priceOf } from '../../data/services'
import { minimumHours } from '../../lib/quote'
import { CheckIcon, MinusIcon, PlusIcon } from '../icons/UiIcons'

const MAX_HOURS = 8

/**
 * The full, itemised cost of the booking — every line the customer will be
 * charged, plus the things that are deliberately *not* in the total (materials,
 * the quote on a "from" job). Shown before the Book button, never after.
 */
export default function PriceBreakdown({ quote, hours, onHoursChange }) {
  const min = minimumHours(quote.item)

  return (
    <div className="overflow-hidden rounded-3xl bg-brand-700 text-paper-100">
      <div className="border-b border-paper-50/10 px-6 py-5">
        <p className="font-mono text-[0.6rem] tracking-[0.18em] text-brand-300 uppercase">
          Price breakdown
        </p>
        <h3 className="mt-2 text-[1.32rem] leading-tight text-paper-50">
          {quote.item.name}
        </h3>
        <p className="mt-1 text-[0.82rem] text-ink-400">{quote.cat.name}</p>
      </div>

      {quote.hourly && (
        <div className="flex items-center justify-between gap-4 border-b border-paper-50/10 px-6 py-4">
          <div>
            <p className="text-[0.88rem] font-semibold text-paper-50">How many hours?</p>
            <p className="mt-0.5 text-[0.76rem] text-ink-400">
              {min}-hour minimum · {priceOf(quote.item.price)} per hour
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-paper-50/20 p-1">
            <button
              type="button"
              onClick={() => onHoursChange(Math.max(min, hours - 1))}
              disabled={hours <= min}
              aria-label="One hour less"
              className="flex h-7 w-7 items-center justify-center rounded-full text-paper-50 transition hover:bg-paper-50/15 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <MinusIcon size={14} />
            </button>
            <span
              aria-live="polite"
              className="w-8 text-center font-mono text-[0.92rem] font-bold text-paper-50"
            >
              {hours}
            </span>
            <button
              type="button"
              onClick={() => onHoursChange(Math.min(MAX_HOURS, hours + 1))}
              disabled={hours >= MAX_HOURS}
              aria-label="One hour more"
              className="flex h-7 w-7 items-center justify-center rounded-full text-paper-50 transition hover:bg-paper-50/15 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <PlusIcon size={14} />
            </button>
          </div>
        </div>
      )}

      <dl className="px-6 py-5">
        {quote.lines.map((line) => (
          <div key={line.key} className="flex items-start justify-between gap-5 py-2.5">
            <div className="min-w-0">
              <dt className="text-[0.92rem] font-semibold text-paper-50">{line.label}</dt>
              <dd className="mt-0.5 text-[0.76rem] leading-relaxed text-ink-400">
                {line.detail}
              </dd>
            </div>
            <dd className="shrink-0 font-mono text-[0.95rem] font-bold text-paper-50">
              {priceOf(line.amount)}
            </dd>
          </div>
        ))}

        <div className="mt-3 flex items-baseline justify-between gap-5 border-t border-paper-50/15 pt-4">
          <dt className="text-[0.95rem] font-bold text-paper-50">
            {quote.estimate ? 'Estimated total' : 'Total payable'}
          </dt>
          <dd className="font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] text-paper-50">
            {quote.totalLabel}
          </dd>
        </div>

        <p className="mt-2 text-right text-[0.72rem] text-ink-400">
          {quote.estimate
            ? 'Final amount confirmed on site, before work starts'
            : 'Pay after the job, by UPI, card or cash'}
        </p>
      </dl>

      <ul className="space-y-2.5 border-t border-paper-50/10 bg-brand-800/60 px-6 py-5">
        {quote.notes.map((note) => (
          <li key={note} className="flex items-start gap-2.5 text-[0.78rem] leading-relaxed text-ink-300">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success-500/20 text-success-300">
              <CheckIcon size={9} strokeWidth={3} />
            </span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
