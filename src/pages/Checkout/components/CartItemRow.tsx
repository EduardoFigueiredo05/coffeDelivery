import { Trash } from '@phosphor-icons/react'
import { QuantityInput } from '@/components/QuantityInput'
import { useCart } from '@/hooks/useCart'
import type { CartItem } from '@/reducers/cart/reducer'
import { formatMoney } from '@/utils/formatMoney'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { coffee, quantity } = item

  return (
    <li className="flex items-start justify-between gap-3 border-b border-base-button py-6 first:pt-0">
      <div className="flex gap-4 sm:gap-5">
        <img src={coffee.image} alt="" className="size-16 shrink-0" width={64} height={64} />
        <div>
          <p className="text-base-subtitle">{coffee.name}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <QuantityInput
              size="sm"
              quantity={quantity}
              onIncrement={() => incrementItem(coffee.id)}
              onDecrement={() => decrementItem(coffee.id)}
              label={`Quantidade de ${coffee.name}`}
            />
            <button
              type="button"
              onClick={() => removeItem(coffee.id)}
              aria-label={`Remover ${coffee.name} do carrinho`}
              className="flex h-8 cursor-pointer items-center gap-1 rounded-md bg-base-button px-2 text-xs text-base-text uppercase transition-colors hover:bg-base-hover"
            >
              <Trash size={16} className="text-purple" aria-hidden />
              Remover
            </button>
          </div>
        </div>
      </div>
      <strong className="shrink-0 text-base-text">{formatMoney(coffee.price * quantity)}</strong>
    </li>
  )
}
