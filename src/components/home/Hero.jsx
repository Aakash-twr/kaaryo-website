import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroBackdrop from './HeroBackdrop'
import PhoneMockup from './phone/PhoneMockup'
import FloatingBadges from './FloatingBadges'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Stars from '../ui/Stars'
import { ArrowRightIcon, PlayIcon } from '../icons/UiIcons'
import { SERVICE_ICONS } from '../icons/ServiceIcons'
import { CATEGORIES } from '../../data/services'

const EASE = [0.16, 0.84, 0.24, 1]
const up = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

function Underline() {
  return (
    <motion.svg
      viewBox="0 0 320 20"
      // Sits clear of the baseline: the stroke dips slightly, so it reads as a
      // hand-drawn underline rather than a strikethrough at any size.
      className="absolute -bottom-[0.1em] left-0 h-[0.42em] w-full text-brand-400/75"
      fill="none"
      aria-hidden="true"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.85, ease: 'easeInOut' }}
    >
      <motion.path
        d="M5 8c62 8 192 8 310 1.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <HeroBackdrop />

      <div className="container-k relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={up}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/75 py-1.5 pr-4 pl-1.5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.5)] backdrop-blur-sm">
                <span className="rounded-full bg-brand-700 px-2.5 py-1 font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-brand-300 uppercase">
                  New
                </span>
                <span className="text-[0.82rem] font-semibold text-ink-700">
                  Now live across Mumbai, Delhi &amp; Bangalore
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={up}
              className="mt-7 text-[3rem] leading-[0.94] sm:text-[4.2rem] lg:text-[4.9rem]"
            >
              Get any home
              <br />
              work done in{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="text-gradient-brand">20 minutes</span>
                <Underline />
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-7 max-w-lg text-[1.06rem] leading-relaxed text-ink-600 sm:text-[1.14rem]"
            >
              Verified professionals. Instant booking. At your doorstep. Book an
              electrician, cleaner, cook or plumber and watch them arrive on a
              live map — at a price you agreed before they left.
            </motion.p>

            <motion.div variants={up} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/services" size="lg">
                Book a service
                <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button to="/how-it-works" variant="outline" size="lg">
                <PlayIcon size={13} className="text-brand-600" />
                See how it works
              </Button>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {['Priya Sharma', 'Rohit Mehta', 'Anita Kaur', 'Suresh Patil'].map((n) => (
                    <Avatar key={n} name={n} size={34} />
                  ))}
                </div>
                <div>
                  <p className="text-[0.86rem] font-bold text-ink-900">10,000+ homes served</p>
                  <p className="font-mono text-[0.62rem] tracking-[0.12em] text-ink-500 uppercase">
                    across 3 cities
                  </p>
                </div>
              </div>
              <div className="h-9 w-px bg-ink-900/10 max-sm:hidden" />
              <div>
                <Stars size={15} />
                <p className="mt-1 font-mono text-[0.62rem] tracking-[0.12em] text-ink-500 uppercase">
                  4.8 avg · 500+ verified pros
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 44, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -1.4 }}
              transition={{ duration: 1.05, delay: 0.2, ease: EASE }}
              className="relative"
            >
              <PhoneMockup />
              <FloatingBadges />
            </motion.div>
          </div>
        </div>

        {/* Quick-pick service rail */}
        <motion.div
          className="mt-16 lg:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.p
            variants={up}
            className="mb-4 font-mono text-[0.66rem] tracking-[0.22em] text-ink-500 uppercase"
          >
            What needs doing today?
          </motion.p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => {
              const CatIcon = SERVICE_ICONS[cat.slug]
              return (
                <motion.div key={cat.slug} variants={up}>
                  <Link
                    to="/services"
                    className="group flex h-full items-center gap-3 rounded-2xl border border-ink-900/8 bg-white/70 px-3.5 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink-900/16 hover:bg-white hover:shadow-[0_16px_34px_-22px_rgba(15,23,42,0.5)]"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${cat.accent}1f`, color: cat.accent }}
                    >
                      <CatIcon size={19} />
                    </span>
                    <span className="text-[0.86rem] font-bold text-ink-800">{cat.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
