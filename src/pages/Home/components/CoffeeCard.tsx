import { useEffect, useState } from 'react'
import { CheckFat, ShoppingCart } from '@phosphor-icons/react'
import type { Coffee } from '@/data/coffees'
import { QuantityInput } from '@/components/QuantityInput'
import { useCart } from '@/hooks/useCart'
import { useCartFeedback } from '@/hooks/useCartFeedback'
import { formatNumber } from '@/utils/formatMoney'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addItem } = useCart()
  const { notifyAdded } = useCartFeedback()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timeout = setTimeout(() => setJustAdded(false), 1200)
    return () => clearTimeout(timeout)
  }, [justAdded])

  function handleAddToCart() {
    addItem(coffee, quantity)
    notifyAdded(coffee, quantity)
    setQuantity(1)
    setJustAdded(true)
  }

  return (
    <article className="flex flex-col items-center rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] bg-base-card px-5 pb-5 text-center transition-colors">
      <img
        src={coffee.image}
        alt=""
        className="-mt-5 size-[120px] drop-shadow-sm"
        width={120}
        height={120}
        loading="lazy"
      />

      <ul className="mt-3 flex flex-wrap justify-center gap-1" aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-yellow-light px-2 py-1 text-[10px] leading-[1.3] font-bold text-yellow-dark uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>

      <h3 className="mt-4 font-title text-xl leading-[1.3] font-bold text-base-subtitle">
        {coffee.name}
      </h3>
      <p className="mt-2 text-sm leading-[1.3] text-base-label">{coffee.description}</p>

      <footer className="mt-auto flex w-full items-center justify-between gap-2 pt-8">
        <p className="text-sm whitespace-nowrap text-base-text">
          R${' '}
          <strong className="font-title text-2xl font-extrabold">{formatNumber(coffee.price)}</strong>
        </p>

        <div className="flex items-center gap-2">
          <QuantityInput
            quantity={quantity}
            onIncrement={() => setQuantity((q) => Math.min(99, q + 1))}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            label={`Quantidade de ${coffee.name}`}
          />
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
            className={`flex size-[38px] cursor-pointer items-center justify-center rounded-md text-white transition-colors ${
              justAdded ? 'bg-yellow-dark' : 'bg-purple-dark hover:bg-purple dark:bg-purple dark:hover:bg-purple-dark dark:hover:text-background'
            }`}
          >
            {justAdded ? (
              <CheckFat size={22} weight="fill" aria-hidden />
            ) : (
              <ShoppingCart size={22} weight="fill" aria-hidden />
            )}
          </button>
        </div>
      </footer>
    </article>
  )
}
