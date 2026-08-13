import { useMemo, useState } from 'react'
import EarningsResult from './EarningsResult'
import { CATEGORY_RATES, estimate, inr } from './earningsModel'
import { ChevronDownIcon } from '../icons/UiIcons'
import { SERVICE_ICONS } from '../icons/ServiceIcons'

function Slider({ label, value, min, max, unit, onChange, hint }) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[0.88rem] font-bold text-ink-800" htmlFor={label}>
          {label}
        </label>
        <p className="font-mono text-[1.05rem] font-bold text-ink-900 tabular-nums">
          {value}
          <span className="ml-1 text-[0.72rem] font-medium text-ink-500">{unit}</span>
        </p>
      </div>

      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-k mt-2"
        style={{ '--fill': `${fill}%` }}
        aria-valuetext={`${value} ${unit}`}
      />

      <div className="flex justify-between font-mono text-[0.62rem] tracking-[0.1em] text-ink-400 uppercase">
        <span>
          {min} {unit}
        </span>
        <span>{hint}</span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  )
}

export default function EarningsCalculator() {
  const [slug, setSlug] = useState(CATEGORY_RATES[0].slug)
  const [hoursPerDay, setHoursPerDay] = useState(8)
  const [daysPerWeek, setDaysPerWeek] = useState(6)

  const result = useMemo(
    () => estimate({ slug, hoursPerDay, daysPerWeek }),
    [slug, hoursPerDay, daysPerWeek]
  )

  const ActiveIcon = SERVICE_ICONS[slug]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7">
      <div className="rounded-4xl border border-ink-900/8 bg-paper-50 p-7 sm:p-8">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-500 uppercase">
          Your schedule
        </p>

        <div className="mt-6">
          <label
            htmlFor="trade"
            className="text-[0.88rem] font-bold text-ink-800"
          >
            Your trade
          </label>
          <div className="relative mt-2">
            <span
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
              style={{ color: result.rate.accent }}
            >
              <ActiveIcon size={20} />
            </span>
            <select
              id="trade"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-ink-900/12 bg-white py-3.5 pr-11 pl-12 text-[0.95rem] font-bold text-ink-900 transition-colors hover:border-ink-900/25"
            >
              {CATEGORY_RATES.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} — {inr(r.effectiveHourly)}/hr average
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={18}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500"
            />
          </div>
        </div>

        <div className="mt-7 space-y-7">
          <Slider
            label="Hours online per day"
            value={hoursPerDay}
            min={2}
            max={12}
            unit="hrs"
            hint="typical: 8"
            onChange={setHoursPerDay}
          />
          <Slider
            label="Days per week"
            value={daysPerWeek}
            min={1}
            max={7}
            unit="days"
            hint="typical: 6"
            onChange={setDaysPerWeek}
          />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-900/8 pt-6">
          {[
            { k: 'Weekly hours', v: `${result.weeklyHours}` },
            { k: 'Jobs / week', v: `~${result.jobsPerWeek}` },
            { k: 'Per hour', v: inr(result.perHour) },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-[1.3rem] leading-none font-extrabold tracking-[-0.03em] text-ink-900">
                {s.v}
              </p>
              <p className="mt-1.5 font-mono text-[0.56rem] tracking-[0.14em] text-ink-500 uppercase">
                {s.k}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[0.82rem] leading-relaxed text-ink-500">
          Payouts land every Monday. You keep {Math.round(0.72 * 100)}% of every job
          value, and Kaaryo covers the cancellation losses that used to come out of
          your pocket.
        </p>
      </div>

      <EarningsResult result={result} />
    </div>
  )
}
