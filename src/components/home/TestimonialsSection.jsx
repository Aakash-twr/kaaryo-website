import SectionHeading from '../ui/SectionHeading'
import Marquee from '../ui/Marquee'
import TestimonialCard from './TestimonialCard'
import CounterNumber from '../ui/CounterNumber'
import Reveal from '../ui/Reveal'
import { CUSTOMER_TESTIMONIALS } from '../../data/testimonials'
import { StarIcon } from '../icons/UiIcons'

export default function TestimonialsSection() {
  // Both rows carry every testimonial so the tracks stay wider than any
  // viewport — no visible seam on ultrawide screens.
  const rowOne = CUSTOMER_TESTIMONIALS
  const rowTwo = [...CUSTOMER_TESTIMONIALS].reverse()

  return (
    <section className="relative overflow-hidden bg-paper-100 py-20 sm:py-24">
      <div className="container-k relative">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Loved in 3 cities"
            title={
              <>
                38,000 jobs done.
                <br className="hidden sm:block" /> Here&apos;s how they went.
              </>
            }
            body="Ratings are collected after every single job and shown publicly on worker profiles. Nothing here is curated by us."
          />

          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-center gap-5 rounded-3xl border border-ink-900/8 bg-paper-50 px-7 py-5">
              <p className="font-display text-[3.2rem] leading-none font-extrabold tracking-[-0.05em] text-ink-900">
                <CounterNumber value={4.8} decimals={1} />
              </p>
              <div>
                <StarIcon size={16} className="text-warning-400" />
                <p className="mt-1.5 text-[0.86rem] font-bold text-ink-800">Average rating</p>
                <p className="font-mono text-[0.62rem] tracking-[0.12em] text-ink-500 uppercase">
                  38,412 rated jobs
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 space-y-5">
        <Marquee>
          {rowOne.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowTwo.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
