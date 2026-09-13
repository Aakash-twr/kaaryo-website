import { m } from 'framer-motion'
import { priceOf } from '../../data/services'
import { SITE } from '../../data/site'
import { MailIcon, MapPinIcon, PhoneIcon } from '../icons/FeatureIcons'

const EASE = [0.16, 0.84, 0.24, 1]

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: EASE },
})

export default function BookingConfirmed({ quote, booking, reference, onClose }) {
  const firstName = booking.name.split(/\s+/)[0]

  return (
    <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
      <div className="relative mx-auto w-fit">
        <m.span
          className="absolute inset-0 rounded-full bg-success-500/25"
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 2.1, opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
        <m.span
          className="relative flex h-18 w-18 items-center justify-center rounded-full bg-linear-to-br from-success-400 to-success-600 shadow-[0_20px_44px_-18px_rgba(62,187,158,0.55)]"
          initial={{ scale: 0.3, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.1 }}
        >
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <m.path
              d="M9 19.8l6.4 6.4L29 12.6"
              stroke="#fff"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
            />
          </svg>
        </m.span>
      </div>

      <m.h3 className="mt-7 text-[1.7rem] text-ink-900 sm:text-[2rem]" {...rise(0.45)}>
        Booked, {firstName}.
      </m.h3>

      <m.p
        className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600"
        {...rise(0.55)}
      >
        A confirmation with your full price breakdown is on its way to{' '}
        <span className="font-semibold text-ink-900">{booking.email}</span>. We are
        matching you with a verified {quote.cat.name.toLowerCase()} now — expect a call
        on {booking.mobile} within a few minutes.
      </m.p>

      <m.dl
        className="mx-auto mt-8 max-w-md divide-y divide-ink-900/8 overflow-hidden rounded-3xl border border-ink-900/10 bg-paper-100 text-left"
        {...rise(0.65)}
      >
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">Booking reference</dt>
          <dd className="font-mono text-[0.92rem] font-bold tracking-[0.06em] text-ink-900">
            {reference}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">Service</dt>
          <dd className="text-[0.9rem] font-semibold text-ink-900">{quote.item.name}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">
            {quote.estimate ? 'Estimated total' : 'Total payable'}
          </dt>
          <dd className="font-display text-[1.2rem] font-extrabold tracking-[-0.02em] text-ink-900">
            {quote.totalLabel}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4 px-5 py-3.5">
          <dt className="shrink-0 text-[0.82rem] text-ink-500">Address</dt>
          <dd className="text-right text-[0.86rem] leading-relaxed text-ink-800">
            {booking.address}
            {booking.landmark && <>, {booking.landmark}</>}
            <br />
            {booking.city}
          </dd>
        </div>
      </m.dl>

      <m.p
        className="mx-auto mt-6 flex max-w-md items-start gap-2.5 rounded-2xl bg-warning-100/70 px-4 py-3 text-left text-[0.8rem] leading-relaxed text-ink-700"
        {...rise(0.72)}
      >
        <MapPinIcon size={16} className="mt-0.5 shrink-0 text-warning-500" />
        {quote.estimate
          ? `${priceOf(quote.total)} is the starting price. Your professional confirms the final amount on site, before starting.`
          : 'Nothing is charged yet. You pay after the job is done, by UPI, card or cash.'}
      </m.p>

      <m.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...rise(0.8)}>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-6 py-3 text-[0.9rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition hover:-translate-y-0.5"
        >
          Done
        </button>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-6 py-3 text-[0.9rem] font-semibold text-ink-900 transition hover:border-ink-900/35"
        >
          <PhoneIcon size={16} className="text-brand-500" />
          Call support
        </a>
      </m.div>

      <m.p
        className="mt-6 inline-flex items-center gap-1.5 text-[0.76rem] text-ink-400"
        {...rise(0.88)}
      >
        <MailIcon size={13} />
        Not in your inbox in a few minutes? Check spam, then email {SITE.supportEmail}.
      </m.p>
    </div>
  )
}
