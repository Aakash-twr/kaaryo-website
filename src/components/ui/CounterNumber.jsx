import { useEffect, useRef, useState } from 'react'

/**
 * Counts 0 → value once the element scrolls into view.
 * Uses IntersectionObserver to trigger and requestAnimationFrame to tick,
 * with an ease-out curve so the number decelerates into its target.
 */
export default function CounterNumber({
  value,
  duration = 1900,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  separator = true,
}) {
  const nodeRef = useRef(null)
  const frameRef = useRef(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    let started = false

    const run = () => {
      const startedAt = performance.now()
      const tick = (now) => {
        const t = Math.min((now - startedAt) / duration, 1)
        // easeOutExpo — fast off the line, gentle landing
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        setDisplay(value * eased)
        if (t < 1) frameRef.current = requestAnimationFrame(tick)
        else setDisplay(value)
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [value, duration])

  const rounded =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  const formatted =
    separator && decimals === 0
      ? Number(rounded).toLocaleString('en-IN')
      : rounded

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
