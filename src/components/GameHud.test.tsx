import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GameHud from './GameHud'
import { GameProvider } from './GameContext'
import { useMatches } from '@tanstack/react-router'

vi.mock('@tanstack/react-router', () => ({
  useMatches: vi.fn(),
}))

describe('GameHud Component', () => {
  // Helper to abstract the complex type casting
  const mockActiveRoute = (routeId: string) => {
    vi.mocked(useMatches).mockReturnValue([{ routeId } as any])
  }

  it('does not render the hud when no level is active', () => {
    mockActiveRoute('/')

    render(
      <GameProvider>
        <GameHud />
      </GameProvider>
    )
    expect(screen.queryByText(/Time spent on/i)).not.toBeInTheDocument()
  })

  it('renders the hud when a level is active', () => {
    mockActiveRoute('/levels/1')

    render(
      <GameProvider>
        <GameHud />
      </GameProvider>
    )
    expect(screen.getByText(/Time spent on Level 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Misclicks: 0/i)).toBeInTheDocument()
  })
})