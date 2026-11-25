import type { ReactNode } from 'react'

interface SectionCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  children: ReactNode
}

/** Card do checkout com ícone, título e subtítulo (Endereço / Pagamento). */
export function SectionCard({ icon, title, subtitle, children }: SectionCardProps) {
  return (
    <section className="rounded-md bg-base-card p-6 transition-colors sm:p-10">
      <header className="flex gap-2">
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
        <div>
          <h3 className="text-base text-base-subtitle">{title}</h3>
          <p className="text-sm text-base-text">{subtitle}</p>
        </div>
      </header>
      <div className="mt-8">{children}</div>
    </section>
  )
}
