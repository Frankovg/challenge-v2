'use client'

import { FC, JSXElementConstructor, ReactElement, SyntheticEvent } from 'react'

import { StyledTab, StyledTabs, TabLabel } from './Tabs.styles'

import type { PackedItem } from 'types'


export type TabItem = {
  label: string
  value: string | number
  icon?: string | ReactElement<unknown, string | JSXElementConstructor<unknown>>
  disabled?: boolean
}

type Props = {
  tabs: PackedItem[]
  value: string | number
  onChange: (value: number) => void
  'aria-label'?: string
  variant?: 'standard' | 'scrollable' | 'fullWidth'
}

export const Tabs: FC<Props> = ({
  tabs,
  value,
  onChange,
  'aria-label': ariaLabel,
}) => {

  const handleChange = (_event: SyntheticEvent, newValue: number): void => {
    onChange(newValue)
  }

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const quantityProducts = tab.data.line_items.length
        return (
          <StyledTab
            key={tab.value}
            label={(
              <TabLabel $isEmpty={quantityProducts === 0}>
                {tab.label}
                <span>{quantityProducts}</span>
              </TabLabel>
            )}
            value={tab.value}
            disabled={tab.disabled}
          />
        )
      })}
    </StyledTabs>
  )
}
