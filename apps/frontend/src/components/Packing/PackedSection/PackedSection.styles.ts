import { styled } from 'styled-components'

export const PackedSectionContainer = styled.section`
  width: 70%;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-primary);
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  .top-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .bottom-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
