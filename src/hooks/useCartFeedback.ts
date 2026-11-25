import { useContext } from 'react'
import { CartFeedbackContext } from '@/contexts/CartFeedbackContext'

export function useCartFeedback() {
  const context = useContext(CartFeedbackContext)
  if (!context) {
    throw new Error('useCartFeedback precisa ser usado dentro de <CartFeedbackProvider>')
  }
  return context
}
