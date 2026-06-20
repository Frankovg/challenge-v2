import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const CenteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Message = styled.p<{ bold?: boolean; large?: boolean }>`
  font-size: ${({ large }) => (large ? '1.875rem' : '1rem')};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-align: center;
  margin: 0.25rem 0;
`
