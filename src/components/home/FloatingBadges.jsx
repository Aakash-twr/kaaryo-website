import { m } from 'framer-motion'
import { ShieldIcon, BoltIcon, RupeeIcon } from '../icons/FeatureIcons'
import { StarIcon } from '../icons/UiIcons'

const CARD =
  'absolute rounded-2xl border border-ink-900/8 bg-white/92 px-3.5 py-2.5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md'

function Badge({ children, className, delay, float }) {
  return (
    <m.div
      className={`${CARD} ${className}`}
      initial={{ opacity: 0, scale: 0.86, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 0.84, 0.24, 1] }}
    >
      <m.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </m.div>
    </m.div>
  )
}

/** The chips that orbit the phone — proof points, at a glance. */
export default function FloatingBadges() {
  return (
    <>
      {/* Two badges float clear of the device (above and below) and two tuck
          against its side bezels, so none of them cover the live screen. */}
      <Badge className="-top-9 -left-4 sm:-left-16" delay={0.7} float={5.5}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-success-500/12 text-success-600">
            <ShieldIcon size={17} />
          </span>
          <div>
            <p className="text-[0.78rem] leading-tight font-bold text-ink-900">
              4-step verified
            </p>
            <p className="font-mono text-[0.58rem] tracking-[0.1em] text-ink-500 uppercase">
              Aadhaar + police check
            </p>
          </div>
        </div>
      </Badge>

      <Badge className="top-[37%] -right-4 sm:-right-14 lg:-right-12" delay={0.9} float={6.4}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500/14 text-brand-600">
            <BoltIcon size={17} />
          </span>
          <div>
            <p className="text-[0.78rem] leading-tight font-bold text-ink-900">
              Matched in 48s
            </p>
            <p className="font-mono text-[0.58rem] tracking-[0.1em] text-ink-500 uppercase">
              median, all cities
            </p>
          </div>
        </div>
      </Badge>

      <Badge className="bottom-[17%] -left-5 sm:-left-20 lg:-left-24" delay={1.05} float={5.9}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-700 text-brand-300">
            <RupeeIcon size={17} />
          </span>
          <div>
            <p className="text-[0.78rem] leading-tight font-bold text-ink-900">
              Upfront prices
            </p>
            <p className="font-mono text-[0.58rem] tracking-[0.1em] text-ink-500 uppercase">
              no surprise bills
            </p>
          </div>
        </div>
      </Badge>

      <Badge className="-bottom-7 right-4 sm:right-10" delay={1.2} float={7}>
        <div className="flex items-center gap-1.5">
          <StarIcon size={14} className="text-warning-400" />
          <p className="font-mono text-[0.82rem] font-bold text-ink-900">4.8</p>
          <p className="text-[0.7rem] text-ink-500">/ 38,000 jobs</p>
        </div>
      </Badge>
    </>
  )
}
