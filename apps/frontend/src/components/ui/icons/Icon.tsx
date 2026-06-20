import { type ReactNode, type SVGProps } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number | string
  children?: ReactNode
}

/**
 * Base SVG wrapper matching Lucide's defaults (24x24 grid, currentColor stroke).
 * Each icon below provides only its paths. Icons are decorative by default
 * (aria-hidden) unless an aria-label is supplied.
 */
export const Icon = ({
  size = 24,
  children,
  ...props
}: IconProps): ReactNode => (
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
