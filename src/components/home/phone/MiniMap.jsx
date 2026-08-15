import { m } from 'framer-motion'
import { useId } from 'react'

const ROUTE =
  'M22 126 H70 Q86 126 86 108 V84 Q86 68 104 68 H150 Q168 68 168 52 V34 H206'

// Waypoints traced along ROUTE, so the marker rides the same line.
const RX = [22, 70, 86, 86, 104, 150, 168, 168, 206]
const RY = [126, 126, 108, 84, 68, 68, 52, 34, 34]

const BLOCKS = [
  [8, 18, 46, 30],
  [62, 10, 52, 34],
  [124, 14, 40, 26],
  [8, 60, 52, 26],
  [104, 88, 46, 28],
  [180, 74, 44, 34],
  [30, 148, 60, 22],
  [126, 140, 66, 26],
]

/** Stylised city map — all CSS/SVG, no tiles, no external requests. */
export default function MiniMap() {
  const id = useId()
  return (
    <div className="relative h-[9.6rem] overflow-hidden rounded-2xl bg-[#EEF3F0] ring-1 ring-ink-900/8">
      <svg viewBox="0 0 240 176" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-route`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A8265" />
            <stop offset="100%" stopColor="#00674F" />
          </linearGradient>
        </defs>

        <rect width="240" height="176" fill="#EEF3F0" />
        {BLOCKS.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="4"
            fill="#E3EAE6"
            opacity={0.9}
          />
        ))}

        {/* roads */}
        <g stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round">
          <path d="M0 52h240M0 122h240M96 0v176M176 0v176" opacity="0.95" />
        </g>
        <g stroke="#DCE5E0" strokeWidth="2" strokeLinecap="round">
          <path d="M0 90h240M40 0v176" />
        </g>

        {/* route */}
        <path d={ROUTE} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none" />
        <m.path
          d={ROUTE}
          stroke={`url(#${id}-route)`}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="8 9"
          animate={{ strokeDashoffset: [0, -68] }}
          transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
        />

        {/* destination — home */}
        <g transform="translate(206 34)">
          <circle r="13" fill="#0F172A" opacity="0.12" />
          <circle r="8" fill="#0F172A" />
          <path
            d="M-3.6 0.6 0-2.4l3.6 3v3.8h-7.2z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </g>

        {/* origin */}
        <circle cx="22" cy="126" r="4.4" fill="#0F172A" opacity="0.3" />

        {/* worker travelling the route */}
        <m.g
          animate={{ x: RX, y: RY }}
          transition={{ duration: 7.2, ease: 'linear', repeat: Infinity, times: [0, 0.18, 0.28, 0.4, 0.5, 0.68, 0.78, 0.9, 1] }}
        >
          <circle r="12" fill="#3EBB9E" opacity="0.18" />
          <circle r="7.2" fill="#3EBB9E" stroke="#fff" strokeWidth="2.4" />
        </m.g>
      </svg>

      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.1em] text-ink-700 uppercase shadow-sm backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-success-500" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
        </span>
        Live
      </div>
    </div>
  )
}
