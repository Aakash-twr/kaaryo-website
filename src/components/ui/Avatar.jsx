import { CheckIcon } from '../icons/UiIcons'

/** Deterministic warm gradient per name — no images, no randomness on rerender. */
const PAIRS = [
  ['#3EBB9E', '#00674F'],
  ['#5EAAE8', '#1D5FA8'],
  ['#A78BFA', '#6D28D9'],
  ['#FBBF24', '#B45309'],
  ['#5ED0B6', '#0A8265'],
  ['#F87171', '#B91C1C'],
]

function hashOf(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 9973
  return h
}

export default function Avatar({ name, size = 44, verified = false, className = '' }) {
  const initials = name
    .replace(/[^A-Za-z ]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const [from, to] = PAIRS[hashOf(name) % PAIRS.length]

  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={{ width: size, height: size }}>
      <span
        className="flex h-full w-full items-center justify-center rounded-full font-display font-bold text-white ring-2 ring-white/70"
        style={{
          background: `linear-gradient(135deg, ${from}, ${to})`,
          fontSize: size * 0.36,
          letterSpacing: '-0.02em',
        }}
      >
        {initials || 'K'}
      </span>
      {verified && (
        <span className="absolute -right-0.5 -bottom-0.5 flex h-[42%] w-[42%] items-center justify-center rounded-full bg-success-500 text-white ring-2 ring-white">
          <CheckIcon size={size * 0.24} strokeWidth={3.4} />
        </span>
      )}
    </span>
  )
}
