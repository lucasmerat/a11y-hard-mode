import { describe, it, expect } from 'vitest'
import { isValidPassword } from './level2'

describe('isValidPassword', () => {
  it('accepts password with digit and special character', () => {
    expect(isValidPassword('hello1!')).toBe(true)
    expect(isValidPassword('Pass1@word')).toBe(true)
  })

  it('rejects password with only letters', () => {
    expect(isValidPassword('helloworld')).toBe(false)
  })

  it('rejects password with digit but no special character', () => {
    expect(isValidPassword('hello123')).toBe(false)
  })

  it('rejects password with special character but no digit', () => {
    expect(isValidPassword('hello!')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidPassword('')).toBe(false)
  })
})
