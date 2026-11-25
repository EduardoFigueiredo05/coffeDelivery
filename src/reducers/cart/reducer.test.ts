import { describe, expect, it } from 'vitest'
import { coffees } from '@/data/coffees'
import { cartReducer, initialCartState, MAX_QUANTITY, type Order } from './reducer'
import {
  addItemAction,
  checkoutAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from './actions'

const [expresso, latte] = coffees

describe('cartReducer', () => {
  it('adiciona um café novo ao carrinho', () => {
    const state = cartReducer(initialCartState, addItemAction(expresso, 2))
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject({ coffee: { id: expresso.id }, quantity: 2 })
  })

  it('soma a quantidade quando o café já está no carrinho', () => {
    let state = cartReducer(initialCartState, addItemAction(expresso, 1))
    state = cartReducer(state, addItemAction(expresso, 3))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(4)
  })

  it('ignora adição com quantidade menor que 1', () => {
    const state = cartReducer(initialCartState, addItemAction(expresso, 0))
    expect(state).toBe(initialCartState)
  })

  it('incrementa e decrementa sem passar dos limites', () => {
    let state = cartReducer(initialCartState, addItemAction(latte, 1))
    state = cartReducer(state, decrementItemAction(latte.id))
    expect(state.items[0].quantity).toBe(1)
    state = cartReducer(state, addItemAction(latte, MAX_QUANTITY))
    state = cartReducer(state, incrementItemAction(latte.id))
    expect(state.items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('remove um item específico', () => {
    let state = cartReducer(initialCartState, addItemAction(expresso, 1))
    state = cartReducer(state, addItemAction(latte, 1))
    state = cartReducer(state, removeItemAction(expresso.id))
    expect(state.items.map((i) => i.coffee.id)).toEqual([latte.id])
  })

  it('limpa o carrinho', () => {
    const state = cartReducer(
      cartReducer(initialCartState, addItemAction(expresso, 1)),
      clearCartAction(),
    )
    expect(state.items).toEqual([])
  })

  it('não muta o estado anterior', () => {
    const before = cartReducer(initialCartState, addItemAction(expresso, 1))
    const snapshot = structuredClone(before)
    cartReducer(before, incrementItemAction(expresso.id))
    expect(before).toEqual(snapshot)
  })

  it('confirma o pedido: salva o resumo e esvazia o carrinho', () => {
    const order = { id: 'pedido-1' } as Order
    const state = cartReducer(cartReducer(initialCartState, addItemAction(expresso, 2)), checkoutAction(order))
    expect(state.items).toEqual([])
    expect(state.order).toBe(order)
  })

  it('não confirma pedido com o carrinho vazio', () => {
    const state = cartReducer(initialCartState, checkoutAction({ id: 'x' } as Order))
    expect(state).toBe(initialCartState)
  })
})
