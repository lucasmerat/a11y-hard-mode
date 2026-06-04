import { describe, it, expect } from 'vitest'
import { formatTime } from './formatTime'

describe('formatTime helper', () => {
  it('formats milliseconds into simple seconds', () => {
    expect(formatTime(5000)).toBe('5s')
  })

  it('adds leading zeros to seconds when minutes are present', () => {
    expect(formatTime(65000)).toBe('1m 5s')
  })

  it('handles durations exactly on the minute mark', () => {
    expect(formatTime(120000)).toBe('2m 0s')
  })
})