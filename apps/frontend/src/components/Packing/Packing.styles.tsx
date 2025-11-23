import { styled } from 'styled-components'

export const PackingWrapper = styled.div`
  display: flex;
  height: 100%;
  max-width: var(--max-content-width);
  margin-inline: auto;
  position: relative;

  .reset-button {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: var(--spacing-md);
    margin: var(--spacing-lg);
    border: none;
    border-radius: var(--radius-xl);
    background-color: var(--color-orange-500);
    color: var(--color-black);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-orange-700);
      transform: scale(1.01);
    }
  }
`;
