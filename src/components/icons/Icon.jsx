/**
 * Shared chrome for every hand-drawn Kaaryo icon.
 * One grid (24), one stroke weight, one set of joins — so the whole
 * icon set reads as a family no matter where it is used.
 */
export default function Icon({ children, size = 24, strokeWidth = 1.6, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}
