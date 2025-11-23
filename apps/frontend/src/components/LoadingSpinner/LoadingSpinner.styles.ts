import { styled } from 'styled-components'

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;

  p {
    color: var(--foreground);
    font-size: 1rem;
  }
`

