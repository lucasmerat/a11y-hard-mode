import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useOtpChallenge } from './useOtpChallenge'
import { CALM_BEAT_MS, ENTRY_TIMEOUT_MS } from '#/lib/constants/level2'

vi.mock('#/lib/otpCode', () => ({
  generateOtpCode: () => 'ab12cd34',
}))

describe('useOtpChallenge', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts calm then shows toast and timer', () => {
    const { result } = renderHook(() =>
      useOtpChallenge({ active: true }),
    )

    expect(result.current.toastVisible).toBe(false)
    expect(result.current.started).toBe(false)

    act(() => {
      vi.advanceTimersByTime(CALM_BEAT_MS)
    })

    expect(result.current.started).toBe(true)
    expect(result.current.toastVisible).toBe(true)
    expect(result.current.secondsRemaining).toBe(Math.ceil(ENTRY_TIMEOUT_MS / 1000))
  })

  it('expires entry timer without side effects', () => {
    const { result } = renderHook(() =>
      useOtpChallenge({ active: true }),
    )

    act(() => {
      vi.advanceTimersByTime(CALM_BEAT_MS + ENTRY_TIMEOUT_MS)
    })

    expect(result.current.expired).toBe(true)
    expect(result.current.secondsRemaining).toBe(0)
  })

  it('resets timer and shows toast on resend', () => {
    const { result } = renderHook(() =>
      useOtpChallenge({ active: true }),
    )

    act(() => {
      vi.advanceTimersByTime(CALM_BEAT_MS)
      result.current.resend()
    })

    expect(result.current.expired).toBe(false)
    expect(result.current.toastVisible).toBe(true)
    expect(result.current.secondsRemaining).toBe(Math.ceil(ENTRY_TIMEOUT_MS / 1000))
  })
})
