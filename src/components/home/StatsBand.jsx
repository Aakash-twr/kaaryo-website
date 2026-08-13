import CounterNumber from '../ui/CounterNumber'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { STATS } from '../../data/site'

export default function StatsBand() {
  return (
    <section className="relative bg-paper-50 py-16 sm:py-20">
      <div className="container-k">
        <RevealGroup className="grid gap-px overflow-hidden rounded-4xl border border-ink-900/8 bg-ink-900/8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group relative bg-paper-50 px-6 py-9 transition-colors duration-500 hover:bg-white sm:px-7 sm:py-11"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-linear-to-r from-brand-500 to-brand-700 transition-transform duration-500 group-hover:scale-x-100" />
              <p className="font-display text-[2.9rem] leading-none font-extrabold tracking-[-0.045em] text-ink-900 sm:text-[3.4rem]">
                <CounterNumber
                  value={stat.value}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-3 text-[0.98rem] font-bold text-ink-800">{stat.label}</p>
              <p className="mt-1 text-[0.84rem] text-ink-500">{stat.sub}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
