/** Password must contain at least one digit and one special character */
export function isValidPassword(value: string): boolean {
  return /\d/.test(value) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
}
