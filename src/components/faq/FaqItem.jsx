import { AnimatePresence, motion } from 'framer-motion'
import { PlusIcon } from '../icons/UiIcons'

export default function FaqItem({ id, question, answer, isOpen, onToggle, index }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border transition-colors duration-400 ${
        isOpen
          ? 'border-ink-900/14 bg-white shadow-[0_26px_60px_-40px_rgba(15,23,42,0.5)]'
          : 'border-ink-900/8 bg-paper-50 hover:border-ink-900/14'
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className="flex w-full items-start gap-4 px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
        >
          <span
            className={`mt-0.5 font-mono text-[0.72rem] font-bold tabular-nums transition-colors duration-300 ${
              isOpen ? 'text-brand-500' : 'text-ink-400'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="flex-1 font-display text-[1.06rem] leading-snug font-bold tracking-[-0.02em] text-ink-900 sm:text-[1.16rem]">
            {question}
          </span>

          <motion.span
            aria-hidden="true"
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              isOpen
                ? 'bg-linear-to-br from-brand-500 to-brand-700 text-white'
                : 'border border-ink-900/12 text-ink-600'
            }`}
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.34, ease: [0.16, 0.84, 0.24, 1] }}
          >
            <PlusIcon size={16} strokeWidth={2} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.16, 0.84, 0.24, 1] },
              opacity: { duration: 0.28, delay: isOpen ? 0.08 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <div className="border-l-2 border-brand-400/50 pl-4 sm:ml-9 sm:pl-5">
                <p className="text-[0.95rem] leading-relaxed text-ink-600">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
