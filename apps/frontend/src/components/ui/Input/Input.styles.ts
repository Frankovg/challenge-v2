
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CssTextField = styled(TextField)({
  width: '100%',

  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--input-bg)',
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-base)',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-sm)',

    '& fieldset': {
      borderColor: 'var(--input-border)',
      borderWidth: '1px',
      transition: 'border-color var(--transition-base)',
    },

    '&:hover fieldset': {
      borderColor: 'var(--input-border-hover)',
    },

    '&.Mui-focused fieldset': {
      borderColor: 'var(--input-border-focus)',
      borderWidth: '2px',
    },

    '&.Mui-error fieldset': {
      borderColor: 'var(--border-error)',
    },

    '&.Mui-disabled': {
      backgroundColor: 'var(--bg-disabled)',
      '& fieldset': {
        borderColor: 'var(--border-secondary)',
      },
    },
  },

  '& .MuiInputBase-input': {
    color: 'var(--input-text)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    height: 'auto',

    '&::placeholder': {
      color: 'var(--input-placeholder)',
      opacity: 1,
    },

    '&.Mui-disabled': {
      color: 'var(--text-disabled)',
      WebkitTextFillColor: 'var(--text-disabled)',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'var(--text-secondary)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',

    '&.Mui-focused': {
      color: 'var(--input-border-focus)',
    },

    '&.Mui-error': {
      color: 'var(--border-error)',
    },

    '&.Mui-disabled': {
      color: 'var(--text-disabled)',
    },
  },

  '& .MuiFormHelperText-root': {
    fontSize: 'var(--font-size-xs)',
    marginTop: 'var(--spacing-xs)',
    color: 'var(--text-tertiary)',

    '&.Mui-error': {
      color: 'var(--border-error)',
    },
  },

  '& .MuiInputAdornment-root': {
    color: 'var(--text-secondary)',
    marginRight: 'var(--spacing-xs)',

    '& svg': {
      color: 'var(--text-secondary)',
      transition: 'color var(--transition-base)',
    },
  },

  '& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root': {
    color: 'var(--input-border-focus)',

    '& svg': {
      color: 'var(--input-border-focus)',
    },
  },

  '& .MuiOutlinedInput-root.Mui-error .MuiInputAdornment-root': {
    color: 'var(--border-error)',

    '& svg': {
      color: 'var(--border-error)',
    },
  },

  '& .MuiOutlinedInput-root.Mui-disabled .MuiInputAdornment-root': {
    color: 'var(--text-disabled)',

    '& svg': {
      color: 'var(--text-disabled)',
    },
  },
});
