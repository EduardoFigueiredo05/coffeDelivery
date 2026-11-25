import { createContext, useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { DELIVERY_FEE, type Coffee } from '@/data/coffees'
import type { CheckoutFormData } from '@/schemas/checkout'
import { cartReducer, type CartItem, type Order } from '@/reducers/cart/reducer'
import {
  addItemAction,
  checkoutAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from '@/reducers/cart/actions'
import { loadCartState, saveCartState } from '@/reducers/cart/storage'

export interface CartContextData {
  items: CartItem[]
  order: Order | null
  /** Quantidade total de unidades (badge do header) */
  totalQuantity: number
  itemsTotal: number
  deliveryFee: number
  orderTotal: number
  addItem: (coffee: Coffee, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
  /** Confirma o pedido com os dados do checkout e esvazia o carrinho */
  checkout: (data: CheckoutFormData) => Order | null
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextData | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicialização preguiçosa: lê o LocalStorage uma única vez.
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCartState)

  useEffect(() => {
    saveCartState(state)
  }, [state])

  const totals = useMemo(() => {
    const totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0)
    const itemsTotal = state.items.reduce((acc, item) => acc + item.coffee.price * item.quantity, 0)
    const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0
    return { totalQuantity, itemsTotal, deliveryFee, orderTotal: itemsTotal + deliveryFee }
  }, [state.items])

  const addItem = useCallback(
    (coffee: Coffee, quantity: number) => dispatch(addItemAction(coffee, quantity)),
    [],
  )
  const incrementItem = useCallback((id: string) => dispatch(incrementItemAction(id)), [])
  const decrementItem = useCallback((id: string) => dispatch(decrementItemAction(id)), [])
  const removeItem = useCallback((id: string) => dispatch(removeItemAction(id)), [])
  const clearCart = useCallback(() => dispatch(clearCartAction()), [])

  const checkout = useCallback(
    ({ paymentMethod, ...address }: CheckoutFormData) => {
      if (state.items.length === 0) return null

      const order: Order = {
        id: crypto.randomUUID(),
        address: { ...address, uf: address.uf.toUpperCase() },
        paymentMethod,
        items: state.items.map((item) => ({
          coffeeId: item.coffee.id,
          name: item.coffee.name,
          quantity: item.quantity,
          price: item.coffee.price,
        })),
        itemsTotal: totals.itemsTotal,
        deliveryFee: totals.deliveryFee,
        total: totals.orderTotal,
        createdAt: new Date().toISOString(),
      }
      dispatch(checkoutAction(order))
      return order
    },
    [state.items, totals],
  )

  const value = useMemo<CartContextData>(
    () => ({
      items: state.items,
      order: state.order,
      ...totals,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      checkout,
    }),
    [state, totals, addItem, incrementItem, decrementItem, removeItem, clearCart, checkout],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
