import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { MapPinLine } from '@phosphor-icons/react'
import { Input } from '@/components/Input'
import { SectionCard } from '@/components/SectionCard'
import type { CheckoutFormData } from '@/schemas/checkout'
import { useCepLookup } from '@/hooks/useCepLookup'
import { useDeliveryLocation } from '@/hooks/useDeliveryLocation'
import { maskCep } from '@/utils/cep'

export function AddressForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()
  const { status, lookup } = useCepLookup()
  const { location } = useDeliveryLocation()

  // Se a localização mudar pelo header com o checkout aberto, o formulário acompanha.
  useEffect(() => {
    if (!location) return
    const { cep, street, district, city, uf } = location
    const entries = { cep, street, district, city, uf }
    for (const [field, value] of Object.entries(entries)) {
      if (value) setValue(field as keyof typeof entries, value)
    }
  }, [location, setValue])

  /** Autopreenchimento com a API ViaCEP quando o CEP fica completo. */
  async function lookupCep(cep: string) {
    const address = await lookup(cep)
    if (!address) return

    const options = { shouldValidate: true, shouldDirty: true }
    if (address.street) setValue('street', address.street, options)
    if (address.district) setValue('district', address.district, options)
    if (address.city) setValue('city', address.city, options)
    if (address.uf) setValue('uf', address.uf, options)
  }

  const cepField = register('cep')

  return (
    <SectionCard
      icon={<MapPinLine size={22} className="text-yellow-dark" />}
      title="Endereço de Entrega"
      subtitle="Informe o endereço onde deseja receber seu pedido"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr_60px]">
        <div className="sm:col-span-3">
          <Input
            label="CEP"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            containerClassName="sm:w-[200px]"
            error={errors.cep?.message}
            {...cepField}
            onChange={(event) => {
              event.target.value = maskCep(event.target.value)
              void lookupCep(event.target.value)
              return cepField.onChange(event)
            }}
          />
          {status === 'loading' && (
            <p className="mt-1 text-xs text-base-label" aria-live="polite">
              Buscando endereço…
            </p>
          )}
          {status === 'not-found' && (
            <p className="mt-1 text-xs text-base-label" aria-live="polite">
              CEP não encontrado — preencha o endereço manualmente.
            </p>
          )}
        </div>

        <Input
          label="Rua"
          autoComplete="address-line1"
          containerClassName="sm:col-span-3"
          error={errors.street?.message}
          {...register('street')}
        />

        <Input label="Número" inputMode="numeric" error={errors.number?.message} {...register('number')} />
        <Input
          label="Complemento"
          optional
          autoComplete="address-line2"
          containerClassName="sm:col-span-2"
          error={errors.complement?.message}
          {...register('complement')}
        />

        <Input label="Bairro" error={errors.district?.message} {...register('district')} />
        <Input
          label="Cidade"
          autoComplete="address-level2"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="UF"
          maxLength={2}
          autoComplete="address-level1"
          className="w-full min-w-0 bg-transparent p-3 text-sm text-base-text uppercase outline-none placeholder:text-base-label placeholder:normal-case"
          error={errors.uf?.message}
          {...register('uf')}
        />
      </div>
    </SectionCard>
  )
}
