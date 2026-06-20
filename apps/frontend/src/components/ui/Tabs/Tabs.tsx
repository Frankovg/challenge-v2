'use client'

import { type FC } from 'react'

import { StyledTab, StyledTabs, TabLabel } from './Tabs.styles'

import type { PackedItem } from 'types'

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
  variant = 'standard',
}) => {
  return (
    <StyledTabs role="tablist" aria-label={ariaLabel} $scrollable={variant === 'scrollable'}>
      {tabs.map((tab) => {
        const quantityProducts = tab.data.line_items.length
        const selected = value === tab.value

        return (
          <StyledTab
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            $selected={selected}
            disabled={tab.disabled}
            onClick={() => onChange(Number(tab.value))}
          >
            <TabLabel $isEmpty={quantityProducts === 0}>
              {tab.label}
              <span>{quantityProducts}</span>
            </TabLabel>
          </StyledTab>
        )
      })}
    </StyledTabs>
  )
}
