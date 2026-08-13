import Marquee from '../ui/Marquee'
import { BoltIcon } from '../icons/FeatureIcons'

const PROMISES = [
  '20-minute arrival',
  'Aadhaar-verified pros',
  'Fixed transparent prices',
  'Live worker tracking',
  'Satisfaction guaranteed',
  'Cash, UPI or card',
  '24×7 human support',
  'Late? Booking is free',
]

export default function TickerStrip() {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-4 text-paper-100">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <Marquee className="relative">
        {PROMISES.map((p) => (
          <span key={p} className="flex items-center">
            <span className="font-display px-6 text-[1.15rem] font-bold tracking-[-0.02em] whitespace-nowrap sm:text-[1.4rem]">
              {p}
            </span>
            <BoltIcon size={16} className="text-brand-400" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
