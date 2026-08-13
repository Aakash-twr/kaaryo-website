import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { ArrowRightIcon } from '../icons/UiIcons'
import { HomeIcon, IdCardIcon, ClipboardCheckIcon, BoltIcon } from '../icons/FeatureIcons'

const STEPS = [
  {
    icon: HomeIcon,
    title: 'Download the Worker app',
    body: 'Sign up with your phone number and pick your trade. Takes about two minutes.',
    meta: 'Day 1',
  },
  {
    icon: IdCardIcon,
    title: 'Complete verification',
    body: 'Aadhaar identity check and background verification, submitted from your phone.',
    meta: 'Day 1–2',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Pass the skill assessment',
    body: 'An in-person practical test at your city hub, graded by a senior tradesperson.',
    meta: 'Day 2–4',
  },
  {
    icon: BoltIcon,
    title: 'Go live and start earning',
    body: 'Your profile activates with a verified skill badge and jobs start arriving.',
    meta: 'Day 3–5',
  },
]

export default function JoinSteps() {
  return (
    <section className="bg-paper-50 py-20 sm:py-24">
      <div className="container-k">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Joining Kaaryo"
            title={
              <>
                Live on the platform
                <br className="hidden sm:block" /> within five days.
              </>
            }
            body="No registration fee, no deposit, no commission upfront. You only ever pay Kaaryo out of jobs you have already been paid for."
          />
          <Button to="/contact" variant="dark" size="md" className="shrink-0">
            Apply to join
            <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>

        <RevealGroup className="relative grid gap-4 lg:grid-cols-4 lg:gap-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[3.6rem] right-[8%] left-[8%] hidden border-t-2 border-dashed border-ink-900/12 lg:block"
          />

          {STEPS.map((step, i) => (
            <RevealItem
              key={step.title}
              className="group relative flex flex-col rounded-3xl border border-ink-900/8 bg-paper-100 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(15,23,42,0.55)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-[0_14px_30px_-16px_rgba(0,103,79,0.7)] transition-transform duration-500 group-hover:-rotate-6">
                  <step.icon size={22} />
                </span>
                <span className="font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  {step.meta}
                </span>
              </div>
              <h3 className="mt-6 text-[1.2rem] text-ink-900">{step.title}</h3>
              <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-ink-600">
                {step.body}
              </p>
              <span className="mt-5 font-mono text-[2rem] leading-none font-bold text-ink-900/8 transition-colors duration-500 group-hover:text-brand-500/25">
                0{i + 1}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
