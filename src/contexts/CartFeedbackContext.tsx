import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Coffee } from '@/data/coffees'

export interface CartFeedback {
  /** Muda a cada adição: reinicia a animação do toast e do ícone do carrinho */
  id: number
  coffee: Coffee
  quantity: number
}

interface CartFeedbackContextData {
  feedback: CartFeedback | null
  notifyAdded: (coffee: Coffee, quantity: number) => void
  dismiss: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartFeedbackContext = createContext<CartFeedbackContextData | null>(null)

/**
 * Feedback visual de "adicionado à sacola".
 * O provider só guarda o estado; o toast é renderizado no DefaultLayout (dentro do Router,
 * para poder usar <Link>) e o Header usa o `id` para animar o ícone do carrinho.
 */
export function CartFeedbackProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useState<CartFeedback | null>(null)

  const notifyAdded = useCallback((coffee: Coffee, quantity: number) => {
    setFeedback((current) => ({ id: (current?.id ?? 0) + 1, coffee, quantity }))
  }, [])

  const dismiss = useCallback(() => setFeedback(null), [])

  const value = useMemo(() => ({ feedback, notifyAdded, dismiss }), [feedback, notifyAdded, dismiss])

  return (
    <CartFeedbackContext.Provider value={value}>
      {children}
    </CartFeedbackContext.Provider>
  )
}
