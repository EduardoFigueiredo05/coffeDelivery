import { coffees } from '@/data/coffees'
import { initialCartState, type CartState, type Order } from './reducer'

/** Versão na chave: se o formato mudar, o estado antigo é simplesmente ignorado. */
export const CART_STORAGE_KEY = '@coffee-delivery:cart-state-1.0.0'
export const ORDER_STORAGE_KEY = '@coffee-delivery:last-order-1.0.0'

/**
 * Do carrinho salvamos apenas id + quantidade. Os dados do café (nome, preço, imagem)
 * vêm sempre do catálogo, assim o carrinho nunca fica com preço/imagem desatualizados.
 */
type PersistedCart = { id: string; quantity: number }[]

export function saveCartState(state: CartState): void {
  try {
    const cart: PersistedCart = state.items.map((item) => ({
      id: item.coffee.id,
      quantity: item.quantity,
    }))
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))

    if (state.order) localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(state.order))
    else localStorage.removeItem(ORDER_STORAGE_KEY)
  } catch {
    // LocalStorage indisponível (modo privado, cota cheia): o app segue funcionando em memória.
  }
}

function loadItems(): CartState['items'] {
  const raw = localStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return []

  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) return []

  return parsed.flatMap((entry: PersistedCart[number]) => {
    const coffee = coffees.find((c) => c.id === entry?.id)
    const quantity = Number(entry?.quantity)
    if (!coffee || !Number.isInteger(quantity) || quantity < 1) return []
    return [{ coffee, quantity: Math.min(quantity, 99) }]
  })
}

function loadOrder(): Order | null {
  const raw = localStorage.getItem(ORDER_STORAGE_KEY)
  if (!raw) return null
  const parsed = JSON.parse(raw) as Order
  return parsed && typeof parsed.id === 'string' && parsed.address ? parsed : null
}

function safely<T>(load: () => T, fallback: T): T {
  try {
    return load()
  } catch {
    return fallback
  }
}

export function loadCartState(): CartState {
  const items = safely(loadItems, [])
  const order = safely(loadOrder, null)
  return items.length || order ? { items, order } : initialCartState
}
