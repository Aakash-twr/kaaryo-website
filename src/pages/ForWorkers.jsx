import PageHero from '../components/ui/PageHero'
import EarningsCalculator from '../components/workers/EarningsCalculator'
import WorkerBenefits from '../components/workers/WorkerBenefits'
import WorkerStories from '../components/workers/WorkerStories'
import JoinSteps from '../components/workers/JoinSteps'
import SectionHeading from '../components/ui/SectionHeading'
import CounterNumber from '../components/ui/CounterNumber'
import CtaBand from '../components/ui/CtaBand'
import Button from '../components/ui/Button'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { ArrowRightIcon } from '../components/icons/UiIcons'

const HERO_STATS = [
  { value: 28400, prefix: '₹', label: 'avg monthly earnings' },
  { value: 8, suffix: '/day', label: 'jobs at peak demand' },
  { value: 500, suffix: '+', label: 'pros already earning' },
]

export default function ForWorkers() {
  return (
    <>
      <PageHero
        eyebrow="For workers"
        crumb="For workers"
        title={
          <>
            Join Kaaryo and
            <br className="hidden sm:block" /> start{' '}
            <span className="text-gradient-brand">earning today</span>.
          </>
        }
        body="Thousands of jobs available in your city. Set your own hours. Get paid weekly. Work near your home — and keep 72% of every job you complete."
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button to="/contact" size="lg">
            Apply to join
            <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button href="#calculator" variant="outline" size="lg">
            Estimate my earnings
          </Button>
        </div>

        <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <RevealItem
              key={s.label}
              className="rounded-3xl border border-ink-900/8 bg-white/70 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-display text-[2rem] leading-none font-extrabold tracking-[-0.045em] text-ink-900">
                <CounterNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[0.6rem] tracking-[0.16em] text-ink-500 uppercase">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageHero>

      <section id="calculator" className="scroll-mt-24 bg-paper-50 pb-20 sm:pb-24">
        <div className="container-k">
          <SectionHeading
            eyebrow="Earnings calculator"
            title="See what a week on Kaaryo pays"
            body="Pick your trade and how much you want to work. The numbers below come from real Kaaryo service prices, not a marketing guess."
            className="mb-10"
          />
          <EarningsCalculator />
        </div>
      </section>

      <WorkerBenefits />
      <JoinSteps />
      <WorkerStories />

      <CtaBand
        eyebrow="Your move"
        title={
          <>
            Bring your skill.
            <br className="hidden sm:block" /> We will bring the work.
          </>
        }
        body="Apply today and you could be taking your first Kaaryo booking within five working days."
        primary={{ label: 'Apply to join', to: '/contact' }}
        secondary={{ label: 'Read our story', to: '/about' }}
        guarantees={['No joining fee', 'Payouts every Monday', 'Support in your language']}
      />
    </>
  )
}
