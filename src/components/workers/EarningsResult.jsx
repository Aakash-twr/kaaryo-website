import { m } from 'framer-motion'
import { inr, WORKER_SHARE } from './earningsModel'
import { TrophyIcon, WalletIcon, ClockIcon, RupeeIcon } from '../icons/FeatureIcons'

function Row({ icon: RowIcon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-50/8 text-brand-300">
        <RowIcon size={17} />
      </span>
      <p className="flex-1 text-[0.86rem] text-ink-300">{label}</p>
      <p className="font-mono text-[0.88rem] font-bold text-paper-50 tabular-nums">{value}</p>
    </div>
  )
}

export default function EarningsResult({ result }) {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-brand-800 p-7 text-paper-100 sm:p-8">
      <div className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-brand-500/22 blur-[80px]" />

      <p className="relative font-mono text-[0.62rem] tracking-[0.2em] text-brand-300 uppercase">
        Estimated weekly earnings
      </p>

      <div className="relative mt-3 flex items-end gap-3">
        <m.p
          key={result.weekly}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 0.84, 0.24, 1] }}
          // Looser tracking than other display numbers: ₹ collides with the
          // first digit at this size otherwise.
          className="font-display text-[3.1rem] leading-none font-extrabold tracking-[-0.02em] text-paper-50 sm:text-[3.7rem]"
        >
          {inr(result.weekly)}
        </m.p>
        <span className="mb-2 font-mono text-[0.72rem] tracking-[0.12em] text-ink-400 uppercase">
          / week
        </span>
      </div>

      <p className="relative mt-2 text-[0.9rem] text-ink-300">
        Around{' '}
        <span className="font-bold text-paper-50">{inr(result.monthly)} a month</span> at
        this schedule.
      </p>

      <div className="relative mt-7 space-y-3.5 border-t border-paper-50/10 pt-6">
        <Row
          icon={ClockIcon}
          label={`${result.weeklyHours} hours online per week`}
          value={`${inr(result.perHour)}/hr`}
        />
        <Row
          icon={WalletIcon}
          label="Jobs you would complete"
          value={`~${result.jobsPerWeek}/week`}
        />
        <Row
          icon={RupeeIcon}
          label="Average job value"
          value={inr(result.rate.avgTicket)}
        />
        <Row
          icon={TrophyIcon}
          label={result.bonusEligible ? 'Performance bonus included' : 'Performance bonus (8+ hrs, 6 days)'}
          value={result.bonusEligible ? `+${inr(result.bonus)}` : 'Not yet'}
        />
      </div>

      <div
        className={`relative mt-6 rounded-2xl border px-4 py-3.5 text-[0.82rem] leading-relaxed ${
          result.bonusEligible
            ? 'border-success-400/25 bg-success-500/10 text-success-100'
            : 'border-paper-50/12 bg-paper-50/5 text-ink-300'
        }`}
      >
        {result.bonusEligible ? (
          <>
            <span className="font-bold text-paper-50">Bonus unlocked.</span> Full-time
            pros who hold their rating earn an extra 8% on every payout.
          </>
        ) : (
          <>
            Go to <span className="font-bold text-paper-50">8 hours × 6 days</span> to
            unlock the weekly performance bonus.
          </>
        )}
      </div>

      <p className="relative mt-5 text-[0.74rem] leading-relaxed text-ink-500">
        Estimates based on live Kaaryo pricing, a {Math.round(WORKER_SHARE * 100)}% worker
        share and the average share of online hours that convert to paid jobs. Actual
        earnings vary by city, rating and demand.
      </p>
    </div>
  )
}
