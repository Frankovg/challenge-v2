import { keyframes, styled } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

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

export const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid var(--border-primary);
  border-top: 4px solid var(--border-secondary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
