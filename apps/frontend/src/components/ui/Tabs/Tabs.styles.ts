import { Tab, Tabs } from '@mui/material'
import { styled } from 'styled-components'

export const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid var(--border-primary);
  min-height: 48px;

  & .MuiTabs-indicator {
    background-color: var(--color-blue-600);
    height: 2px;
    transition: all var(--transition-base);
  }

  & .MuiTabs-flexContainer {
    gap: var(--spacing-sm);
  }

  & .MuiTabs-scrollButtons {
    color: var(--text-secondary);

    &.Mui-disabled {
      opacity: 0.3;
    }
  }
`

export const StyledTab = styled(Tab)`
  color: var(--text-secondary);
  font-family: var(--font-family-base);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: none;
  min-height: 48px;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all var(--transition-base);

  &:hover {
    color: var(--text-primary);
    background-color: var(--bg-hover);
  }

  &.Mui-selected {
    color: var(--color-blue-600);
    font-weight: 600;
  }

  &.Mui-disabled {
    color: var(--text-disabled);
    opacity: 0.5;
  }
`
