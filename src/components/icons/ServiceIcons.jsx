import Icon from './Icon'

export function ElectricianIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 2.8a6.2 6.2 0 0 0-3.6 11.25c.42.3.66.78.66 1.29V16h5.88v-.66c0-.51.24-.99.66-1.29A6.2 6.2 0 0 0 12 2.8Z" />
      <path d="M9.4 19h5.2M10.2 21.4h3.6" />
      <path d="M12.9 6.9 10.6 10.6h2.8L11.1 14" />
    </Icon>
  )
}

export function CleaningIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6.6 9.4h6.6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
      <path d="M4.6 13.6h10.6" />
      <path d="M8.6 9.4V6.2h2.8v3.2" />
      <path d="M11.4 6.2h2.6l2.2-2.2" />
      <path d="M19.4 8.2v2.4M18.2 9.4h2.4M17.6 14.4v1.8M16.7 15.3h1.8" />
    </Icon>
  )
}

export function CookingIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.4 11.2h17.2" />
      <path d="M5.4 11.2v5.6a4 4 0 0 0 4 4h5.2a4 4 0 0 0 4-4v-5.6" />
      <path d="M3.4 12.6H2.2M20.6 12.6h1.2" />
      <path d="M9.2 7.6c0-1.4 1.4-1.4 1.4-2.8M13 7.6c0-1.4 1.4-1.4 1.4-2.8" />
    </Icon>
  )
}

export function PlumbingIcon(props) {
  return (
    <Icon {...props}>
      <path d="M14.9 3.6a3.9 3.9 0 0 0 4.9 4.9l-8 8" />
      <path d="M11.8 16.5 6.6 21.7a2.05 2.05 0 0 1-2.9-2.9l5.2-5.2" />
      <path d="M9 13.6 6.5 11a1 1 0 0 1 0-1.4l1.9-1.9a1 1 0 0 1 1.4 0l2.6 2.6" />
      <path d="M18.6 14.4s2 2.2 2 3.4a2 2 0 0 1-4 0c0-1.2 2-3.4 2-3.4Z" />
    </Icon>
  )
}

export function CarpentryIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 20.4 12.4 12" />
      <path d="M11 8.8 14.6 5.2a1 1 0 0 1 1.4 0l3.4 3.4a1 1 0 0 1 0 1.4L15.8 13.6Z" />
      <path d="M13.3 6.5 11.1 4.3a2.6 2.6 0 0 0-3.7 0L6.2 5.5" />
      <path d="M3.6 18.6 5.4 20.4" />
    </Icon>
  )
}

export function PaintingIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="3.4" width="11.6" height="5.6" rx="1.6" />
      <path d="M14.6 6.2h2.8a1.6 1.6 0 0 1 1.6 1.6v1.6a1.6 1.6 0 0 1-1.6 1.6h-4.8a1.6 1.6 0 0 0-1.6 1.6v.8" />
      <rect x="8.8" y="13.4" width="4.4" height="7.6" rx="1.8" />
    </Icon>
  )
}

/** Category slug → icon component. */
export const SERVICE_ICONS = {
  electrician: ElectricianIcon,
  cleaning: CleaningIcon,
  cooking: CookingIcon,
  plumbing: PlumbingIcon,
  carpentry: CarpentryIcon,
  painting: PaintingIcon,
}
