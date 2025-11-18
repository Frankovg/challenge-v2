import React from 'react'
import { render, screen } from '@testing-library/react'

import { Layout } from '../Layout'

describe('Layout component', () => {
  it('should render children', () => {
    render(
      <Layout>
        <p>Hi</p>
      </Layout>,
    )

    expect(screen.queryByText('Hi')).not.toBeNull()
  })
})
