import { useEffect, useMemo, useState } from 'react'

/** Service operates 8 AM – 8 PM in 30-min slots. */
const ALL_SLOTS = (() => {
  const slots = []
  for (let h = 8; h <= 20; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 20 && m > 0) break
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      const label = new Date(2000, 0, 1, h, m).toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      slots.push({ value: `${hh}:${mm}`, label })
    }
  }
  return slots
})()

/** Next 14 calendar days starting from today. */
function buildDateOptions() {
  const opts = []
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  for (let i = 0; i < 14; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const value = d.toISOString().slice(0, 10)
    let label
    if (i === 0) label = 'Today'
    else if (i === 1) label = 'Tomorrow'
    else
      label = d.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    opts.push({ value, label })
  }
  return opts
}

/**
 * Modern date-chip + time-slot picker.
 *
 * Props:
 *  value      – ISO datetime-local string (e.g. "2026-09-25T14:00") or ""
 *  onChange   – called with new ISO string when both date & time are chosen,
 *               or "" when either is cleared
 *  error      – validation error message string
 */
export default function SchedulePicker({ value, onChange, error }) {
  const dateOptions = useMemo(buildDateOptions, [])

  // Derive controlled selections from value prop
  const [selDate, setSelDate] = useState(() => (value ? value.slice(0, 10) : ''))
  const [selTime, setSelTime] = useState(() => (value ? value.slice(11, 16) : ''))

  // Sync to external resets (e.g. switching back to "instant" mode clears value)
  useEffect(() => {
    if (!value) {
      setSelDate('')
      setSelTime('')
    }
  }, [value])

  /** Min HH:MM for today — 1 hr from now, rounded up to the next slot boundary. */
  const minTimeForToday = useMemo(() => {
    const ahead = new Date(Date.now() + 60 * 60 * 1000)
    // Round up to next 30-min boundary
    const totalMins = ahead.getHours() * 60 + ahead.getMinutes()
    const rounded = Math.ceil(totalMins / 30) * 30
    const h = Math.floor(rounded / 60)
    const m = rounded % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }, [])

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])

  /** Time slots available for the selected date. */
  const availableSlots = useMemo(() => {
    if (!selDate) return []
    const min = selDate === todayStr ? minTimeForToday : '08:00'
    return ALL_SLOTS.filter((s) => s.value >= min)
  }, [selDate, todayStr, minTimeForToday])

  function handleDateSelect(date) {
    setSelDate(date)
    // Reset time if it's now unavailable
    const min = date === todayStr ? minTimeForToday : '08:00'
    const timeStillValid = selTime && selTime >= min
    if (!timeStillValid) {
      setSelTime('')
      onChange('')
    } else {
      onChange(`${date}T${selTime}`)
    }
  }

  function handleTimeSelect(time) {
    setSelTime(time)
    if (selDate) onChange(`${selDate}T${time}`)
  }

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
      {/* ── Date chips ── */}
      <p className="mb-2.5 font-mono text-[0.62rem] tracking-[0.16em] text-ink-500 uppercase">
        Pick a date
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
        {dateOptions.map((opt) => {
          const isSelected = selDate === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleDateSelect(opt.value)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-[0.82rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                isSelected
                  ? 'bg-brand-700 text-paper-50 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.55)]'
                  : 'border border-ink-900/8 bg-paper-50 text-ink-700 hover:border-brand-500/30 hover:bg-white hover:text-ink-900'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* ── Time slots ── */}
      {selDate && (
        <div className="booking-fields-reveal mt-4">
          <p className="mb-2.5 font-mono text-[0.62rem] tracking-[0.16em] text-ink-500 uppercase">
            Pick a time
          </p>
          {availableSlots.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-900/12 bg-paper-50 px-4 py-3 text-[0.82rem] text-ink-500">
              No slots available for today — please pick another date.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
              {availableSlots.map((slot) => {
                const isSelected = selTime === slot.value
                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleTimeSelect(slot.value)}
                    className={`rounded-xl py-2 text-[0.78rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isSelected
                        ? 'bg-brand-700 text-paper-50 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.55)]'
                        : 'border border-ink-900/8 bg-paper-50 text-ink-700 hover:border-brand-500/30 hover:bg-white hover:text-ink-900'
                    }`}
                  >
                    {slot.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Error message ── */}
      {error && (
        <p role="alert" className="mt-3 text-[0.78rem] text-danger-600">
          {error}
        </p>
      )}
    </div>
  )
}
