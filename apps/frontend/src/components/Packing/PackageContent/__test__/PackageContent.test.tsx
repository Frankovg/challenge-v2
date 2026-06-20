import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PackageContent } from '../PackageContent'

describe('PackageContent', () => {
  it('renders children correctly', () => {
    render(
      <PackageContent>
        <div data-testid="child">Child content</div>
      </PackageContent>,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toHaveTextContent('Child content')
  })
})
