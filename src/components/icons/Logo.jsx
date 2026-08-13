import { useId } from 'react'

/**
 * The Kaaryo mark: a K whose lower arm is struck through as a bolt —
 * "work, fast". Drawn on a 40 grid so it stays crisp at nav size.
 */
export function LogoMark({ size = 40, className = '' }) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3EBB9E" />
          <stop offset="48%" stopColor="#0A8265" />
          <stop offset="100%" stopColor="#00674F" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill={`url(#${id}-g)`} />
      <path
        d="M14.5 9.5v21"
        stroke="#fff"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M27.8 9.8 18.4 19.2"
        stroke="#fff"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18.6 18.4h6.9l-3.2 4.2h5.4l-7.9 8.4 2.2-6.1h-4.4"
        fill="#fff"
      />
    </svg>
  )
}

export default function Logo({ size = 38, className = '', tone = 'ink' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span
        className={`font-display text-[1.42rem] font-extrabold tracking-[-0.045em] ${
          tone === 'light' ? 'text-paper-50' : 'text-ink-900'
        }`}
      >
        Kaaryo
        <span className="text-brand-500">.</span>
      </span>
    </span>
  )
}
