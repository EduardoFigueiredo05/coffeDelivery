export interface ViaCepAddress {
  street: string
  district: string
  city: string
  uf: string
}

interface ViaCepResponse {
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean | string
}

/**
 * Busca o endereço de um CEP na API pública ViaCEP.
 * Retorna null se o CEP não existir ou se a API falhar — o usuário pode digitar manualmente.
 */
export async function fetchAddressByCep(cep: string, signal?: AbortSignal): Promise<ViaCepAddress | null> {
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return null

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal })
    if (!response.ok) return null
    const data: ViaCepResponse = await response.json()
    if (data.erro) return null

    return {
      street: data.logradouro ?? '',
      district: data.bairro ?? '',
      city: data.localidade ?? '',
      uf: data.uf ?? '',
    }
  } catch {
    return null
  }
}
