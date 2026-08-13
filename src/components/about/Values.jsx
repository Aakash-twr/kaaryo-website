import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { BoltIcon, ShieldIcon, RupeeIcon, MapPinIcon } from '../icons/FeatureIcons'

const VALUES = [
  {
    icon: MapPinIcon,
    title: 'Depth before breadth',
    body: 'We would rather be excellent in three cities than mediocre in thirty. A new city opens only when it has enough verified pros to keep the promise.',
  },
  {
    icon: ShieldIcon,
    title: 'The worker is the product',
    body: 'Our app is a thin layer over one hard thing: finding, vetting and retaining genuinely skilled people. Everything else is packaging.',
  },
  {
    icon: RupeeIcon,
    title: 'A price is a promise',
    body: 'No surge, no negotiation at the door, no “sir, this is extra”. If we quoted it, we honour it — even when we got the estimate wrong.',
  },
  {
    icon: BoltIcon,
    title: 'Speed is a feature, not a slogan',
    body: 'Twenty minutes is an operational target we measure every day, in every neighbourhood. When we miss it, the booking is on us.',
  },
]

export default function Values() {
  return (
    <section className="bg-paper-100 py-20 sm:py-24">
      <div className="container-k">
        <SectionHeading
          align="center"
          eyebrow="What we believe"
          title="Four convictions we build on"
          body="Not values on a wall — these are the arguments we actually settle product decisions with."
          className="mb-14"
        />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {VALUES.map((v, i) => (
            <RevealItem
              key={v.title}
              className="group relative overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_64px_-42px_rgba(15,23,42,0.5)] sm:p-8"
            >
              <span className="font-mono absolute top-6 right-7 text-[2.4rem] leading-none font-bold text-ink-900/6 transition-colors duration-500 group-hover:text-brand-500/20">
                0{i + 1}
              </span>
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 p-3 text-white shadow-[0_14px_30px_-16px_rgba(0,103,79,0.7)] transition-transform duration-500 group-hover:-rotate-6">
                <v.icon size={24} />
              </span>
              <h3 className="mt-6 max-w-xs text-[1.32rem] text-ink-900">{v.title}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-600">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
