import { styled } from 'styled-components'

export const ConfirmationModalContainer = styled.div`
  padding: 24px;
  max-width: 500px;
`

export const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
`

export const ModalDescription = styled.p`
  margin-bottom: 24px;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

export const CancelButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: background-color var(--transition-base);

  &:hover {
    background-color: var(--bg-tertiary);
  }

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }
`

export const DeleteButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ef4444;
  border-radius: var(--radius-md);
  background-color: #ef4444;
  color: white;
  transition: background-color var(--transition-base);

  &:hover {
    background-color: #dc2626;
  }

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }
`


