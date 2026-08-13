/**
 * Decorative hero backdrop: warm bloom gradients, a fine grid, and a
 * rangoli-inspired rosette — a quiet nod to Indian craft, drawn in SVG.
 */
function Rosette({ className = '' }) {
  const petals = Array.from({ length: 16 })
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g stroke="currentColor" fill="none" strokeWidth="0.9">
        <circle cx="100" cy="100" r="94" strokeDasharray="1.5 6" />
        <circle cx="100" cy="100" r="74" />
        <circle cx="100" cy="100" r="46" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="22" />
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="40"
            rx="9"
            ry="26"
            transform={`rotate(${(360 / petals.length) * i} 100 100)`}
          />
        ))}
      </g>
    </svg>
  )
}

export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-paper-50 to-paper-50" />
      <div className="bg-grid absolute inset-0 mask-fade-y opacity-80" />

      <div className="absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-brand-300/35 blur-[120px]" />
      <div className="absolute top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-brand-400/16 blur-[120px]" />
      <div className="absolute -bottom-28 left-1/3 h-[22rem] w-[22rem] rounded-full bg-success-300/22 blur-[110px]" />

      {/* Dialled back on phones, where the rosette otherwise sits under the headline. */}
      <Rosette className="animate-float absolute -top-16 right-[6%] h-[26rem] w-[26rem] text-brand-600/12 max-sm:opacity-45" />
      <Rosette className="absolute bottom-[-9rem] left-[-6rem] h-[20rem] w-[20rem] text-brand-600/10 max-sm:opacity-50" />

      {/* soft horizon so the hero melts into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-paper-50" />
    </div>
  )
}
