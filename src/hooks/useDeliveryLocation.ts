import { useContext } from 'react'
import { LocationContext } from '@/contexts/LocationContext'

/** (O nome evita conflito com o useLocation do React Router.) */
export function useDeliveryLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useDeliveryLocation precisa ser usado dentro de <LocationProvider>')
  }
  return context
}
