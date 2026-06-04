import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GameProvider, useGame } from './GameContext'
import { useMatches } from '@tanstack/react-router'

vi.mock('@tanstack/react-router', () => ({
  useMatches: vi.fn(),
}))

describe('GameContext', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GameProvider>{children}</GameProvider>
  )

  it('should increment timeElapsed when a level is active', () => {
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.activeLevel).toBe('level1')
    expect(result.current.state.level1.timeElapsed).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.state.level1.timeElapsed).toBe(1000)
  })

  it('should correctly increment friction events for a specific level', () => {
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.incrementFriction('level1')
    })

    expect(result.current.state.level1.frictionEvents).toBe(1)
    expect(result.current.state.level2.frictionEvents).toBe(0)
  })

  it('should reset the game state', () => {
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.incrementFriction('level1')
      result.current.resetGame()
    })

    expect(result.current.state.level1.frictionEvents).toBe(0)
  })
})