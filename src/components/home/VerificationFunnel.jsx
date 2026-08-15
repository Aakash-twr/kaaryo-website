import { m } from 'framer-motion'

const ROWS = [
  { label: 'Applied', pct: 100, value: '3,120' },
  { label: 'ID + background cleared', pct: 62, value: '1,934' },
  { label: 'Passed skill test', pct: 31, value: '968' },
  { label: 'Live on Kaaryo', pct: 16, value: '512' },
]

/** Honest funnel — most applicants don't make it, and that's the point. */
export default function VerificationFunnel() {
  return (
    <div className="rounded-3xl border border-paper-50/12 bg-paper-50/4 p-6 backdrop-blur-sm">
      <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-400 uppercase">
        Applicants, last 90 days
      </p>

      <div className="mt-5 space-y-3.5">
        {ROWS.map((row, i) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[0.82rem] font-semibold text-paper-100">{row.label}</span>
              <span className="font-mono text-[0.78rem] font-bold text-ink-300 tabular-nums">
                {row.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-paper-50/8">
              <m.div
                // The final row is the outcome, so it gets the brightest fill;
                // the stages above recede into deeper green.
                className={`h-full rounded-full ${
                  i === ROWS.length - 1
                    ? 'bg-linear-to-r from-success-300 to-success-400'
                    : 'bg-linear-to-r from-brand-600 to-brand-500'
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.13, ease: [0.16, 0.84, 0.24, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-paper-50/10 pt-4 text-[0.86rem] leading-relaxed text-ink-300">
        Roughly <span className="font-bold text-paper-50">1 in 6</span> applicants
        make it onto the platform. The filter is the product.
      </p>
    </div>
  )
}
