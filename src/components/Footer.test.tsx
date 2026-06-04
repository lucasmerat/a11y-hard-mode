import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders the correct credit text', () => {
    render(<Footer />)
    expect(screen.getByText(/Made with 💕 by Lucas Merat/i)).toBeInTheDocument()
  })
})