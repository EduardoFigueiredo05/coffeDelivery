import { CartActionTypes, type CartAction } from './actions'
import type { CartState } from './types'

export type { CartItem, CartState, Order } from './types'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99

export const initialCartState: CartState = { items: [], order: null }

const clamp = (value: number) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value))

/**
 * Reducer puro do carrinho. Nunca muta o estado anterior:
 * sempre devolve um novo objeto, o que facilita testes e o React detectar mudanças.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const { coffee, quantity } = action.payload
      if (quantity < MIN_QUANTITY) return state

      const exists = state.items.some((item) => item.coffee.id === coffee.id)
      const items = exists
        ? state.items.map((item) =>
            item.coffee.id === coffee.id
              ? { ...item, quantity: clamp(item.quantity + quantity) }
              : item,
          )
        : [...state.items, { coffee, quantity: clamp(quantity) }]

      return { ...state, items }
    }

    case CartActionTypes.INCREMENT_ITEM:
    case CartActionTypes.DECREMENT_ITEM: {
      const delta = action.type === CartActionTypes.INCREMENT_ITEM ? 1 : -1
      return {
        ...state,
        items: state.items.map((item) =>
          item.coffee.id === action.payload.coffeeId
            ? { ...item, quantity: clamp(item.quantity + delta) }
            : item,
        ),
      }
    }

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.coffee.id !== action.payload.coffeeId),
      }

    case CartActionTypes.CLEAR_CART:
      return { ...state, items: [] }

    case CartActionTypes.CHECKOUT:
      // Confirma o pedido: guarda o resumo e esvazia o carrinho (RN07).
      if (state.items.length === 0) return state
      return { items: [], order: action.payload.order }

    default:
      return state
  }
}
