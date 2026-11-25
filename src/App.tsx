import { RouterProvider } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { CartFeedbackProvider } from '@/contexts/CartFeedbackContext'
import { LocationProvider } from '@/contexts/LocationContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { router } from '@/routes'

export function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <CartProvider>
          <CartFeedbackProvider>
            <RouterProvider router={router} />
          </CartFeedbackProvider>
        </CartProvider>
      </LocationProvider>
    </ThemeProvider>
  )
}
