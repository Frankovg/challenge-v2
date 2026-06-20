import { styled } from 'styled-components'

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
`
const FooterContent = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: var(--font-size-xs);
  }

  a {
    font-size: var(--font-size-sm);
  }
`

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>Challenge developed by Franco Gabriel Amoroso</p>
        <a href="https://www.franamoroso.com" target="_blank" rel="noreferrer">
          www.franamoroso.com
        </a>
      </FooterContent>
    </FooterContainer>
  )
}
