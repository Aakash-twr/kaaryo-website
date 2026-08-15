import { useState } from 'react'
import { m } from 'framer-motion'

const EASE = [0.16, 0.84, 0.24, 1]

export default function SuccessState({ name, onReset }) {
  const firstName = name.trim().split(/\s+/)[0] || 'there'
  // Generated once per success screen, so it stays stable across re-renders.
  const [ticket] = useState(() => String(Math.floor(Math.random() * 9000) + 1000))

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20"
    >
      <div className="relative">
        <m.span
          className="absolute inset-0 rounded-full bg-success-500/25"
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 2.1, opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
        <m.span
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-success-400 to-success-600 shadow-[0_20px_44px_-18px_rgba(62,187,158,0.55)]"
          initial={{ scale: 0.3, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.1 }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
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

      <m.h3
        className="mt-8 text-[1.8rem] text-ink-900 sm:text-[2.1rem]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
      >
        Thanks, {firstName}. Message received.
      </m.h3>

      <m.p
        className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-600"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
      >
        Our team replies within a few hours on working days — usually much sooner. If
        it is urgent, call us on{' '}
        <span className="font-mono font-semibold text-ink-900">+91 98765 43210</span>.
      </m.p>

      <m.div
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
      >
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-ink-900/15 bg-white px-6 py-3 text-[0.9rem] font-semibold text-ink-900 transition hover:border-ink-900/35"
        >
          Send another message
        </button>
      </m.div>

      <m.p
        className="mt-8 font-mono text-[0.62rem] tracking-[0.16em] text-ink-400 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Ticket #KRY-{ticket}
      </m.p>
    </m.div>
  )
}
