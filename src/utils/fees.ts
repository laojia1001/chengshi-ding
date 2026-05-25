export const PACKAGING_FEE = 1
export const DELIVERY_FEE_ORIGINAL = 5
export const DELIVERY_FEE_DISCOUNTED = 2.5
export const FREE_DELIVERY_THRESHOLD = 35
export const PROMO_DISCOUNT = 5
export const PROMO_MIN_SUBTOTAL = 30

export type PricedLine = { price: number; qty: number }

export function calcSubtotal(items: PricedLine[]) {
  return items.reduce((s, i) => s + i.price * i.qty, 0)
}

export function calcDeliveryFee(subtotal: number) {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE_DISCOUNTED : DELIVERY_FEE_ORIGINAL
}

export function calcPromoDiscount(subtotal: number) {
  return subtotal >= PROMO_MIN_SUBTOTAL ? PROMO_DISCOUNT : 0
}

export function calcOrderTotal(subtotal: number) {
  const delivery = calcDeliveryFee(subtotal)
  const discount = calcPromoDiscount(subtotal)
  return Math.max(0, subtotal + PACKAGING_FEE + delivery - discount)
}

export function deliveryGap(subtotal: number) {
  return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
}
