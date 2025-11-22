import { type FC } from "react"

import {
  ButtonContainer,
  CancelButton,
  ConfirmationModalContainer,
  DeleteButton,
  ModalDescription,
  ModalTitle,
} from "./ConfirmationModal.styles"

type Props = {
  close: VoidFunction,
  confirm: VoidFunction
}

export const ConfirmationModal: FC<Props> = ({ close, confirm }) => {
  return (
    <ConfirmationModalContainer>
      <ModalTitle id="confirm-delete-modal-title">
        Delete Package with Items?
      </ModalTitle>
      <ModalDescription id="confirm-delete-modal-description">
        This package contains items. If you delete it, all items will be returned to the unpacked list. Are you sure you want to continue?
      </ModalDescription>
      <ButtonContainer>
        <CancelButton onClick={close}>
          Cancel
        </CancelButton>
        <DeleteButton onClick={confirm}>
          Delete Package
        </DeleteButton>
      </ButtonContainer>
    </ConfirmationModalContainer>
  )
}
