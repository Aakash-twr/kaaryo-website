import { motion } from 'framer-motion'
import { formatDuration, priceOf } from '../../data/services'
import { ClockIcon } from '../icons/FeatureIcons'
import { ArrowRightIcon } from '../icons/UiIcons'

export default function ServiceRow({ item, accent, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.055, ease: [0.16, 0.84, 0.24, 1] }}
      className="group relative flex items-center gap-4 rounded-2xl border border-ink-900/8 bg-paper-50 px-4 py-4 transition-all duration-300 hover:border-ink-900/16 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)] sm:px-5"
    >
      <span
        className="h-9 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:h-11"
        style={{ backgroundColor: accent }}
      />

      <div className="min-w-0 flex-1">
        <p className="text-[0.98rem] leading-tight font-bold text-ink-900">{item.name}</p>
        <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.06em] text-ink-500">
          <ClockIcon size={12} className="text-ink-400" />
          {formatDuration(item.mins)}
          <span className="text-ink-300">·</span>
          Fixed price
        </p>
      </div>

      <p className="font-display shrink-0 text-[1.24rem] leading-none font-extrabold tracking-[-0.03em] text-ink-900">
        {priceOf(item.price)}
      </p>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-500 transition-all duration-300 group-hover:border-ink-900 group-hover:bg-brand-700 group-hover:text-paper-50">
        <ArrowRightIcon size={15} />
      </span>
    </motion.li>
  )
}
