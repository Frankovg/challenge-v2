import { keyframes, styled } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

type SpinnerProps = {
  size?: number
}

export const SpinnerContainer = styled.div<SpinnerProps>`
  width: ${({ size = 30 }) => `${size}px`};
  height: ${({ size = 30 }) => `${size}px`};
  border: 4px solid var(--border-primary);
  border-top: 4px solid var(--border-secondary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
