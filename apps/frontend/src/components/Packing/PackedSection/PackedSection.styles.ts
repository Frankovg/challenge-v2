import { styled } from 'styled-components'

export const PackedSectionContainer = styled.section`
  width: 70%;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-primary);
  `

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .bottom-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`
