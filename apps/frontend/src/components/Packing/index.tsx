'use client'

import React, { type ReactNode } from 'react'
import { styled } from 'styled-components'

import { useApp } from 'contexts/AppContext'

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
    bottom: 1rem;
    right: 2rem;
    padding: var(--spacing-md);
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
  const { resetDemo } = useApp()

  return (
    <PackingWrapper>
      <UnpackedSection />
      <PackedSection />

      {/* // This is just for the demo so you can reset the state without reloading the page. */}
      {process.env.NODE_ENV === 'development' && (
        <button className="reset-button" onClick={resetDemo}>
          RESET DEMO
        </button>
      )}
    </PackingWrapper>
  )
}
