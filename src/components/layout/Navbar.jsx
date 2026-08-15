import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../icons/Logo'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { NAV_LINKS } from './navLinks'
import { MenuIcon, ArrowRightIcon } from '../icons/UiIcons'
import { BoltIcon } from '../icons/FeatureIcons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes the overlay.
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      {/* Announcement rail — sits above the nav and scrolls away */}
      <div className="relative z-40 overflow-hidden bg-brand-700 text-paper-100">
        <div className="container-k flex items-center justify-center gap-2.5 py-2 text-center font-mono text-[0.66rem] tracking-[0.14em] uppercase sm:text-[0.7rem]">
          <BoltIcon size={13} className="shrink-0 text-brand-400" />
          {/* Short form on phones so the line never truncates mid-word. */}
          <span className="sm:hidden">3 cities live · 20-minute arrival</span>
          <span className="max-sm:hidden">
            Live in Hyderabad · Delhi · Bangalore — average arrival 20 minutes
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ink-900/8 bg-paper-50/85 shadow-[0_10px_34px_-22px_rgba(15,23,42,0.6)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-k">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? 'h-[4.1rem]' : 'h-[4.9rem]'
            }`}
          >
            <NavLink to="/" aria-label="Kaaryo — home" className="rounded-xl">
              <Logo size={scrolled ? 34 : 38} />
            </NavLink>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `relative rounded-full px-4 py-2 text-[0.89rem] font-semibold transition-colors ${
                          isActive
                            ? 'text-ink-900'
                            : 'text-ink-600 hover:text-ink-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <span
                            className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-linear-to-r from-brand-500 to-brand-700 transition-transform duration-300 ${
                              isActive ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              {/* max-* variants, not `hidden md:inline-flex`: the button's own
                  `inline-flex` is emitted after `.hidden` and would win. */}
              <Button to="/for-workers" variant="ghost" size="sm" className="max-md:hidden">
                Join as a pro
              </Button>
              <Button to="/services" size="sm" className="max-sm:hidden">
                Book a service
                <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="rounded-full border border-ink-900/12 bg-white/70 p-2.5 text-ink-800 backdrop-blur-sm transition hover:bg-white lg:hidden"
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
