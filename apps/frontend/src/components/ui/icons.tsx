import { type ReactNode, type SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number | string
  children?: ReactNode
}

/**
 * Base SVG wrapper matching Lucide's defaults (24x24 grid, currentColor stroke).
 * Each icon below provides only its paths. Icons are decorative by default
 * (aria-hidden) unless an aria-label is supplied.
 */
const Icon = ({ size = 24, children, ...props }: IconProps): ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={props['aria-label'] ? undefined : true}
    {...props}
  >
    {children}
  </svg>
)

// Icon paths sourced from Lucide (https://lucide.dev), ISC licensed.

export const TriangleAlertIcon = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </Icon>
)

export const User = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
)

export const ChevronDown = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
)

export const ChevronUp = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
)

export const MoonIcon = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </Icon>
)

export const SunIcon = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Icon>
)

export const Trash2 = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Icon>
)

export const ScanBarcode = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M8 7v10" />
    <path d="M12 7v10" />
    <path d="M17 7v10" />
  </Icon>
)

export const Box = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Icon>
)

export const Plus = (props: IconProps): ReactNode => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Icon>
)
