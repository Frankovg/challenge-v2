'use client'

import React, { type ReactNode } from 'react'
import { styled } from 'styled-components'

import { useApp } from 'hooks/useApp'
import { useLineItemsQuery } from 'hooks/useLineItemsQuery'

import { PackedSection } from './PackedSection'
import { UnpackedSection } from './UnpackedSection'

const PackingWrapper = styled.div`
  display: flex;
  height: 100%;
  max-width: var(--max-content-width);
  margin-inline: auto;
  position: relative;

  .reset-button {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: var(--spacing-md);
    margin: 0 0 var(--spacing-md) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-xl);
    background-color: var(--color-orange-500);
    color: var(--color-black);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    z-index: var(--z-popover);

    &:hover {
      background-color: var(--color-orange-700);
      transform: scale(1.01);
    }
  }
`

export const Packing = (): ReactNode => {
  const { lineItems } = useLineItemsQuery()
  const { resetDemo } = useApp()

  const handleResetDemo = () => {
    if (lineItems.length === 0) return
    resetDemo(lineItems)
  }

  return (
    <PackingWrapper>
      <UnpackedSection />
      <PackedSection />
      {process.env.NODE_ENV === 'development' && lineItems.length > 0 && (
        <button className="reset-button" onClick={handleResetDemo}>
          RESET DEMO
        </button>
      )}
    </PackingWrapper>
  )
}
