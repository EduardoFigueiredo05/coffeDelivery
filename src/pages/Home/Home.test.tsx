import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '@/test/renderWithProviders'
import { CART_STORAGE_KEY } from '@/reducers/cart/storage'

describe('Home', () => {
  beforeEach(() => localStorage.clear())

  it('adiciona cafés ao carrinho e atualiza o contador do header', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const latte = screen.getByRole('group', { name: 'Quantidade de Latte' })
    await user.click(latte.querySelector('button[aria-label="Aumentar quantidade"]')!)
    await user.click(latte.querySelector('button[aria-label="Aumentar quantidade"]')!)
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))

    expect(screen.getByRole('link', { name: 'Carrinho com 3 itens' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!)).toEqual([
      { id: 'latte', quantity: 3 },
    ])
  })

  it('alterna entre Light e Dark Mode', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    document.documentElement.classList.remove('dark')

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }))
    expect(document.documentElement).not.toHaveClass('dark')
  })
})
