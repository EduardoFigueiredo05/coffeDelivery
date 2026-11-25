import { Minus, Plus } from '@phosphor-icons/react'

interface QuantityInputProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
  size?: 'md' | 'sm'
  label?: string
}

export function QuantityInput({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Quantidade',
}: QuantityInputProps) {
  const height = size === 'md' ? 'h-[38px]' : 'h-8'

  return (
    <div
      className={`flex items-center gap-1 rounded-md bg-base-button p-2 ${height}`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Diminuir quantidade"
        className="cursor-pointer text-purple transition-colors hover:text-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={14} weight="bold" />
      </button>
      <span className="w-5 text-center text-base leading-none text-base-title" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Aumentar quantidade"
        className="cursor-pointer text-purple transition-colors hover:text-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  )
}
