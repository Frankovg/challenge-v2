import { render, screen } from '@testing-library/react'
import React from 'react'

import { EmptyPackage } from '../EmptyPackage'

describe('EmptyPackage', () => {
  it('should render children', () => {
    render(
      <EmptyPackage />
    )

    expect(screen.queryByText('Package is Empty')).not.toBeNull()
    expect(screen.queryByText('Select products from the left to add them here.')).not.toBeNull()

    expect(screen.getByTestId('package-icon')).toBeInTheDocument()
  })
})
