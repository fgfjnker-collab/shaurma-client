/**
 * Заглушка API заказов. Бэкенда пока нет, поэтому заказы «создаются» прямо в браузере.
 * Когда появится сервер, замените тела функций на реальные запросы и выставьте IS_DEMO = false.
 * Промокоды и итоговую сумму обязательно проверять на сервере: всё, что лежит в клиенте, видно любому.
 */
export const IS_DEMO = true

export type PaymentMethod = 'card' | 'sbp' | 'crypto'
export type DeliveryMethod = 'meet' | 'stash'

export interface OrderRequest {
  /** Ник в Minecraft */
  nickname: string
  /** Discord или Telegram для связи */
  contact: string
  email: string | null
  delivery: DeliveryMethod
  payment: PaymentMethod
  promo: string | null
  items: { id: string; qty: number }[]
}

export interface Order {
  number: string
  total: number
}

export interface PromoResult {
  code: string
  /** Скидка в процентах */
  percent: number
}

const DEMO_PROMOS: Record<string, number> = {
  SHAURMA10: 10,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function checkPromo(code: string): Promise<PromoResult | null> {
  await delay(400)
  const normalized = code.trim().toUpperCase()
  const percent = DEMO_PROMOS[normalized]
  return percent ? { code: normalized, percent } : null
}

export async function createOrder(request: OrderRequest, total: number): Promise<Order> {
  await delay(900)
  console.info('[demo] заказ создан локально', request)
  const number = `SH-${Date.now().toString(36).toUpperCase().slice(-6)}`
  return { number, total }
}
