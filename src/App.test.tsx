import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renderiza a home com o catálogo', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Encontre o café perfeito para qualquer hora do dia' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(14)
  })
})
