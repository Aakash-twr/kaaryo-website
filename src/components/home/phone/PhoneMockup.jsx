import LiveTrackScreen from './LiveTrackScreen'

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2.5 pb-1.5 font-mono text-[0.6rem] font-semibold text-ink-800">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        {/* signal */}
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="2.4" height="3" rx="0.8" />
          <rect x="4" y="5" width="2.4" height="5" rx="0.8" />
          <rect x="8" y="2.6" width="2.4" height="7.4" rx="0.8" />
          <rect x="12" y="0" width="2.4" height="10" rx="0.8" opacity="0.35" />
        </svg>
        {/* wifi */}
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
          <path d="M1 3.2a7.4 7.4 0 0 1 10 0M3 5.4a4.4 4.4 0 0 1 6 0" />
          <circle cx="6" cy="7.6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <svg width="18" height="9" viewBox="0 0 18 9" aria-hidden="true">
          <rect x="0.5" y="0.5" width="14" height="8" rx="2.4" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="9.4" height="5" rx="1.4" fill="currentColor" />
          <path d="M16 3.2v2.6a1.6 1.6 0 0 0 0-2.6Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  )
}

/** Device frame built entirely from CSS — bezel, notch, side buttons, glare. */
export default function PhoneMockup({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* side buttons */}
      <div className="absolute top-[8.5rem] -left-[3px] h-14 w-[3px] rounded-l-sm bg-brand-600/70" />
      <div className="absolute top-[6.2rem] -left-[3px] h-8 w-[3px] rounded-l-sm bg-brand-600/70" />
      <div className="absolute top-[7.4rem] -right-[3px] h-20 w-[3px] rounded-r-sm bg-brand-600/70" />

      <div className="relative rounded-[2.6rem] bg-linear-to-b from-brand-600 via-brand-700 to-brand-800 p-[0.42rem] shadow-[0_50px_90px_-40px_rgba(15,23,42,0.7),0_0_0_1px_rgba(248,250,252,0.08)]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-paper-100">
          {/* notch */}
          <div className="absolute top-2 left-1/2 z-20 flex h-[1.4rem] w-[5.4rem] -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            <span className="h-1 w-6 rounded-full bg-brand-600/80" />
          </div>

          <div className="h-[31.5rem] w-[16.5rem] pt-6 sm:h-[33rem] sm:w-[17.5rem]">
            <StatusBar />
            <div className="h-[calc(100%-2.1rem)]">
              <LiveTrackScreen />
            </div>
          </div>

          {/* glass glare */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-linear-to-tr from-white/0 via-white/22 to-white/0 opacity-60 mix-blend-overlay" />
        </div>
      </div>
    </div>
  )
}
