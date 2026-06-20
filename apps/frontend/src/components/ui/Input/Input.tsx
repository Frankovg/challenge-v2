import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { Field, InputContainer, LabelText } from './Input.styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  startAdornment?: ReactNode
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, startAdornment, error = false, ...props }, ref) => {
    return (
      <InputContainer>
        {label && <LabelText>{label}</LabelText>}
        <Field $hasError={error}>
          {startAdornment && (
            <span className="adornment">{startAdornment}</span>
          )}
          <input ref={ref} {...props} />
        </Field>
      </InputContainer>
    )
  },
)

Input.displayName = 'Input'
