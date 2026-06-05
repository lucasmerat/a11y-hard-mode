import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useGame } from './useGame'
import { useMatches } from '@tanstack/react-router'
import { GameProvider } from './GameProvider'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.incrementFriction('level1')
    })

    expect(result.current.state.level1.frictionEvents).toBe(1)
    expect(result.current.state.level2.frictionEvents).toBe(0)
  })

  it('should reset the game state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.incrementFriction('level1')
      result.current.resetGame()
    })

    expect(result.current.state.level1.frictionEvents).toBe(0)
  })

  it('should stop the timer when completeLevel is called', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/1' } as any])
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      vi.advanceTimersByTime(500)
      result.current.completeLevel('level1')
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.state.level1.completed).toBe(true)
    expect(result.current.state.level1.timeElapsed).toBe(500)
  })
})