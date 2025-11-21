'use client'

import { FC, JSXElementConstructor, ReactElement, SyntheticEvent } from 'react'

import { StyledTab, StyledTabs } from './Tabs.styles'

export type TabItem = {
  label: string
  value: string | number
  icon?: string | ReactElement<unknown, string | JSXElementConstructor<unknown>>
  disabled?: boolean
}

type Props = {
  tabs: TabItem[]
  value: string | number
  onChange: (value: number) => void
  'aria-label'?: string
  orientation?: 'horizontal' | 'vertical'
  centered?: boolean
  variant?: 'standard' | 'scrollable' | 'fullWidth'
  indicatorColor?: 'primary' | 'secondary'
  textColor?: 'primary' | 'secondary' | 'inherit'
}

export const Tabs: FC<Props> = ({
  tabs,
  value,
  onChange,
  'aria-label': ariaLabel,
  orientation = 'horizontal',
  centered = false,
  variant = 'standard',
  indicatorColor = 'primary',
  textColor = 'primary',
}) => {
  const handleChange = (_event: SyntheticEvent, newValue: number): void => {
    onChange(newValue)
  }

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      aria-label={ariaLabel}
      orientation={orientation}
      centered={centered}
      variant={variant}
      indicatorColor={indicatorColor}
      textColor={textColor}
    >
      {tabs.map((tab) => (
        <StyledTab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          icon={tab.icon}
          disabled={tab.disabled}
          iconPosition="start"
        />
      ))}
    </StyledTabs>
  )
}
