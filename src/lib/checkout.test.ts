import { describe, expect, it } from 'vitest'
import { promoDiscount, validateCheckout } from './checkout'

const valid = { nickname: 'Shaurmist_2b', contact: '@shaurmist', email: '', consent: true }

describe('validateCheckout', () => {
  it('пропускает корректную форму без почты', () => {
    expect(validateCheckout(valid)).toEqual({})
  })

  it('находит все ошибки пустой формы', () => {
    expect(Object.keys(validateCheckout({ nickname: ' ', contact: '', email: '', consent: false })).sort()).toEqual([
      'consent',
      'contact',
      'nickname',
    ])
  })

  it('проверяет ник по правилам Minecraft', () => {
    expect(validateCheckout({ ...valid, nickname: 'ab' }).nickname).toBeDefined()
    expect(validateCheckout({ ...valid, nickname: 'ник_кириллицей' }).nickname).toBeDefined()
    expect(validateCheckout({ ...valid, nickname: 'a_very_long_nickname' }).nickname).toBeDefined()
  })

  it('проверяет почту, только если она указана', () => {
    expect(validateCheckout({ ...valid, email: 'me@mail' }).email).toBeDefined()
    expect(validateCheckout({ ...valid, email: 'me@example.com' }).email).toBeUndefined()
  })
})

describe('promoDiscount', () => {
  it('считает процент и округляет', () => {
    expect(promoDiscount(1000, 10)).toBe(100)
    expect(promoDiscount(249, 10)).toBe(25)
  })
})
