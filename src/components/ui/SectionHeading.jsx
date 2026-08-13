import Reveal from './Reveal'

export function Eyebrow({ children, tone = 'ink', className = '' }) {
  const tones = {
    ink: 'text-ink-500 border-ink-900/12 bg-white/70',
    light: 'text-paper-200 border-paper-50/18 bg-paper-50/8',
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.22em] ${tones[tone]} ${className}`}
    >
      {/* brand-300→500: the dot has to stay visible on paper *and* on the
          brand-green CTA card, where a deep-green dot disappears. */}
      <span className="h-1.5 w-1.5 rounded-full bg-linear-to-br from-brand-300 to-brand-500" />
      {children}
    </span>
  )
}

export default function SectionHeading({
  eyebrow,
  title,
  body,
  tone = 'ink',
  align = 'left',
  className = '',
  children,
}) {
  const isLight = tone === 'light'
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={`mt-5 text-[2.1rem] leading-[1.03] sm:text-[2.6rem] lg:text-[3.1rem] ${
            isLight ? 'text-paper-50' : 'text-ink-900'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-[1.02rem] leading-relaxed sm:text-[1.08rem] ${
              isLight ? 'text-ink-300' : 'text-ink-600'
            }`}
          >
            {body}
          </p>
        </Reveal>
      )}
      {children && <Reveal delay={0.18}>{children}</Reveal>}
    </div>
  )
}
