import { type FC } from "react"

import { Button } from "components/ui/Button"

import {
  ButtonContainer,
  ConfirmationModalContainer,
  ModalDescription,
  ModalTitle,
} from "./ConfirmationModal.styles"

type Props = {
  close: VoidFunction,
  confirm: VoidFunction,
  title: string,
  description: string,
  variant: 'delete' | 'ship',
  buttonLabel: string
}

export const ConfirmationModal: FC<Props> = ({
  close,
  confirm,
  title,
  description,
  variant,
  buttonLabel = 'Confirm'
}) => {
  const buttonColor = variant === 'delete' ? 'warning' : 'success'

  return (
    <ConfirmationModalContainer>
      <ModalTitle id="confirm-delete-modal-title">
        {title}
      </ModalTitle>
      <ModalDescription id="confirm-delete-modal-description">
        {description}
      </ModalDescription>
      <ButtonContainer>
        <Button onClick={close} >
          Cancel
        </Button>
        <Button color={buttonColor} onClick={confirm} >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </ConfirmationModalContainer>
  )
}
