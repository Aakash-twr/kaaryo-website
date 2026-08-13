import { Link } from 'react-router-dom'

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'

const SIZES = {
  sm: 'px-4 py-2 text-[0.82rem]',
  md: 'px-5 py-2.5 text-[0.9rem]',
  lg: 'px-7 py-3.5 text-[0.97rem]',
}

const VARIANTS = {
  primary:
    'text-white bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] hover:shadow-[0_16px_40px_-10px_rgba(0,103,79,0.7)] hover:-translate-y-0.5',
  dark: 'text-paper-50 bg-brand-700 hover:bg-brand-600 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.7)] hover:-translate-y-0.5',
  light:
    'text-ink-900 bg-paper-50 hover:bg-white shadow-[0_10px_28px_-14px_rgba(15,23,42,0.5)] hover:-translate-y-0.5',
  outline:
    'text-ink-900 border border-ink-900/15 bg-white/60 backdrop-blur-sm hover:border-ink-900/35 hover:bg-white',
  outlineLight:
    'text-paper-50 border border-paper-50/25 hover:border-paper-50/60 hover:bg-paper-50/10',
  ghost: 'text-ink-700 hover:text-ink-900 hover:bg-ink-900/5',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
