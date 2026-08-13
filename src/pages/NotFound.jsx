import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { Eyebrow } from '../components/ui/SectionHeading'
import { ArrowRightIcon } from '../components/icons/UiIcons'
import { ElectricianIcon } from '../components/icons/ServiceIcons'
import { NAV_LINKS } from '../components/layout/navLinks'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-paper-50 to-paper-50" />
        <div className="bg-grid absolute inset-0 mask-fade-y opacity-70" />
        <div className="absolute top-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-300/30 blur-[120px]" />
      </div>

      <div className="container-k relative text-center">
        <motion.span
          className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-700 text-brand-300"
          initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.35, 1, 0.6, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ElectricianIcon size={38} />
          </motion.span>
        </motion.span>

        <p className="font-display mt-8 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-ink-900/12 sm:text-[8rem]">
          404
        </p>

        <div className="-mt-6 sm:-mt-10">
          <Eyebrow>Page not found</Eyebrow>
          <h1 className="mt-6 text-[2.2rem] sm:text-[3rem]">
            This one is beyond
            <br className="hidden sm:block" /> even our electricians.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-600">
            The page you were looking for has moved or never existed. Everything that
            does exist is one tap away below.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" size="lg">
            Back to home
            <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button to="/services" variant="outline" size="lg">
            Browse services
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full border border-ink-900/10 bg-white/70 px-4 py-2 text-[0.84rem] font-semibold text-ink-600 backdrop-blur-sm transition hover:border-ink-900/25 hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
