import PageHero from '../components/ui/PageHero'
import ServiceTabs from '../components/services/ServiceTabs'
import SectionHeading from '../components/ui/SectionHeading'
import CtaBand from '../components/ui/CtaBand'
import FaqSection from '../components/home/FaqSection'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import CounterNumber from '../components/ui/CounterNumber'
import { CATEGORIES, TOTAL_SERVICES } from '../data/services'
import { SERVICES_FAQS } from '../data/faqs'
import { RupeeIcon, ClockIcon, ShieldIcon, HeadsetIcon } from '../components/icons/FeatureIcons'

const PROMISES = [
  {
    icon: RupeeIcon,
    title: 'The price you see is the price you pay',
    body: 'Predictable jobs are fixed-rate. Larger ones show a starting price and are quoted before any work begins — never after. And nothing is added on top: every app seems to charge a platform fee, and we never worked out what yours would be buying.',
  },
  {
    icon: ClockIcon,
    title: 'A pro at your door in 20 minutes',
    body: 'If we cannot find you a verified professional within 20 minutes, the booking is free. No conditions, no arguing.',
  },
  {
    icon: ShieldIcon,
    title: 'Backed by a 30-day guarantee',
    body: 'Not happy with the work? Tell support within 24 hours and we arrange a redo or a full refund. Workmanship is covered for 30 days.',
  },
  {
    icon: HeadsetIcon,
    title: 'Support that picks up the phone',
    body: 'Real people, 24×7, in five languages. During the job and long after it, if something is not right.',
  },
]

export default function Services() {
  const cheapest = Math.min(...CATEGORIES.flatMap((c) => c.items.map((i) => i.price)))

  return (
    <>
      <PageHero
        eyebrow="Services"
        crumb="Services"
        title={
          <>
            Honest prices.
            <br className="hidden sm:block" /> Honest durations.
          </>
        }
        body={`${TOTAL_SERVICES} services across six trades. Fixed rates on the predictable jobs, a clear starting price on the ones that need a look first. Choose a category to see everything it covers.`}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          {[
            { value: TOTAL_SERVICES, suffix: '', label: 'services live' },
            { value: 6, suffix: '', label: 'trades covered' },
            { value: cheapest, prefix: '₹', label: 'lowest price' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-900/8 bg-white/70 px-5 py-3.5 backdrop-blur-sm"
            >
              <p className="font-display text-[1.6rem] leading-none font-extrabold tracking-[-0.04em] text-ink-900">
                <CounterNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-ink-500 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper-50 pb-20 sm:pb-24">
        <div className="container-k">
          <ServiceTabs />
        </div>
      </section>

      <section className="bg-paper-100 py-20 sm:py-24">
        <div className="container-k">
          <SectionHeading
            align="center"
            eyebrow="Our promises"
            title="Four things we put in writing"
            body="A marketplace is only as good as what it guarantees when something goes wrong."
            className="mb-14"
          />

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {PROMISES.map((p) => (
              <RevealItem
                key={p.title}
                className="group flex gap-5 rounded-4xl border border-ink-900/8 bg-paper-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_60px_-40px_rgba(15,23,42,0.5)] sm:p-7"
              >
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-brand-700 p-3 text-brand-300 transition-transform duration-500 group-hover:-rotate-6">
                  <p.icon size={24} />
                </span>
                <div>
                  <h3 className="text-[1.16rem] text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-600">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-[0.88rem] leading-relaxed text-ink-500">
              Prices shown are labour for standard urban homes in our live cities.
              Materials and replacement parts are billed separately unless a package
              says all-inclusive. Unusually large jobs are quoted in the app before
              you confirm — never after the work has started.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection items={SERVICES_FAQS} />
      <CtaBand
        eyebrow="Pick a trade"
        title={
          <>
            {TOTAL_SERVICES} services.
            <br className="hidden sm:block" /> One tap each.
          </>
        }
        body="Choose what needs doing, confirm the price, and track a verified professional to your door."
      />
    </>
  )
}
