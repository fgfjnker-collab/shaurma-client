import { describe, expect, it } from 'vitest'
import { promoDiscount, validateCheckout } from './checkout'

const valid = { nickname: 'Shaurmist', playerId: '12345678', email: 'me@example.com', consent: true }

describe('validateCheckout', () => {
  it('пропускает корректную форму', () => {
    expect(validateCheckout(valid)).toEqual({})
  })

  it('находит все ошибки пустой формы', () => {
    expect(Object.keys(validateCheckout({ nickname: ' ', playerId: '', email: '', consent: false })).sort()).toEqual([
      'consent',
      'email',
      'nickname',
      'playerId',
    ])
  })

  it('проверяет формат ID и почты', () => {
    const errors = validateCheckout({ ...valid, playerId: '12ab', email: 'me@mail' })
    expect(errors.playerId).toBeDefined()
    expect(errors.email).toBeDefined()
  })
})

describe('promoDiscount', () => {
  it('считает процент и округляет', () => {
    expect(promoDiscount(1000, 10)).toBe(100)
    expect(promoDiscount(249, 10)).toBe(25)
  })
})
