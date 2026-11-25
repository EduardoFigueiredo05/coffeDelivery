import type { ReactNode } from 'react'

const variants = {
  'yellow-dark': 'bg-yellow-dark',
  yellow: 'bg-yellow',
  purple: 'bg-purple',
  text: 'bg-base-text',
} as const

interface IconBadgeProps {
  icon: ReactNode
  variant: keyof typeof variants
}

/** Ícone branco dentro de um círculo colorido (usado no Hero e na página de sucesso). */
export function IconBadge({ icon, variant }: IconBadgeProps) {
  return (
    <span
      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white ${variants[variant]}`}
      aria-hidden
    >
      {icon}
    </span>
  )
}
