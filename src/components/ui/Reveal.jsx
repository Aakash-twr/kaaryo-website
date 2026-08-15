import { m } from 'framer-motion'

const EASE = [0.16, 0.84, 0.24, 1]

/** Single element that rises into view once. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.72,
  className = '',
  as = 'div',
}) {
  const MotionTag = m[as] || m.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({ children, className = '', stagger = 0.09, delay = 0.05, amount = 0.15 }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </m.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
}

export function RevealItem({ children, className = '', as = 'div', ...rest }) {
  const MotionTag = m[as] || m.div
  return (
    <MotionTag className={className} variants={revealItem} {...rest}>
      {children}
    </MotionTag>
  )
}

export { EASE }
