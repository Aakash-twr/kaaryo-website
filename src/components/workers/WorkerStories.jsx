import SectionHeading from '../ui/SectionHeading'
import Avatar from '../ui/Avatar'
import Stars from '../ui/Stars'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { WORKER_TESTIMONIALS } from '../../data/testimonials'
import { QuoteIcon } from '../icons/UiIcons'
import { SparkleIcon } from '../icons/FeatureIcons'

export default function WorkerStories() {
  return (
    <section className="relative overflow-hidden bg-brand-800 py-20 text-paper-100 sm:py-24">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -bottom-32 right-[10%] h-[26rem] w-[26rem] rounded-full bg-brand-500/12 blur-[130px]" />

      <div className="container-k relative">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="In their words"
          title="Three pros, three cities"
          body="We asked our longest-standing professionals what actually changed for them."
          className="mb-14"
        />

        <RevealGroup className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {WORKER_TESTIMONIALS.map((w) => (
            <RevealItem
              key={w.name}
              className="group flex flex-col rounded-4xl border border-paper-50/10 bg-paper-50/4 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-paper-50/22 hover:bg-paper-50/8"
            >
              <div className="flex items-center justify-between">
                <QuoteIcon size={24} className="text-brand-400" />
                <Stars size={13} />
              </div>

              <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-success-500/12 px-3 py-1.5 font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-success-300 uppercase">
                <SparkleIcon size={12} />
                {w.stat}
              </p>

              <blockquote className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink-300">
                “{w.quote}”
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-paper-50/10 pt-5">
                <Avatar name={w.name} size={42} verified />
                <div>
                  <p className="text-[0.92rem] leading-tight font-bold text-paper-50">
                    {w.name}
                  </p>
                  <p className="font-mono text-[0.62rem] tracking-[0.12em] text-ink-400 uppercase">
                    {w.role} · {w.city}
                  </p>
                </div>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
