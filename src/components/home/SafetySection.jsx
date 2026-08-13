import SectionHeading from '../ui/SectionHeading'
import VerificationFunnel from './VerificationFunnel'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { VERIFICATION_STEPS } from '../../data/site'
import { IdCardIcon, ShieldIcon, ClipboardCheckIcon, HandshakeIcon, RouteIcon, UsersIcon } from '../icons/FeatureIcons'

const STEP_ICONS = [IdCardIcon, ShieldIcon, ClipboardCheckIcon, HandshakeIcon]

const DURING_JOB = [
  {
    icon: RouteIcon,
    title: 'Tracked in real time',
    body: 'From the moment a worker accepts until the job is marked complete, their location is on your map.',
  },
  {
    icon: UsersIcon,
    title: 'Full profile before arrival',
    body: 'Name, photo, rating, total jobs and history — visible before they reach your door, not after.',
  },
]

export default function SafetySection() {
  return (
    <section className="relative overflow-hidden bg-brand-800 py-20 text-paper-100 sm:py-24">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-32 right-[8%] h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-[24rem] w-[24rem] rounded-full bg-success-500/8 blur-[120px]" />

      <div className="container-k relative">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="light"
              eyebrow="Trust & safety"
              title={
                <>
                  We are strict about who
                  <br className="hidden sm:block" /> we let into your home.
                </>
              }
              body="A stranger with tools is a real decision. So every Kaaryo professional clears four independent gates before a single booking reaches them — and stays accountable on every job after."
            />
            <div className="mt-9">
              <VerificationFunnel />
            </div>
          </div>

          <div>
            <RevealGroup className="relative space-y-4">
              {/* vertical spine */}
              <div
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-[1.72rem] w-px bg-linear-to-b from-brand-400/50 via-paper-50/12 to-success-400/50 max-sm:hidden"
              />
              {VERIFICATION_STEPS.map((step, i) => {
                const StepIcon = STEP_ICONS[i]
                return (
                  <RevealItem
                    key={step.title}
                    className="group relative flex gap-5 rounded-3xl border border-paper-50/10 bg-paper-50/4 p-5 backdrop-blur-sm transition-all duration-500 hover:border-paper-50/22 hover:bg-paper-50/8 sm:p-6"
                  >
                    {/* Inverted on this dark band: bright mint fill with a dark
                        glyph, per the palette's dark-mode primary pairing. A
                        deep-green tile would vanish into the section. */}
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-300 to-brand-500 text-brand-800 shadow-[0_14px_30px_-14px_rgba(62,187,158,0.5)] transition-transform duration-500 group-hover:scale-105">
                      <StepIcon size={24} />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.2em] text-brand-300 uppercase">
                        Gate {i + 1} of 4
                      </p>
                      <h3 className="mt-1.5 text-[1.22rem] text-paper-50">{step.title}</h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-300">
                        {step.body}
                      </p>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>

            <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2">
              {DURING_JOB.map((item) => (
                <RevealItem
                  key={item.title}
                  className="rounded-3xl border border-success-400/22 bg-success-500/8 p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-500/16 text-success-300">
                    <item.icon size={21} />
                  </span>
                  <h3 className="mt-4 text-[1.08rem] text-paper-50">{item.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-300">{item.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
