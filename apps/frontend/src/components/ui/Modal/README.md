# Modal Component

A generic, reusable modal component built with Material UI's Modal, styled to match the application's design system.

## Features

- **Accessible**: Supports ARIA attributes for screen readers
- **Customizable**: Accepts any React children
- **Theme-aware**: Integrates with the app's light/dark theme system
- **Responsive**: Automatically handles viewport sizing
- **Keyboard navigation**: Closes on Escape key press
- **Backdrop click**: Closes when clicking outside the modal
- **Optional persistence**: `keepMounted` prop for performance optimization

## Usage

```tsx
import { Modal } from 'components/ui/Modal'

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        ariaLabelledBy="modal-title"
        ariaDescribedBy="modal-description"
      >
        <div>
          <h2 id="modal-title">Modal Title</h2>
          <p id="modal-description">Modal content goes here</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Controls whether the modal is visible |
| `onClose` | `() => void` | Yes | - | Callback fired when the modal should close |
| `children` | `ReactNode` | Yes | - | Content to render inside the modal |
| `ariaLabelledBy` | `string` | No | - | ID of the element that labels the modal |
| `ariaDescribedBy` | `string` | No | - | ID of the element that describes the modal |
| `keepMounted` | `boolean` | No | `false` | Keep modal in DOM when closed (for performance) |

## Styling

The Modal component uses CSS custom properties from the global design system:

- **Background**: `--bg-primary`
- **Border**: `--border-primary`
- **Border radius**: `--radius-lg`
- **Shadow**: `--shadow-xl`
- **Z-index**: `--z-modal`
- **Transitions**: `--transition-base`

The backdrop uses a semi-transparent black overlay with blur effect.

## Accessibility

Always provide `ariaLabelledBy` and `ariaDescribedBy` for better accessibility:

```tsx
<Modal
  open={open}
  onClose={handleClose}
  ariaLabelledBy="dialog-title"
  ariaDescribedBy="dialog-description"
>
  <div>
    <h2 id="dialog-title">Confirmation</h2>
    <p id="dialog-description">Are you sure you want to proceed?</p>
  </div>
</Modal>
```

## Testing

The Modal component has 100% test coverage. See [Modal.test.tsx](./__test__/Modal.test.tsx) for examples.

## Notes

- This is a client component (`'use client'` directive) due to Material UI and styled-components requirements
- The modal centers content both horizontally and vertically
- Content is scrollable if it exceeds viewport height
- The backdrop is styled to match the app's theme system
