import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { styled } from 'styled-components'

export const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid var(--border-primary);
  min-height: 48px;
  margin-bottom: var(--spacing-lg);

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
    color: var(--text-primary);
    font-weight: 600;
  }

  &.Mui-disabled {
    color: var(--text-disabled);
    opacity: 0.5;
  }
`

type TabLabelProps = {
  $isEmpty: boolean
}

export const TabLabel = styled.p<TabLabelProps>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  span {
    background-color: var(--status-info-bg);
    color: var(--status-info-text);
    padding: var(--spacing-sm);
    border-radius: 100%;
    font-size: var(--font-size-xs);
    width: var(--font-size-2xl);
    height: var(--font-size-2xl);
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.$isEmpty === true &&
    `
    color: var(--status-error-text)
    `
  }
  }
`
