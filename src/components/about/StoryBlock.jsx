import Reveal from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'
import { QuoteIcon } from '../icons/UiIcons'
import { CalendarIcon, HomeIcon, UsersIcon } from '../icons/FeatureIcons'

const FACTS = [
  { icon: CalendarIcon, k: 'Founded', v: '2026, Hyderabad' },
  { icon: UsersIcon, k: 'Founded by', v: 'Engineers & operators' },
  { icon: HomeIcon, k: 'Built for', v: 'Every Indian city' },
]

export default function StoryBlock() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-20 sm:py-24">
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-200/25 blur-[120px]" />

      <div className="container-k relative">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem]">
                It started with a fan that
                <br className="hidden sm:block" /> nobody would come to fix.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6 text-[1.02rem] leading-relaxed text-ink-600 sm:text-[1.06rem]">
              <Reveal delay={0.1}>
                <p>
                  Kaaryo was founded in 2026 by a group of engineers and
                  entrepreneurs who were frustrated by how difficult it was to find
                  reliable home service workers in Indian cities. Everyone had the
                  same story: a number passed along by a neighbour, three unanswered
                  calls, a price invented on the spot, and a day off work spent
                  waiting.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p>
                  The idea was simple. Build a platform where any homeowner could
                  get a verified, skilled worker at their door in under 20 minutes —
                  the same way you order food or hail a cab. Nothing about that is
                  technically impossible. It had just never been built properly for
                  home services.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p>
                  The name Kaaryo comes from the Hindi word for work, because at our
                  core we are a platform that gets work done. We believe skilled
                  workers deserve better opportunities and homeowners deserve better
                  service. We are building the infrastructure to make both possible
                  at scale, across every city in India.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.22}>
              <figure className="mt-10 rounded-4xl border border-ink-900/8 bg-paper-100 p-7 sm:p-8">
                <QuoteIcon size={26} className="text-brand-400" />
                <blockquote className="mt-4 font-display text-[1.3rem] leading-snug font-bold tracking-[-0.025em] text-ink-900 sm:text-[1.5rem]">
                  “A city does not need another listings app. It needs someone
                  accountable for whether the job actually got done.”
                </blockquote>
                <figcaption className="mt-5 font-mono text-[0.66rem] tracking-[0.16em] text-ink-500 uppercase">
                  The founding principle, written on day one
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-4xl border border-ink-900/8 bg-brand-800 p-7 text-paper-100">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-brand-300 uppercase">
                  Kaaryo · कार्य
                </p>
                <p className="font-display mt-3 text-[2.6rem] leading-none font-extrabold tracking-[-0.05em] text-paper-50">
                  work
                </p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-300">
                  <span className="font-semibold text-paper-100">noun.</span> A task
                  that needs doing. Our whole company is named after the only thing
                  our customers actually want from us.
                </p>

                <dl className="mt-7 space-y-4 border-t border-paper-50/10 pt-6">
                  {FACTS.map((f) => (
                    <div key={f.k} className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-50/8 text-brand-300">
                        <f.icon size={19} />
                      </span>
                      <div>
                        <dt className="font-mono text-[0.58rem] tracking-[0.16em] text-ink-400 uppercase">
                          {f.k}
                        </dt>
                        <dd className="text-[0.92rem] font-bold text-paper-50">{f.v}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
