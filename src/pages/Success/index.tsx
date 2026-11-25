import { Navigate } from 'react-router-dom'
import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import deliveryIllustration from '@/assets/delivery-illustration.svg'
import { IconBadge } from '@/components/IconBadge'
import { useCart } from '@/hooks/useCart'
import { paymentMethods } from '@/schemas/checkout'

export function Success() {
  const { order } = useCart()

  // Sem pedido confirmado não há o que mostrar (acesso direto à URL).
  if (!order) return <Navigate to="/" replace />

  const { address } = order

  return (
    <main className="mx-auto max-w-[1120px] px-5 pt-6 pb-20 md:pt-20 xl:px-0">
      <h1 className="font-title text-[2rem] leading-[1.3] font-extrabold text-yellow-dark">
        Uhu! Pedido confirmado
      </h1>
      <p className="text-lg text-base-subtitle sm:text-xl">
        Agora é só aguardar que logo o café chegará até você
      </p>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[526px_1fr] lg:gap-[102px]">
        {/* Borda em degradê amarelo → roxo, como no Figma */}
        <div className="rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] bg-linear-to-br from-yellow to-purple p-px">
          <ul className="flex flex-col gap-8 rounded-tl-[5px] rounded-tr-[35px] rounded-br-[5px] rounded-bl-[35px] bg-background p-6 transition-colors sm:p-10">
            <li className="flex items-center gap-3">
              <IconBadge variant="purple" icon={<MapPin size={16} weight="fill" />} />
              <p className="text-base-text">
                Entrega em{' '}
                <strong>
                  {address.street}, {address.number}
                  {address.complement ? ` - ${address.complement}` : ''}
                </strong>
                <br />
                {address.district} - {address.city}, {address.uf}
              </p>
            </li>
            <li className="flex items-center gap-3">
              <IconBadge variant="yellow" icon={<Timer size={16} weight="fill" />} />
              <p className="text-base-text">
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </p>
            </li>
            <li className="flex items-center gap-3">
              <IconBadge variant="yellow-dark" icon={<CurrencyDollar size={16} />} />
              <p className="text-base-text">
                Pagamento na entrega
                <br />
                <strong>{paymentMethods[order.paymentMethod]}</strong>
              </p>
            </li>
          </ul>
        </div>

        <img
          src={deliveryIllustration}
          alt="Entregador em uma scooter roxa levando o pedido"
          className="mx-auto w-full max-w-[492px]"
          width={492}
          height={293}
        />
      </div>
    </main>
  )
}
