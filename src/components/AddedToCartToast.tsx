import { Link } from 'react-router-dom'
import { ArrowRight, CheckFat, X } from '@phosphor-icons/react'
import { useCartFeedback } from '@/hooks/useCartFeedback'

/** Tempo de exibição — a barra de progresso usa a mesma duração (pausa ao passar o mouse). */
export const TOAST_DURATION_MS = 3200

/**
 * Toast minimalista exibido ao adicionar um café à sacola.
 * Mobile: rodapé da tela. Desktop: logo abaixo do header, alinhado ao conteúdo.
 */
export function AddedToCartToast() {
  const { feedback, dismiss } = useCartFeedback()
  if (!feedback) return null

  const { coffee, quantity } = feedback

  return (
    <div
      key={feedback.id}
      role="status"
      aria-live="polite"
      className="group fixed inset-x-4 bottom-4 z-50 animate-toast-in sm:inset-x-auto sm:top-24 sm:bottom-auto sm:right-[max(1.25rem,calc((100vw-1120px)/2))] sm:w-[360px] md:top-28"
    >
      <div className="relative overflow-hidden rounded-tl-md rounded-tr-[24px] rounded-br-md rounded-bl-[24px] border border-base-button bg-base-card shadow-[0_16px_40px_-12px_rgb(0_0_0/0.25)] transition-colors">
        <div className="flex items-center gap-3 py-3 pr-3 pl-4">
          <span className="relative shrink-0">
            <img src={coffee.image} alt="" className="size-12" width={48} height={48} />
            <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-yellow-dark text-white ring-2 ring-base-card">
              <CheckFat size={10} weight="fill" aria-hidden />
            </span>
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wider text-yellow-dark uppercase">
              Adicionado à sacola
            </p>
            <p className="truncate font-title text-base leading-tight font-bold text-base-subtitle">
              <span className="text-purple">{quantity}×</span> {coffee.name}
            </p>
          </div>

          <Link
            to="/checkout"
            onClick={dismiss}
            className="group/link flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold text-purple-dark transition-colors hover:bg-purple-light"
          >
            Ver sacola
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform group-hover/link:translate-x-0.5"
              aria-hidden
            />
          </Link>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar aviso"
            className="shrink-0 cursor-pointer rounded p-1 text-base-label transition-colors hover:text-base-text"
          >
            <X size={14} weight="bold" aria-hidden />
          </button>
        </div>

        {/* Barra de tempo: ao terminar a animação o toast some */}
        <span
          aria-hidden
          onAnimationEnd={dismiss}
          style={{ animationDuration: `${TOAST_DURATION_MS}ms` }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-toast-progress bg-linear-to-r from-yellow to-purple group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        />
      </div>
    </div>
  )
}
