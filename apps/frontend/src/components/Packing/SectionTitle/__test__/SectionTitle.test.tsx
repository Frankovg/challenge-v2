import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { SectionTitle } from '../SectionTitle'

describe('SectionTitle', () => {
  it('renders the title correctly', () => {
    render(<SectionTitle title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the subtitle when provided', () => {
    render(<SectionTitle title="Main Title" subtitle="Subtitle Text" />)
    expect(screen.getByText('Subtitle Text')).toBeInTheDocument()
  })

  it('does not render a subtitle if not provided', () => {
    render(<SectionTitle title="Only Title" />)
    expect(screen.queryByText(/./, { selector: 'p' })).not.toBeInTheDocument()
  })
})
