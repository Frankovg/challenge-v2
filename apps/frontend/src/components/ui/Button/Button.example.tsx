'use client'

import { Package, Plus, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from './Button'

/**
 * Example usage of the Button component
 * This file demonstrates all the different variants and use cases
 */
export const ButtonExamples = (): ReactNode => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h3 style={{ marginBottom: '16px' }}>Button Variants</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outlined">Outlined Button</Button>
          <Button variant="text">Text Button</Button>
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Button Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="small">
            Small
          </Button>
          <Button variant="primary" size="medium">
            Medium
          </Button>
          <Button variant="primary" size="large">
            Large
          </Button>
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Buttons with Icons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" startIcon={<Package size={16} />}>
            Pack Items
          </Button>
          <Button variant="secondary" startIcon={<Plus size={16} />}>
            Add Package
          </Button>
          <Button variant="outlined" startIcon={<Trash2 size={16} />}>
            Remove
          </Button>
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Disabled States</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" disabled>
            Primary Disabled
          </Button>
          <Button variant="secondary" disabled>
            Secondary Disabled
          </Button>
          <Button variant="outlined" disabled>
            Outlined Disabled
          </Button>
          <Button variant="text" disabled>
            Text Disabled
          </Button>
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Full Width Button</h3>
        <Button variant="primary" fullWidth>
          Full Width Button
        </Button>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Button as Link</h3>
        <Button variant="outlined" href="https://github.com" component="a">
          Open GitHub
        </Button>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px' }}>Loading State (MUI Feature)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" loading>
            Loading...
          </Button>
          <Button variant="secondary" loading loadingPosition="start" startIcon={<Package size={16} />}>
            Processing
          </Button>
        </div>
      </section>
    </div>
  )
}
