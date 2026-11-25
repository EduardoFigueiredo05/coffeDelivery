import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/components/Header'
import { AddedToCartToast } from '@/components/AddedToCartToast'

export function DefaultLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <Outlet />
      <AddedToCartToast />
      <ScrollRestoration />
    </div>
  )
}
