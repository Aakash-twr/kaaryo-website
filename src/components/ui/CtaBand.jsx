import Button from './Button'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeading'
import { ArrowRightIcon, CheckIcon } from '../icons/UiIcons'

const GUARANTEES = [
  'Late? Booking is free',
  'Fixed prices, no surprises',
  'Redo or refund in 24 hours',
]

export default function CtaBand({
  eyebrow = 'Ready when you are',
  title = (
    <>
      Something broken?
      <br className="hidden sm:block" /> Someone is already nearby.
    </>
  ),
  body = 'Book in under a minute and watch a verified professional make their way to your door. No calls, no quotes, no waiting around.',
  primary = { label: 'Book a service', to: '/services' },
  secondary = { label: 'Join as a pro', to: '/for-workers' },
  guarantees = GUARANTEES,
}) {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-20 text-paper-100 sm:py-28">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-500/18 blur-[130px]" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-[24rem] w-[24rem] rounded-full bg-brand-600/12 blur-[120px]" />

      <div className="container-k relative text-center">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-7 max-w-3xl text-[2.4rem] leading-[1.02] text-paper-50 sm:text-[3.4rem] lg:text-[4.1rem]">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-300">
            {body}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button to={primary.to} size="lg">
              {primary.label}
              <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="outlineLight" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <ul className="mt-11 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {guarantees.map((g) => (
              <li key={g} className="inline-flex items-center gap-2 text-[0.86rem] text-ink-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-500/16 text-success-300">
                  <CheckIcon size={11} strokeWidth={3} />
                </span>
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
