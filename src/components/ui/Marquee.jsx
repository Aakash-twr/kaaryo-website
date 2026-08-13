/**
 * Infinite horizontal ticker. The track holds the children twice and slides
 * exactly -50%, so the loop point is invisible. Pauses on hover.
 */
export default function Marquee({
  children,
  speed = 'normal',
  reverse = false,
  fade = true,
  className = '',
}) {
  const anim = reverse
    ? 'animate-marquee-rev'
    : speed === 'slow'
      ? 'animate-marquee-slow'
      : 'animate-marquee'

  return (
    <div
      className={`pause-hover overflow-hidden ${fade ? 'mask-fade-x' : ''} ${className}`}
    >
      <div className={`flex w-max ${anim}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
