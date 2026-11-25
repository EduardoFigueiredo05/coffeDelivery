import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import heroImage from '@/assets/hero.png'
import { IconBadge } from '@/components/IconBadge'

const benefits = [
  { text: 'Compra simples e segura', icon: <ShoppingCart size={16} weight="fill" />, variant: 'yellow-dark' },
  { text: 'Embalagem mantém o café intacto', icon: <Package size={16} weight="fill" />, variant: 'text' },
  { text: 'Entrega rápida e rastreada', icon: <Timer size={16} weight="fill" />, variant: 'yellow' },
  { text: 'O café chega fresquinho até você', icon: <Coffee size={16} weight="fill" />, variant: 'purple' },
] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Fundo desfocado amarelo/roxo do Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl dark:opacity-30"
        style={{
          background:
            'radial-gradient(40% 50% at 15% 40%, var(--yellow-light) 0%, transparent 70%),' +
            'radial-gradient(35% 45% at 55% 30%, var(--purple-light) 0%, transparent 70%),' +
            'radial-gradient(35% 50% at 85% 55%, var(--yellow-light) 0%, transparent 70%),' +
            'radial-gradient(30% 40% at 30% 75%, var(--purple-light) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-10 md:py-16 lg:grid-cols-[1fr_476px] lg:gap-14 lg:py-[92px] xl:px-0">
        <div>
          <h1
            id="hero-title"
            className="font-title text-[2rem] leading-tight font-extrabold text-base-title sm:text-5xl sm:leading-[1.3]"
          >
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className="mt-4 text-lg leading-[1.3] text-base-subtitle sm:text-xl">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-[auto_auto] sm:gap-x-10 lg:mt-[66px]">
            {benefits.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-3">
                <IconBadge icon={benefit.icon} variant={benefit.variant} />
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <img
          src={heroImage}
          alt="Copo de café Coffee Delivery cercado por grãos de café"
          className="mx-auto w-full max-w-[476px]"
          width={476}
          height={360}
        />
      </div>
    </section>
  )
}
