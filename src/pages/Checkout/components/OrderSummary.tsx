import { Link } from 'react-router-dom'
import { Coffee } from '@phosphor-icons/react'
import { useCart } from '@/hooks/useCart'
import { formatMoney } from '@/utils/formatMoney'
import { CartItemRow } from './CartItemRow'

interface OrderSummaryProps {
  isSubmitting: boolean
}

export function OrderSummary({ isSubmitting }: OrderSummaryProps) {
  const { items, itemsTotal, deliveryFee, orderTotal } = useCart()
  const isEmpty = items.length === 0

  return (
    <div className="rounded-tl-md rounded-tr-[44px] rounded-br-md rounded-bl-[44px] bg-base-card p-6 transition-colors sm:p-10">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <Coffee size={40} className="text-base-label" aria-hidden />
          <p className="text-base-subtitle">Seu carrinho está vazio</p>
          <Link to="/" className="text-sm font-bold text-purple underline-offset-4 hover:underline">
            Escolher cafés
          </Link>
        </div>
      ) : (
        <ul aria-label="Cafés selecionados">
          {items.map((item) => (
            <CartItemRow key={item.coffee.id} item={item} />
          ))}
        </ul>
      )}

      <dl className="mt-6 space-y-3 text-sm text-base-text">
        <div className="flex justify-between">
          <dt>Total de itens</dt>
          <dd>{formatMoney(itemsTotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Entrega</dt>
          <dd>{formatMoney(deliveryFee)}</dd>
        </div>
        <div className="flex justify-between text-xl font-bold text-base-subtitle">
          <dt>Total</dt>
          <dd>{formatMoney(orderTotal)}</dd>
        </div>
      </dl>

      <button
        type="submit"
        disabled={isEmpty || isSubmitting}
        className="mt-6 w-full cursor-pointer rounded-md bg-yellow px-2 py-3 text-sm font-bold text-white uppercase transition-colors hover:bg-yellow-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar pedido
      </button>
    </div>
  )
}
