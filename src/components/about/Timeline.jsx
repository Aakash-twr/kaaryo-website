import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const MILESTONES = [
  {
    year: '2026',
    tag: 'Founded',
    title: 'Kaaryo starts in Banjara Hills',
    body: 'A team of engineers and operators, one WhatsApp group of twelve electricians, and a spreadsheet pretending to be a dispatch system.',
  },
  {
    year: '2026',
    tag: 'First city',
    title: 'Hyderabad goes live',
    body: 'The four-gate verification process is written down and applied to every applicant. The 20-minute promise ships with a refund attached.',
  },
  {
    year: '2026',
    tag: 'Scale',
    title: 'Delhi and Bangalore open',
    body: 'Three cities, 500+ verified professionals, 38,000 completed jobs and a 4.8 average rating across all six trades.',
  },
  {
    year: 'Next',
    tag: 'Expanding',
    title: 'Five more cities',
    body: 'Mumbai, Pune, Chennai, Kolkata and Ahmedabad — each opening only once local supply can hold the arrival promise.',
  },
]

export default function Timeline() {
  return (
    <section className="relative overflow-hidden bg-brand-800 py-20 text-paper-100 sm:py-24">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[130px]" />

      <div className="container-k relative">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="The road so far"
          title="From twelve electricians to three cities"
          className="mb-16"
        />

        <RevealGroup className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[1.1rem] right-[10%] left-[10%] hidden border-t border-dashed border-paper-50/18 lg:block"
          />

          {MILESTONES.map((m, i) => (
            <RevealItem key={m.title} className="relative">
              <div className="flex items-center gap-3 lg:block">
                <span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[0.7rem] font-bold ${
                    i === MILESTONES.length - 1
                      ? 'border-success-400 bg-brand-800 text-success-300'
                      : 'border-brand-400 bg-brand-800 text-brand-300'
                  }`}
                >
                  {i + 1}
                </span>
                <p className="font-display text-[1.7rem] leading-none font-extrabold tracking-[-0.04em] text-paper-50 lg:mt-5">
                  {m.year}
                </p>
              </div>

              <p className="mt-3 inline-flex rounded-full bg-paper-50/8 px-3 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-brand-300 uppercase">
                {m.tag}
              </p>
              <h3 className="mt-3 text-[1.14rem] text-paper-50">{m.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-300">{m.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
