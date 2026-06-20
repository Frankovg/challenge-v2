export const MODAL_DICTIONARY = {
  ship: {
    title: 'Ship All Package(s)',
    buttonLabel: 'Ship package(s)',
    description:
      'All items have been packed. Once shipped, packages cannot be modified. Are you sure you want to proceed?',
  },
  delete: {
    title: 'Delete Package with Items?',
    buttonLabel: 'Delete Package',
    description:
      'This package contains items. If you delete it, all items will be returned to the unpacked list. Are you sure you want to continue?',
  },
} as const
