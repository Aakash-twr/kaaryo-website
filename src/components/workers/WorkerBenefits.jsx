import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { WORKER_BENEFITS } from '../../data/site'
import {
  ClockIcon,
  WalletIcon,
  HomeIcon,
  HeadsetIcon,
  GiftIcon,
  TrophyIcon,
} from '../icons/FeatureIcons'

const ICONS = [ClockIcon, WalletIcon, HomeIcon, HeadsetIcon, GiftIcon, TrophyIcon]

export default function WorkerBenefits() {
  return (
    <section className="bg-paper-100 py-20 sm:py-24">
      <div className="container-k">
        <SectionHeading
          align="center"
          eyebrow="What you get"
          title="Six reasons pros stay on Kaaryo"
          body="Not perks on a poster — these are the things our professionals say kept them here after the first month."
          className="mb-14"
        />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WORKER_BENEFITS.map((benefit, i) => {
            const BenefitIcon = ICONS[i]
            return (
              <RevealItem
                key={benefit.title}
                className="group relative overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_64px_-42px_rgba(15,23,42,0.5)]"
              >
                <span className="pointer-events-none absolute -top-20 -right-14 h-44 w-44 rounded-full bg-brand-300/0 blur-[60px] transition-colors duration-700 group-hover:bg-brand-300/40" />
                <span className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-700 p-3 text-brand-300 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6">
                  <BenefitIcon size={24} />
                </span>
                <h3 className="relative mt-6 text-[1.24rem] text-ink-900">{benefit.title}</h3>
                <p className="relative mt-2.5 text-[0.93rem] leading-relaxed text-ink-600">
                  {benefit.body}
                </p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
