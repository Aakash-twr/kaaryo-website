import { useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from './navLinks'
import Logo from '../icons/Logo'
import Button from '../ui/Button'
import { CloseIcon, ArrowRightIcon } from '../icons/UiIcons'
import { PhoneIcon, MailIcon, BoltIcon } from '../icons/FeatureIcons'
import { SITE } from '../../data/site'

const PANEL = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 260, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
}

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Escape to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Outside click target */}
          <m.div
            className="absolute inset-0 bg-ink-900/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            variants={PANEL}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-y-0 right-0 flex w-[min(23rem,92vw)] flex-col bg-paper-50 shadow-[-24px_0_60px_-20px_rgba(15,23,42,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-ink-900/8 px-6 py-5">
              <Logo size={34} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full border border-ink-900/12 p-2 text-ink-700 transition hover:bg-ink-900/5 hover:text-ink-900"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <m.ul
                className="space-y-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } } }}
              >
                {[{ label: 'Home', to: '/' }, ...NAV_LINKS].map((link) => (
                  <m.li
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[1.32rem] font-bold tracking-[-0.03em] transition ${
                          isActive
                            ? 'bg-brand-700 text-paper-50'
                            : 'text-ink-800 hover:bg-ink-900/5'
                        }`
                      }
                    >
                      {link.label}
                      <ArrowRightIcon size={18} className="opacity-45" />
                    </NavLink>
                  </m.li>
                ))}
              </m.ul>

              <div className="mt-8 rounded-3xl border border-ink-900/8 bg-white p-5">
                <p className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink-500">
                  <BoltIcon size={14} className="text-brand-500" />
                  20-minute promise
                </p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-600">
                  No worker at your door within 20 minutes? The booking is free.
                </p>
                <Button to="/services" size="md" className="mt-4 w-full" onClick={onClose}>
                  Book a service
                  <ArrowRightIcon size={17} />
                </Button>
              </div>
            </nav>

            <div className="space-y-2 border-t border-ink-900/8 px-6 py-5 text-[0.86rem]">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-ink-600 transition hover:text-ink-900"
              >
                <PhoneIcon size={17} className="text-brand-500" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="flex items-center gap-2.5 text-ink-600 transition hover:text-ink-900"
              >
                <MailIcon size={17} className="text-brand-500" />
                {SITE.supportEmail}
              </a>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
