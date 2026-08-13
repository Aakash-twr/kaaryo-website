import Reveal from '../ui/Reveal'
import { SITE } from '../../data/site'
import { PhoneIcon, MailIcon, MapPinIcon, HeadsetIcon, BuildingIcon } from '../icons/FeatureIcons'

const CHANNELS = [
  {
    icon: PhoneIcon,
    label: 'Call us',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    note: 'Fastest for live booking issues · 24×7',
  },
  {
    icon: HeadsetIcon,
    label: 'Customer support',
    value: SITE.supportEmail,
    href: `mailto:${SITE.supportEmail}`,
    note: 'Bookings, refunds, worker feedback',
  },
  {
    icon: MailIcon,
    label: 'Business & partnerships',
    value: SITE.businessEmail,
    href: `mailto:${SITE.businessEmail}`,
    note: 'Housing societies, offices, press',
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {CHANNELS.map((c, i) => (
        <Reveal key={c.label} delay={0.06 * i}>
          <a
            href={c.href}
            className="group flex items-start gap-4 rounded-3xl border border-ink-900/8 bg-paper-50 p-6 transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-36px_rgba(15,23,42,0.5)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-brand-300 transition-transform duration-500 group-hover:-rotate-6">
              <c.icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-ink-500 uppercase">
                {c.label}
              </p>
              <p className="mt-1.5 truncate text-[1.02rem] font-bold text-ink-900 underline decoration-brand-400/0 decoration-2 underline-offset-4 transition-colors group-hover:decoration-brand-400">
                {c.value}
              </p>
              <p className="mt-1 text-[0.84rem] text-ink-500">{c.note}</p>
            </div>
          </a>
        </Reveal>
      ))}

      <Reveal delay={0.2}>
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 p-6 text-paper-100">
          <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-brand-500/16 blur-[70px]" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-50/8 text-brand-300">
            <BuildingIcon size={22} />
          </span>
          <p className="relative mt-5 font-mono text-[0.6rem] tracking-[0.16em] text-ink-400 uppercase">
            Registered office
          </p>
          <p className="relative mt-2 text-[1rem] leading-relaxed font-bold text-paper-50">
            {SITE.address.company}
          </p>
          <p className="relative mt-1.5 flex items-start gap-2 text-[0.9rem] leading-relaxed text-ink-300">
            <MapPinIcon size={16} className="mt-0.5 shrink-0 text-brand-400" />
            <span>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </span>
          </p>
          <p className="relative mt-5 border-t border-paper-50/10 pt-4 font-mono text-[0.68rem] tracking-[0.1em] text-ink-500 uppercase">
            Mon–Sat · 9:30am – 7:00pm
          </p>
        </div>
      </Reveal>
    </div>
  )
}
