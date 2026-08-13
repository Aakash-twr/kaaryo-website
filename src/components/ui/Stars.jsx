import { StarIcon } from '../icons/UiIcons'

export default function Stars({ count = 5, size = 14, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-warning-400 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} size={size} />
      ))}
    </span>
  )
}
