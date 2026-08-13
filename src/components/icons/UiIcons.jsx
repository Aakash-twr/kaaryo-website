import Icon from './Icon'

export function ArrowRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Icon>
  )
}

export function ArrowUpRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </Icon>
  )
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4.8 12.6l4.6 4.6L19.2 7.4" />
    </Icon>
  )
}

export function ChevronDownIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </Icon>
  )
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6.4 6.4l11.2 11.2M17.6 6.4L6.4 17.6" />
    </Icon>
  )
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
    </Icon>
  )
}

export function StarIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M12 2.6l2.86 5.98 6.54.88-4.8 4.53 1.19 6.5L12 17.36l-5.79 3.13 1.19-6.5-4.8-4.53 6.54-.88L12 2.6Z" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Icon>
  )
}

export function MinusIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5.5 12h13" />
    </Icon>
  )
}

export function QuoteIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M9.4 5.2c-3.4 1.5-5.4 4.3-5.4 8.3 0 3.4 1.8 5.3 4.2 5.3 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.8.1.3-1.8 1.6-3.3 3.4-4.2l-1.9-2.7Zm9.1 0c-3.4 1.5-5.4 4.3-5.4 8.3 0 3.4 1.8 5.3 4.2 5.3 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.8.1.3-1.8 1.6-3.3 3.4-4.2l-1.9-2.7Z" />
    </svg>
  )
}

export function PlayIcon({ size = 24, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M8.5 5.6a1 1 0 0 1 1.53-.85l8 6.4a1 1 0 0 1 0 1.7l-8 6.4a1 1 0 0 1-1.53-.85V5.6Z" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="M15.4 15.4 20 20" />
    </Icon>
  )
}
