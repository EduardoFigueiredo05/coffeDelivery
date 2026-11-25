import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface DeliveryLocation {
  cep: string
  street: string
  district: string
  city: string
  uf: string
}

export const LOCATION_STORAGE_KEY = '@coffee-delivery:location-1.0.0'

interface LocationContextData {
  location: DeliveryLocation | null
  setLocation: (location: DeliveryLocation) => void
  clearLocation: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const LocationContext = createContext<LocationContextData | null>(null)

function loadLocation(): DeliveryLocation | null {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DeliveryLocation
    return parsed?.city && parsed?.uf && parsed?.cep ? parsed : null
  } catch {
    return null
  }
}

/** Localização de entrega escolhida no header. Também pré-preenche o checkout. */
export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<DeliveryLocation | null>(loadLocation)

  useEffect(() => {
    try {
      if (location) localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location))
      else localStorage.removeItem(LOCATION_STORAGE_KEY)
    } catch {
      // storage indisponível: a localização vale só para esta sessão
    }
  }, [location])

  const setLocation = useCallback((value: DeliveryLocation) => setLocationState(value), [])
  const clearLocation = useCallback(() => setLocationState(null), [])

  const value = useMemo(
    () => ({ location, setLocation, clearLocation }),
    [location, setLocation, clearLocation],
  )

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
