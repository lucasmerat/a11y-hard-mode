import { OTP_CHARSET, OTP_LENGTH } from '#/lib/constants/level2'

export function generateOtpCode(): string {
  let code = ''
  for (let i = 0; i < OTP_LENGTH; i++) {
    code += OTP_CHARSET[Math.floor(Math.random() * OTP_CHARSET.length)]
  }
  return code
}
