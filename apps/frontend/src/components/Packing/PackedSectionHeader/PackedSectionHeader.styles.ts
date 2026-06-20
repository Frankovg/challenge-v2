import { styled } from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .top-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  .bottom-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
`
