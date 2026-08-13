import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Reveal from '../ui/Reveal'
import CounterNumber from '../ui/CounterNumber'
import { Eyebrow } from '../ui/SectionHeading'
import { WORKER_TESTIMONIALS } from '../../data/testimonials'
import { ArrowRightIcon, CheckIcon, QuoteIcon } from '../icons/UiIcons'

const PERKS = ['Weekly payouts', 'Own your hours', 'Jobs near home', 'Free skill badge']

export default function WorkerCtaSection() {
  const lead = WORKER_TESTIMONIALS[0]

  return (
    <section className="bg-paper-50 py-20 sm:py-24">
      <div className="container-k">
        <Reveal y={34}>
          <div className="relative overflow-hidden rounded-5xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-700 p-7 shadow-[0_50px_100px_-50px_rgba(0,103,79,0.6)] sm:p-12 lg:p-14">
            {/* light play */}
            <div className="pointer-events-none absolute -top-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-warning-300/35 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-brand-700/30 blur-[90px]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 16px)',
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Eyebrow tone="light" className="border-white/25 bg-white/12 text-white">
                  For workers
                </Eyebrow>

                <h2 className="mt-6 text-[2.2rem] text-white sm:text-[2.9rem] lg:text-[3.2rem]">
                  Your skill deserves
                  <br className="hidden sm:block" /> a better platform.
                </h2>

                <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/85">
                  Thousands of jobs in your city, every week. Set your own hours,
                  work close to home, and get paid every Monday without chasing
                  anyone for money.
                </p>

                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {PERKS.map((perk) => (
                    <li
                      key={perk}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.82rem] font-semibold text-white backdrop-blur-sm"
                    >
                      <CheckIcon size={13} strokeWidth={2.6} />
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button to="/for-workers" variant="light" size="lg">
                    Start earning
                    <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <p className="font-mono text-[0.72rem] tracking-[0.14em] text-white/75 uppercase">
                    Live in 3–5 working days
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-4xl bg-brand-800/85 p-6 backdrop-blur-md sm:p-7">
                  <p className="font-mono text-[0.62rem] tracking-[0.2em] text-brand-300 uppercase">
                    Average monthly earnings
                  </p>
                  <p className="font-display mt-2 text-[3rem] leading-none font-extrabold tracking-[-0.02em] text-paper-50 sm:text-[3.6rem]">
                    ₹<CounterNumber value={28400} />
                  </p>
                  <p className="mt-2.5 text-[0.86rem] text-ink-300">
                    Full-time pros, across all six trades — before performance bonuses.
                  </p>
                </div>

                <figure className="rounded-4xl bg-white/92 p-6 backdrop-blur-md">
                  <QuoteIcon size={22} className="text-brand-400" />
                  <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                    “{lead.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
                    <Avatar name={lead.name} size={38} verified />
                    <div>
                      <p className="text-[0.86rem] leading-tight font-bold text-ink-900">
                        {lead.name}
                      </p>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] text-ink-500 uppercase">
                        {lead.role} · {lead.city}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
