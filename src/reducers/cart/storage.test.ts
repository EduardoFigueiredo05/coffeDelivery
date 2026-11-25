import { beforeEach, describe, expect, it } from 'vitest'
import { coffees } from '@/data/coffees'
import type { Order } from './reducer'
import { CART_STORAGE_KEY, ORDER_STORAGE_KEY, loadCartState, saveCartState } from './storage'

const order: Order = {
  id: 'pedido-1',
  address: {
    cep: '90250-440',
    street: 'Rua João Daniel Martinelli',
    number: '102',
    complement: '',
    district: 'Farrapos',
    city: 'Porto Alegre',
    uf: 'RS',
  },
  paymentMethod: 'credit',
  items: [],
  itemsTotal: 9.9,
  deliveryFee: 3.5,
  total: 13.4,
  createdAt: new Date().toISOString(),
}

describe('persistência do carrinho', () => {
  beforeEach(() => localStorage.clear())

  it('salva e recupera o carrinho', () => {
    saveCartState({ items: [{ coffee: coffees[0], quantity: 3 }], order: null })
    const state = loadCartState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].coffee.name).toBe(coffees[0].name)
    expect(state.items[0].quantity).toBe(3)
  })

  it('salva e recupera o último pedido', () => {
    saveCartState({ items: [], order })
    expect(loadCartState().order?.address.city).toBe('Porto Alegre')
  })

  it('retorna carrinho vazio quando o JSON é inválido', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{quebrado')
    localStorage.setItem(ORDER_STORAGE_KEY, '{quebrado')
    expect(loadCartState()).toEqual({ items: [], order: null })
  })

  it('descarta cafés que não existem mais no catálogo', () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ id: 'nao-existe', quantity: 1 }, { id: coffees[1].id, quantity: 2 }]),
    )
    expect(loadCartState().items.map((i) => i.coffee.id)).toEqual([coffees[1].id])
  })
})
