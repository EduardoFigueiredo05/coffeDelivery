import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAddressByCep, type ViaCepAddress } from '@/services/viaCep'
import { isCompleteCep } from '@/utils/cep'

export type CepLookupStatus = 'idle' | 'loading' | 'success' | 'not-found'

/**
 * Busca de endereço pelo CEP (ViaCEP) reutilizada no checkout e no seletor de localização.
 * Cancela a requisição anterior quando um novo CEP é digitado ou quando o componente sai da tela.
 */
export function useCepLookup() {
  const [status, setStatus] = useState<CepLookupStatus>('idle')
  const [address, setAddress] = useState<ViaCepAddress | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  const reset = useCallback(() => {
    controllerRef.current?.abort()
    setStatus('idle')
    setAddress(null)
  }, [])

  const lookup = useCallback(async (cep: string) => {
    controllerRef.current?.abort()
    if (!isCompleteCep(cep)) {
      setStatus('idle')
      setAddress(null)
      return null
    }

    const controller = new AbortController()
    controllerRef.current = controller
    setStatus('loading')

    const result = await fetchAddressByCep(cep, controller.signal)
    if (controller.signal.aborted) return null

    setAddress(result)
    setStatus(result ? 'success' : 'not-found')
    return result
  }, [])

  return { status, address, lookup, reset }
}
