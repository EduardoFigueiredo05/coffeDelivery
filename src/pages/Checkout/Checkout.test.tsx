import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '@/test/renderWithProviders'
import { CART_STORAGE_KEY } from '@/reducers/cart/storage'

function seedCart() {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify([
      { id: 'expresso-tradicional', quantity: 1 },
      { id: 'latte', quantity: 2 },
    ]),
  )
}

describe('Checkout', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          logradouro: 'Rua João Daniel Martinelli',
          bairro: 'Farrapos',
          localidade: 'Porto Alegre',
          uf: 'RS',
        }),
      }),
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  it('mostra os cafés selecionados e os totais', async () => {
    seedCart()
    renderRoute('/checkout')

    const list = await screen.findByRole('list', { name: 'Cafés selecionados' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('R$ 29,70')).toBeInTheDocument()
    expect(screen.getByText('R$ 3,50')).toBeInTheDocument()
    expect(screen.getByText('R$ 33,20')).toBeInTheDocument()
  })

  it('remove um item e recalcula os totais', async () => {
    const user = userEvent.setup()
    seedCart()
    renderRoute('/checkout')

    await user.click(await screen.findByRole('button', { name: 'Remover Latte do carrinho' }))
    expect(screen.queryByText('Latte')).not.toBeInTheDocument()
    expect(screen.getByText('R$ 13,40')).toBeInTheDocument()
  })

  it('exibe os erros de validação ao confirmar com campos vazios', async () => {
    const user = userEvent.setup()
    seedCart()
    renderRoute('/checkout')

    await user.click(await screen.findByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('Informe um CEP válido')).toBeInTheDocument()
    expect(screen.getByText('Informe o número')).toBeInTheDocument()
    expect(screen.getByText('Selecione a forma de pagamento')).toBeInTheDocument()
  })

  it('desabilita a confirmação com o carrinho vazio', async () => {
    renderRoute('/checkout')
    expect(await screen.findByText('Seu carrinho está vazio')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeDisabled()
  })

  it('preenche o endereço pelo CEP, confirma o pedido e mostra a página de sucesso', async () => {
    const user = userEvent.setup()
    seedCart()
    const router = renderRoute('/checkout')

    await user.type(await screen.findByLabelText('CEP'), '90250440')
    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Rua João Daniel Martinelli'))
    expect(screen.getByLabelText('CEP')).toHaveValue('90250-440')

    await user.type(screen.getByLabelText('Número'), '102')
    await user.click(screen.getByLabelText('Cartão de Crédito'))
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/success')
    expect(screen.getByText('Rua João Daniel Martinelli, 102')).toBeInTheDocument()
    expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument()
    expect(screen.queryByText('Carrinho com', { exact: false })).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!)).toEqual([])
  })

  it('redireciona /success para a home quando não há pedido', async () => {
    const router = renderRoute('/success')
    await waitFor(() => expect(router.state.location.pathname).toBe('/'))
  })
})
