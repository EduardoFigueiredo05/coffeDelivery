import type { Coffee } from '@/data/coffees'
import type { Order } from './types'

export const CartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  INCREMENT_ITEM: 'INCREMENT_ITEM',
  DECREMENT_ITEM: 'DECREMENT_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  CHECKOUT: 'CHECKOUT',
} as const

export type CartAction =
  | { type: typeof CartActionTypes.ADD_ITEM; payload: { coffee: Coffee; quantity: number } }
  | { type: typeof CartActionTypes.INCREMENT_ITEM; payload: { coffeeId: string } }
  | { type: typeof CartActionTypes.DECREMENT_ITEM; payload: { coffeeId: string } }
  | { type: typeof CartActionTypes.REMOVE_ITEM; payload: { coffeeId: string } }
  | { type: typeof CartActionTypes.CLEAR_CART }
  | { type: typeof CartActionTypes.CHECKOUT; payload: { order: Order } }

export const addItemAction = (coffee: Coffee, quantity: number): CartAction => ({
  type: CartActionTypes.ADD_ITEM,
  payload: { coffee, quantity },
})

export const incrementItemAction = (coffeeId: string): CartAction => ({
  type: CartActionTypes.INCREMENT_ITEM,
  payload: { coffeeId },
})

export const decrementItemAction = (coffeeId: string): CartAction => ({
  type: CartActionTypes.DECREMENT_ITEM,
  payload: { coffeeId },
})

export const removeItemAction = (coffeeId: string): CartAction => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: { coffeeId },
})

export const clearCartAction = (): CartAction => ({ type: CartActionTypes.CLEAR_CART })

export const checkoutAction = (order: Order): CartAction => ({
  type: CartActionTypes.CHECKOUT,
  payload: { order },
})
