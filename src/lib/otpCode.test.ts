import { describe, it, expect, vi } from 'vitest'
import { generateOtpCode } from './otpCode'
import { OTP_CHARSET, OTP_LENGTH } from '#/lib/constants/level2'

describe('generateOtpCode', () => {
  it('generates a code of the expected length', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const code = generateOtpCode()
    expect(code).toHaveLength(OTP_LENGTH)
  })

  it('uses only characters from the configured charset', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const code = generateOtpCode()
    for (const char of code) {
      expect(OTP_CHARSET).toContain(char)
    }
  })
})
