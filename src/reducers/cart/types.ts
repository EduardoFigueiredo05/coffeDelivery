import type { Coffee } from '@/data/coffees'
import type { CheckoutFormData } from '@/schemas/checkout'

export interface CartItem {
  coffee: Coffee
  quantity: number
}

export interface Order {
  id: string
  address: Omit<CheckoutFormData, 'paymentMethod'>
  paymentMethod: CheckoutFormData['paymentMethod']
  items: { coffeeId: string; name: string; quantity: number; price: number }[]
  itemsTotal: number
  deliveryFee: number
  total: number
  createdAt: string
}

export interface CartState {
  items: CartItem[]
  /** Último pedido confirmado (exibido na página de sucesso) */
  order: Order | null
}
