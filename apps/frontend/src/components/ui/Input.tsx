import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { styled } from 'styled-components'

const InputContainer = styled.label`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
`

const LabelText = styled.span`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`

const Field = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--border-error)' : 'var(--input-border)'};
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: border-color var(--transition-base);

  &:hover {
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--border-error)' : 'var(--input-border-hover)'};
  }

  &:focus-within {
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--border-error)' : 'var(--input-border-focus)'};
  }

  .adornment {
    display: inline-flex;
    align-items: center;
    color: var(--text-secondary);
  }

  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--input-text);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);

    &::placeholder {
      color: var(--input-placeholder);
      opacity: 1;
    }

    &:disabled {
      color: var(--text-disabled);
      -webkit-text-fill-color: var(--text-disabled);
      cursor: not-allowed;
    }
  }
`

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
