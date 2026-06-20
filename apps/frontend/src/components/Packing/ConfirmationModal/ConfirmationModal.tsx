import { type FC } from 'react'

import { Button } from 'components/ui/Button'
import { Spinner } from 'components/ui/Spinner'

import {
  ButtonContainer,
  ConfirmationModalContainer,
  ModalDescription,
  ModalTitle,
} from './ConfirmationModal.styles'

type Props = {
  close: VoidFunction
  confirm: VoidFunction
  title: string
  description: string
  variant: 'delete' | 'ship'
  buttonLabel: string
  isLoading?: boolean
}

export const ConfirmationModal: FC<Props> = ({
  close,
  confirm,
  title,
  description,
  variant,
  buttonLabel = 'Confirm',
  isLoading = false,
}) => {
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
