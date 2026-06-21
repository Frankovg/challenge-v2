import { styled } from 'styled-components'

import { Button } from 'components/ui/Button'
import { Spinner } from 'components/ui/Spinner'

const ConfirmationModalContainer = styled.div`
  padding: var(--spacing-lg);
  max-width: 500px;
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: var(--spacing-md);
`

const ModalDescription = styled.p`
  margin-bottom: var(--spacing-lg);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
`

type Props = {
  close: VoidFunction
  confirm: VoidFunction
  title: string
  description: string
  variant: 'delete' | 'ship'
  buttonLabel: string
  isLoading?: boolean
}

export const ConfirmationModal = ({
  close,
  confirm,
  title,
  description,
  variant,
  buttonLabel = 'Confirm',
  isLoading = false,
}: Props) => {
  const buttonColor = variant === 'delete' ? 'warning' : 'success'

  return (
    <ConfirmationModalContainer>
      <ModalTitle id="confirm-delete-modal-title">{title}</ModalTitle>
      <ModalDescription id="confirm-delete-modal-description">
        {description}
      </ModalDescription>
      <ButtonContainer>
        <Button onClick={close}>Cancel</Button>
        <Button
          data-color={buttonColor}
          color={buttonColor}
          onClick={confirm}
          loading={isLoading}
          loadingPosition="start"
          loadingIndicator={<Spinner size={16} />}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </ConfirmationModalContainer>
  )
}
