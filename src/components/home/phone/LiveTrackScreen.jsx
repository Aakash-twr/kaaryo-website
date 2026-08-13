import { useEffect, useState } from 'react'
import MiniMap from './MiniMap'
import Avatar from '../../ui/Avatar'
import { StarIcon } from '../../icons/UiIcons'
import { PhoneIcon, ShieldIcon, RouteIcon } from '../../icons/FeatureIcons'

const START = 278 // 4:38 — a booking already in flight

function clock(total) {
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function LiveTrackScreen() {
  const [left, setLeft] = useState(START)

  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((prev) => (prev <= 1 ? START : prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const progress = ((START - left) / START) * 100

  return (
    <div className="flex h-full flex-col gap-3 bg-paper-100 px-3.5 pt-1 pb-3.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.58rem] tracking-[0.2em] text-ink-500 uppercase">
            Arriving in
          </p>
          <p className="font-mono text-[1.75rem] leading-none font-bold tracking-[-0.04em] text-ink-900 tabular-nums">
            {clock(left)}
          </p>
        </div>
        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-success-500/12 px-2 py-1 text-[0.62rem] font-bold text-success-600">
          <RouteIcon size={11} strokeWidth={2} />
          1.8 km away
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-ink-900/8">
        <div
          className="h-full rounded-full bg-linear-to-r from-brand-500 to-brand-700 transition-[width] duration-1000 ease-linear"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>

      <MiniMap />

      <div className="rounded-2xl bg-white p-3 shadow-[0_6px_20px_-14px_rgba(15,23,42,0.5)]">
        <div className="flex items-center gap-2.5">
          <Avatar name="Ramesh Kumar" size={38} verified />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.82rem] leading-tight font-bold text-ink-900">
              Ramesh K.
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.08em] text-ink-500 uppercase">
              Electrician · 1,284 jobs
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand-700 px-1.5 py-1 text-[0.63rem] font-bold text-paper-50">
            <StarIcon size={9} className="text-warning-400" />
            4.9
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 border-t border-ink-900/6 pt-2.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-success-500/10 px-1.5 py-0.5 text-[0.58rem] font-semibold text-success-600">
            <ShieldIcon size={9} strokeWidth={2.2} />
            Aadhaar verified
          </span>
          <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 text-[0.58rem] font-semibold text-brand-600">
            Skill tested
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2">
        <div className="flex-1 rounded-xl bg-white/80 px-3 py-2">
          <p className="text-[0.68rem] leading-tight font-semibold text-ink-700">
            Fan Installation
          </p>
          <p className="font-mono text-[0.78rem] font-bold text-ink-900">₹299</p>
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-paper-50"
        >
          <PhoneIcon size={16} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex h-10 items-center rounded-xl bg-linear-to-r from-brand-500 to-brand-700 px-3.5 text-[0.72rem] font-bold text-white"
        >
          Track
        </button>
      </div>
    </div>
  )
}
