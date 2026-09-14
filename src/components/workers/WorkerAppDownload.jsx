import { m } from 'framer-motion'
import Reveal from '../ui/Reveal'
import { EASE } from '../ui/Reveal'

/* ------------------------------------------------------------------ */
/* Play Store badge — official badge image                             */
/* ------------------------------------------------------------------ */
function PlayStoreBadge({ href = '#' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id="worker-playstore-link"
      aria-label="Get Kaaryo Worker on Google Play Store"
      className="group transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
    >
      <img
        src="/google-play-badge.svg"
        alt="Get it on Google Play"
        width="160"
        height="48"
        className="h-12 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
      />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* App Store badge — official badge image                              */
/* ------------------------------------------------------------------ */
function AppStoreBadge({ href = '#' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id="worker-appstore-link"
      aria-label="Download Kaaryo Worker on the Apple App Store"
      className="group transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
    >
      <img
        src="/app-store-badge.svg"
        alt="Download on the App Store"
        width="160"
        height="48"
        className="h-12 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
      />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Feature pills                                                       */
/* ------------------------------------------------------------------ */
const APP_FEATURES = [
  { emoji: '📍', text: 'Jobs near you' },
  { emoji: '💸', text: 'Weekly payouts' },
  { emoji: '⏱️', text: 'Set your hours' },
  { emoji: '🔔', text: 'Instant alerts' },
]

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function WorkerAppDownload() {
  return (
    <section
      id="worker-app"
      aria-label="Kaaryo Worker App"
      className="relative isolate overflow-hidden bg-brand-800 py-20 sm:py-28"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 mask-fade-y opacity-40" />
        <div className="absolute h-[30rem] w-[30rem] -top-32 -right-20 rounded-full bg-brand-500/25 blur-[100px]" />
        <div className="absolute h-[22rem] w-[22rem] bottom-0 -left-16 rounded-full bg-brand-400/15 blur-[100px]" />
        <div className="absolute h-[18rem] w-[18rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-[100px]" />
      </div>

      <div className="container-k relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: text + badges ── */}
          <div>
            {/* Eyebrow */}
            <Reveal delay={0.04}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-brand-300 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-ping-slow" />
                Kaaryo Worker App
              </span>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-[2.4rem] leading-[1.0] font-extrabold tracking-[-0.04em] text-white sm:text-[3rem]">
                Your career,{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(110deg, #5ed0b6, #3ebb9e 50%, #0a8265)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  in your pocket.
                </span>
              </h2>
            </Reveal>

            {/* Body */}
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/65">
                The <strong className="font-semibold text-white/90">Kaaryo Worker</strong> app is
                all you need to find jobs, track earnings, and manage your schedule — available
                free on Android and iOS.
              </p>
            </Reveal>

            {/* Feature pills */}
            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {APP_FEATURES.map((f) => (
                  <span
                    key={f.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3.5 py-1.5 text-[0.82rem] text-white/70"
                  >
                    <span>{f.emoji}</span>
                    {f.text}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Store badges */}
            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-3">
                <PlayStoreBadge href="https://play.google.com/store" />
                <AppStoreBadge href="https://apps.apple.com" />
              </div>
            </Reveal>

            {/* Fine print */}
            <Reveal delay={0.34}>
              <p className="mt-5 flex items-center gap-2 text-[0.78rem] text-white/40">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Free to download · No joining fee · Available across India
              </p>
            </Reveal>
          </div>

          {/* ── Right: floating phone ── */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind phone */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 m-auto h-4/5 w-4/5 rounded-full bg-brand-400/20 blur-[70px]"
              />

              {/* Animated phone shell */}
              <m.div
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                style={{ animation: 'float 9s ease-in-out infinite' }}
                className="relative mx-auto w-[260px] sm:w-[300px]"
              >
                {/* Phone bezel */}
                <div className="relative overflow-hidden rounded-[3rem] border-[6px] border-white/15 bg-brand-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]">
                  {/* App screenshot */}
                  <img
                    src="/kaaryo-worker-app.jpg"
                    alt="Kaaryo Worker app dashboard showing available jobs and weekly earnings"
                    width="300"
                    height="534"
                    loading="eager"
                    className="block w-full"
                    style={{ display: 'block', background: '#08281f' }}
                  />
                </div>

                {/* Glass reflection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[3rem]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)',
                  }}
                />
              </m.div>

              {/* Stat chip — top right */}
              <m.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
                className="absolute -top-4 -right-4 sm:-right-8 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-brand-700/80 px-4 py-3 backdrop-blur-md shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[1.5rem]">⭐</span>
                <div>
                  <p className="text-[0.88rem] font-bold leading-none text-white">4.8 / 5</p>
                  <p className="mt-0.5 text-[0.65rem] text-white/50">Play Store rating</p>
                </div>
              </m.div>

              {/* Stat chip — bottom left */}
              <m.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
                className="absolute -bottom-4 -left-4 sm:-left-10 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-brand-700/80 px-4 py-3 backdrop-blur-md shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[1.5rem]">📲</span>
                <div>
                  <p className="text-[0.88rem] font-bold leading-none text-white">10,000+</p>
                  <p className="mt-0.5 text-[0.65rem] text-white/50">Downloads</p>
                </div>
              </m.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
