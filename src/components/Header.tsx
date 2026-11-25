import { Link } from 'react-router-dom'
import { ShoppingCart } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { LocationPicker } from './LocationPicker'
import { useCart } from '@/hooks/useCart'
import { useCartFeedback } from '@/hooks/useCartFeedback'
import { useDeliveryLocation } from '@/hooks/useDeliveryLocation'

const DEFAULT_LOCATION = 'Porto Alegre, RS'

export function Header() {
  const { totalQuantity, order } = useCart()
  const { location } = useDeliveryLocation()
  const { feedback } = useCartFeedback()

  // Prioridade: localização escolhida > cidade do último pedido > padrão do Figma.
  const label = location
    ? `${location.city}, ${location.uf}`
    : order
      ? `${order.address.city}, ${order.address.uf}`
      : DEFAULT_LOCATION

  return (
    <header className="sticky top-0 z-20 bg-background/95 transition-colors">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-5 py-5 md:py-8 xl:px-0">
        <Link to="/" aria-label="Coffee Delivery — página inicial" className="shrink-0">
          <Logo />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Ações">
          <LocationPicker label={label} />

          <ThemeToggle />

          <Link
            to="/checkout"
            className="relative rounded-md bg-yellow-light p-2 text-yellow-dark transition-colors hover:brightness-95"
            aria-label={`Carrinho com ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'}`}
          >
            {/* A key muda a cada adição e reinicia a animação de "pulo" */}
            <span key={feedback?.id ?? 0} className={`block ${feedback ? 'animate-cart-bump' : ''}`}>
              <ShoppingCart size={22} weight="fill" aria-hidden />
            </span>
            {totalQuantity > 0 && (
              <span
                key={`badge-${feedback?.id ?? 0}`}
                className={`absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-dark px-1 text-xs font-bold text-white ${feedback ? 'animate-badge-pop' : ''}`}
              >
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
