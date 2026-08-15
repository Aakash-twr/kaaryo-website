import { m } from 'framer-motion'
import { useId } from 'react'
import { INDIA_PATH, project } from './indiaGeometry'
import { LIVE_CITIES, SOON_CITIES } from '../../data/site'

const LIVE_R = 2.2
const SOON_R = 1.4

export default function IndiaMap() {
  const id = useId()

  return (
    <svg
      viewBox="-15 -2 110 105"
      className="h-full w-full"
      role="img"
      aria-label="Kaaryo coverage across India: live in Hyderabad, Delhi and Bangalore, with Ahmedabad, Mumbai, Chennai and Kolkata coming soon"
    >
      <defs>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#1A6B54" />
          <stop offset="100%" stopColor="#105341" />
        </linearGradient>
        <pattern id={`${id}-dots`} width="2.6" height="2.6" patternUnits="userSpaceOnUse">
          <circle cx="1.3" cy="1.3" r="0.32" fill="#F8FAFC" fillOpacity="0.16" />
        </pattern>
      </defs>

      {/* soft halo */}
      <m.path
        d={INDIA_PATH}
        fill="none"
        stroke="#3EBB9E"
        strokeWidth="2.2"
        strokeOpacity="0.14"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <m.path
        d={INDIA_PATH}
        fill={`url(#${id}-land)`}
        stroke="#E2E8F0"
        strokeOpacity="0.3"
        strokeWidth="0.55"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ pathLength: { duration: 1.8, ease: 'easeInOut' }, opacity: { duration: 0.6 } }}
      />
      <path d={INDIA_PATH} fill={`url(#${id}-dots)`} strokeLinejoin="round" />

      {/* coming soon */}
      {SOON_CITIES.map((city, i) => {
        const { x, y } = project(city.lon, city.lat)
        const labelX = city.anchor === 'end' ? x - 2.8 : x + 2.8
        return (
          <m.g
            key={city.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
          >
            <circle
              cx={x}
              cy={y}
              r={SOON_R}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="0.55"
              strokeDasharray="1 1"
            />
            <text
              x={labelX}
              y={y + 1.05}
              textAnchor={city.anchor}
              fill="#94A3B8"
              fontSize="3"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {city.name}
            </text>
          </m.g>
        )
      })}

      {/* live cities */}
      {LIVE_CITIES.map((city, i) => {
        const { x, y } = project(city.lon, city.lat)
        const labelX = city.anchor === 'end' ? x - 3.9 : x + 3.9
        return (
          <m.g
            key={city.name}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 1.35 + i * 0.14, ease: [0.16, 0.84, 0.24, 1] }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {/* Pulse scales the marker rather than animating `r`, so the
                attribute stays a valid length at every frame. */}
            <m.circle
              cx={x}
              cy={y}
              r={LIVE_R}
              fill="#3EBB9E"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 3.1], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.5 }}
            />
            <circle cx={x} cy={y} r={LIVE_R} fill="#3EBB9E" stroke="#F8FAFC" strokeWidth="0.65" />
            <text
              x={labelX}
              y={y + 0.3}
              textAnchor={city.anchor}
              fill="#F8FAFC"
              fontSize="3.5"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {city.name}
            </text>
            <text
              x={labelX}
              y={y + 4}
              textAnchor={city.anchor}
              fill="#73E6CB"
              fontSize="2.6"
              fontFamily="'JetBrains Mono', monospace"
            >
              {city.workers}
            </text>
          </m.g>
        )
      })}
    </svg>
  )
}
