import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '@/test/renderWithProviders'
import { LOCATION_STORAGE_KEY } from '@/contexts/LocationContext'

function mockViaCep(response: object) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => response }))
}

const paulista = {
  logradouro: 'Avenida Paulista',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
}

describe('LocationPicker', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.unstubAllGlobals())

  it('troca a localização pelo CEP e atualiza o header', async () => {
    const user = userEvent.setup()
    mockViaCep(paulista)
    renderRoute('/')

    await user.click(screen.getByRole('button', { name: 'Alterar localização: Porto Alegre, RS' }))
    const dialog = screen.getByRole('dialog', { name: 'Onde você está?' })
    expect(dialog).toBeInTheDocument()

    const input = screen.getByLabelText('CEP')
    expect(input).toHaveFocus()
    await user.type(input, '01310100')
    expect(input).toHaveValue('01310-100')

    expect(await screen.findByText('Avenida Paulista')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Usar este endereço' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Alterar localização: São Paulo, SP' })).toHaveFocus()
    expect(JSON.parse(localStorage.getItem(LOCATION_STORAGE_KEY)!)).toMatchObject({
      cep: '01310-100',
      city: 'São Paulo',
      uf: 'SP',
    })
  })

  it('mostra erro quando o CEP não existe e não permite confirmar', async () => {
    const user = userEvent.setup()
    mockViaCep({ erro: true })
    renderRoute('/')

    await user.click(screen.getByRole('button', { name: /Alterar localização/ }))
    await user.type(screen.getByLabelText('CEP'), '99999999')

    expect(await screen.findByText('CEP não encontrado. Confira os números.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Usar este endereço' })).toBeDisabled()
  })

  it('fecha com a tecla Esc', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(screen.getByRole('button', { name: /Alterar localização/ }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('fecha ao clicar fora', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(screen.getByRole('button', { name: /Alterar localização/ }))
    await user.click(screen.getByRole('heading', { name: 'Nossos cafés' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('pré-preenche o checkout com a localização escolhida', async () => {
    localStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify({
        cep: '01310-100',
        street: 'Avenida Paulista',
        district: 'Bela Vista',
        city: 'São Paulo',
        uf: 'SP',
      }),
    )
    mockViaCep(paulista)
    renderRoute('/checkout')

    await waitFor(() => expect(screen.getByLabelText('CEP')).toHaveValue('01310-100'))
    expect(screen.getByLabelText('Rua')).toHaveValue('Avenida Paulista')
    expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
    expect(screen.getByRole('button', { name: 'Alterar localização: São Paulo, SP' })).toBeInTheDocument()
  })
})
