import { describe, it, expect } from 'vitest'
import { validateAccount } from '../src/utils/validation'
import { createEmptyAccount } from '../src/utils/account'

describe('validateAccount', () => {
  it('should detect missing login', () => {
    const account = createEmptyAccount()
    account.login = ''
    const errors = validateAccount(account)
    expect(errors.login).toBe(true)
  })

  it('should pass valid account', () => {
    const account = createEmptyAccount()
    account.login = 'testuser'
    const errors = validateAccount(account)
    expect(Object.keys(errors).length).toBe(0)
  })

  it('should detect too long login', () => {
    const account = createEmptyAccount()
    account.login = 'a'.repeat(101)
    const errors = validateAccount(account)
    expect(errors.login).toBe(true)
  })

  it('should detect missing password for local type', () => {
    const account = createEmptyAccount()
    account.typeId = 'local'
    account.password = ''
    const errors = validateAccount(account)
    expect(errors.password).toBe(true)
  })

  it('should detect too long password', () => {
    const account = createEmptyAccount()
    account.typeId = 'local'
    account.password = 'a'.repeat(101)
    const errors = validateAccount(account)
    expect(errors.password).toBe(true)
  })

  it('should detect too long labels string', () => {
    const account = createEmptyAccount()
    account.labels = [{ text: 'a'.repeat(51) }]
    const errors = validateAccount(account)
    expect(errors.labels).toBe(true)
  })
})
