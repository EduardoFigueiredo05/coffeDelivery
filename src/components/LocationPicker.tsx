import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { CaretDown, CircleNotch, MagnifyingGlass, MapPin, MapPinLine, X } from '@phosphor-icons/react'
import { useCepLookup } from '@/hooks/useCepLookup'
import { useDeliveryLocation } from '@/hooks/useDeliveryLocation'
import { maskCep } from '@/utils/cep'

interface LocationPickerProps {
  /** Texto exibido no botão (cidade, UF) */
  label: string
}

/**
 * Botão de localização do header + mini modal para trocar a localização pelo CEP.
 * Fecha com Esc, clique fora ou ao confirmar; o foco volta para o botão.
 */
export function LocationPicker({ label }: LocationPickerProps) {
  const { location, setLocation, clearLocation } = useDeliveryLocation()
  const { status, address, lookup, reset } = useCepLookup()
  const [isOpen, setIsOpen] = useState(false)
  const [cep, setCep] = useState('')

  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogId = useId()
  const titleId = useId()

  function open() {
    setCep(location?.cep ?? '')
    reset()
    setIsOpen(true)
  }

  function close({ restoreFocus = true } = {}) {
    setIsOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  // Esc e clique fora fecham o modal.
  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      // Clique fora do modal (inclui o fundo escurecido do mobile); o botão tem o próprio toggle.
      if (!dialogRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  function handleCepChange(value: string) {
    const masked = maskCep(value)
    setCep(masked)
    void lookup(masked)
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    void lookup(cep)
  }

  function handleConfirm() {
    if (!address) return
    setLocation({ cep, ...address })
    close()
  }

  function handleReset() {
    clearLocation()
    close()
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (isOpen ? close() : open())}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? dialogId : undefined}
        aria-label={`Alterar localização: ${label}`}
        title="Alterar localização"
        className="flex cursor-pointer items-center gap-1 rounded-md bg-purple-light p-2 text-sm text-purple-dark transition-colors hover:brightness-95 aria-expanded:ring-2 aria-expanded:ring-purple/40"
      >
        <MapPin size={22} weight="fill" className="shrink-0 text-purple" aria-hidden />
        <span className="max-w-[160px] truncate max-[479px]:sr-only">{label}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`shrink-0 transition-transform max-[479px]:hidden ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <>
          {/* Fundo escurecido só no mobile (o header não usa backdrop-filter para o `fixed` cobrir a tela toda) */}
          <div className="fixed inset-0 z-30 bg-base-title/30 backdrop-blur-[1px] sm:hidden" aria-hidden />

          <div
            ref={dialogRef}
            id={dialogId}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            className="z-40 animate-popover-in rounded-tl-md rounded-tr-[28px] rounded-br-md rounded-bl-[28px] border border-base-button bg-base-card p-6 shadow-[0_20px_48px_-16px_rgb(0_0_0/0.3)] transition-colors max-sm:fixed max-sm:inset-x-4 max-sm:top-24 sm:absolute sm:top-[calc(100%+12px)] sm:right-0 sm:w-[360px] sm:origin-top-right"
          >
            <header className="flex items-start gap-2">
              <MapPinLine size={22} className="shrink-0 text-yellow-dark" aria-hidden />
              <div className="flex-1">
                <h2 id={titleId} className="font-title text-lg leading-tight font-bold text-base-subtitle">
                  Onde você está?
                </h2>
                <p className="mt-1 text-sm text-base-text">
                  Informe seu CEP para receber seu café fresquinho
                </p>
              </div>
              <button
                type="button"
                onClick={() => close()}
                aria-label="Fechar"
                className="cursor-pointer rounded p-1 text-base-label transition-colors hover:text-base-text"
              >
                <X size={16} weight="bold" aria-hidden />
              </button>
            </header>

            <form onSubmit={handleSearch} className="mt-5">
              <label htmlFor={`${dialogId}-cep`} className="sr-only">
                CEP
              </label>
              <div
                className={`flex items-center rounded border bg-base-input transition-colors focus-within:border-yellow-dark ${
                  status === 'not-found' ? 'border-danger' : 'border-base-button'
                }`}
              >
                <input
                  ref={inputRef}
                  id={`${dialogId}-cep`}
                  value={cep}
                  onChange={(event) => handleCepChange(event.target.value)}
                  placeholder="00000-000"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={9}
                  className="w-full min-w-0 bg-transparent p-3 text-sm tracking-wide text-base-text outline-none placeholder:text-base-label"
                />
                <button
                  type="submit"
                  aria-label="Buscar CEP"
                  className="mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-purple transition-colors hover:bg-purple-light"
                >
                  {status === 'loading' ? (
                    <CircleNotch size={18} className="animate-spin" aria-hidden />
                  ) : (
                    <MagnifyingGlass size={18} weight="bold" aria-hidden />
                  )}
                </button>
              </div>
            </form>

            <div aria-live="polite" className="mt-3 min-h-5 text-sm">
              {status === 'loading' && <p className="text-base-label">Buscando endereço…</p>}
              {status === 'not-found' && (
                <p role="alert" className="text-danger">
                  CEP não encontrado. Confira os números.
                </p>
              )}
              {status === 'success' && address && (
                <div className="flex animate-popover-in items-start gap-3 rounded-md bg-purple-light p-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple text-white">
                    <MapPin size={14} weight="fill" aria-hidden />
                  </span>
                  <p className="text-base-text">
                    {address.street && <strong className="block text-base-subtitle">{address.street}</strong>}
                    {address.district && `${address.district} · `}
                    {address.city} - {address.uf}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={status !== 'success'}
              className="mt-4 w-full cursor-pointer rounded-md bg-yellow px-2 py-3 text-sm font-bold text-white uppercase transition-colors hover:bg-yellow-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Usar este endereço
            </button>

            {location && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 w-full cursor-pointer text-center text-xs text-base-label underline-offset-4 transition-colors hover:text-purple hover:underline"
              >
                Remover localização salva
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
