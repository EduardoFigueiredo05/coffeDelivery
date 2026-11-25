import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import { SectionCard } from '@/components/SectionCard'
import { paymentMethods, type CheckoutFormData, type PaymentMethod } from '@/schemas/checkout'

const icons: Record<PaymentMethod, ReactNode> = {
  credit: <CreditCard size={16} />,
  debit: <Bank size={16} />,
  cash: <Money size={16} />,
}

export function PaymentOptions() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  return (
    <SectionCard
      icon={<CurrencyDollar size={22} className="text-purple" />}
      title="Pagamento"
      subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
    >
      <fieldset>
        <legend className="sr-only">Forma de pagamento</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(paymentMethods) as PaymentMethod[]).map((method) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-transparent bg-base-button p-4 text-xs text-base-text uppercase transition-colors hover:bg-base-hover has-checked:border-purple has-checked:bg-purple-light has-focus-visible:outline-2 has-focus-visible:outline-yellow-dark"
            >
              <input
                type="radio"
                value={method}
                className="sr-only"
                {...register('paymentMethod')}
              />
              <span className="text-purple" aria-hidden>
                {icons[method]}
              </span>
              {paymentMethods[method]}
            </label>
          ))}
        </div>
      </fieldset>
      {errors.paymentMethod && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {errors.paymentMethod.message}
        </p>
      )}
    </SectionCard>
  )
}
