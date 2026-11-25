import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { CartFeedbackProvider } from '@/contexts/CartFeedbackContext'
import { LocationProvider } from '@/contexts/LocationContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { routes } from '@/routes'

/** Renderiza a aplicação completa em uma rota, com os mesmos providers do App. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(
    <ThemeProvider>
      <LocationProvider>
        <CartProvider>
          <CartFeedbackProvider>
            <RouterProvider router={router} />
          </CartFeedbackProvider>
        </CartProvider>
      </LocationProvider>
    </ThemeProvider>,
  )
  return router
}
