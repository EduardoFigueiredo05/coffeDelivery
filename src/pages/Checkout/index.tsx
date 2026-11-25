import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { checkoutSchema, type CheckoutFormData } from '@/schemas/checkout'
import { useCart } from '@/hooks/useCart'
import { useDeliveryLocation } from '@/hooks/useDeliveryLocation'
import { AddressForm } from './components/AddressForm'
import { PaymentOptions } from './components/PaymentOptions'
import { OrderSummary } from './components/OrderSummary'

export function Checkout() {
  const { checkout } = useCart()
  const { location } = useDeliveryLocation()
  const navigate = useNavigate()

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    // A localização escolhida no header já chega preenchida.
    defaultValues: {
      cep: location?.cep ?? '',
      street: location?.street ?? '',
      number: '',
      complement: '',
      district: location?.district ?? '',
      city: location?.city ?? '',
      uf: location?.uf ?? '',
    },
  })

  function handleConfirmOrder(data: CheckoutFormData) {
    const order = checkout(data)
    if (order) navigate('/success')
  }

  return (
    <main className="mx-auto max-w-[1120px] px-5 pt-4 pb-20 md:pt-10 xl:px-0">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleConfirmOrder)}
          noValidate
          className="grid gap-8 lg:grid-cols-[minmax(0,640px)_minmax(0,448px)]"
        >
          <section className="flex flex-col gap-3" aria-labelledby="checkout-title">
            <h2 id="checkout-title" className="mb-3 font-title text-lg font-bold text-base-subtitle">
              Complete seu pedido
            </h2>
            <AddressForm />
            <PaymentOptions />
          </section>

          <section aria-labelledby="summary-title">
            <h2 id="summary-title" className="mb-6 font-title text-lg font-bold text-base-subtitle">
              Cafés selecionados
            </h2>
            <OrderSummary isSubmitting={form.formState.isSubmitting} />
          </section>
        </form>
      </FormProvider>
    </main>
  )
}
