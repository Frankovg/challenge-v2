'use client'

import { styled } from 'styled-components'

import type { PackedItem } from 'types'

const StyledTabs = styled.div<{ $scrollable?: boolean }>`
  display: flex;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--border-primary);
  min-height: 3rem;
  margin-bottom: var(--spacing-lg);
  overflow-x: ${({ $scrollable }) => ($scrollable ? 'auto' : 'visible')};
  overflow-y: hidden;
`

const StyledTab = styled.button<{ $selected?: boolean }>`
  position: relative;
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ $selected }) =>
    $selected ? 'var(--text-primary)' : 'var(--text-secondary)'};
  font-family: var(--font-family-base);
  font-size: 0.875rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
  min-height: 3rem;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all var(--transition-base);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background-color: ${({ $selected }) =>
    $selected ? 'var(--color-blue-600)' : 'transparent'};
    transition: background-color var(--transition-base);
  }

  &:hover:not(:disabled) {
    color: var(--text-primary);
    background-color: var(--bg-hover);
  }

  &:disabled {
    color: var(--text-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }
`

type TabLabelProps = {
  $isEmpty: boolean
}

const TabLabel = styled.span<TabLabelProps>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  span {
    background-color: var(--status-info-bg);
    color: ${({ $isEmpty }) =>
    $isEmpty ? 'var(--status-error-text)' : 'var(--status-info-text)'};
    padding: var(--spacing-sm);
    border-radius: 100%;
    font-size: var(--font-size-xs);
    width: var(--font-size-2xl);
    height: var(--font-size-2xl);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

type Props = {
  tabs: PackedItem[]
  value: string | number
  onChange: (value: number) => void
  'aria-label'?: string
  variant?: 'standard' | 'scrollable' | 'fullWidth'
}

export const Tabs = ({
  tabs,
  value,
  onChange,
  'aria-label': ariaLabel,
  variant = 'standard',
}: Props) => {
  return (
    <StyledTabs
      role="tablist"
      aria-label={ariaLabel}
      $scrollable={variant === 'scrollable'}
    >
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
