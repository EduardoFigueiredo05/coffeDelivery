import mascot from '@/assets/logo-mago.png'

interface LogoProps {
  /** Esconde o texto e mostra só o mascote (útil em telas muito pequenas) */
  compact?: boolean
}

/**
 * Logo do Coffee Delivery: mascote (mago com a xícara) criado com IA + nome da marca.
 * O texto usa os tokens de cor, então se adapta sozinho ao Light e ao Dark Mode.
 */
export function Logo({ compact = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2">
      <img src={mascot} alt="" className="h-11 w-auto" width={46} height={44} />
      <span
        className={`font-title leading-[0.95] text-base-subtitle ${compact ? 'sr-only' : 'flex flex-col'}`}
      >
        <span className="text-xl font-extrabold">Coffee</span>
        <span className="text-base font-medium text-purple-dark">Delivery</span>
      </span>
    </span>
  )
}
