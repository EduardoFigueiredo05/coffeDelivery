import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '@/test/renderWithProviders'

describe('Feedback de adicionar à sacola', () => {
  beforeEach(() => localStorage.clear())

  async function addLatte() {
    const user = userEvent.setup()
    const router = renderRoute('/')
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    return { user, router }
  }

  it('mostra o toast com o café e a quantidade', async () => {
    await addLatte()
    const toast = screen.getByRole('status')
    expect(toast).toHaveTextContent('Adicionado à sacola')
    expect(toast).toHaveTextContent('1× Latte')
  })

  it('"Ver sacola" leva ao checkout e fecha o aviso', async () => {
    const { user, router } = await addLatte()
    await user.click(screen.getByRole('link', { name: 'Ver sacola' }))

    await waitFor(() => expect(router.state.location.pathname).toBe('/checkout'))
    expect(screen.queryByText('Adicionado à sacola')).not.toBeInTheDocument()
  })

  it('pode ser fechado manualmente', async () => {
    const { user } = await addLatte()
    await user.click(screen.getByRole('button', { name: 'Fechar aviso' }))
    expect(screen.queryByText('Adicionado à sacola')).not.toBeInTheDocument()
  })
})
