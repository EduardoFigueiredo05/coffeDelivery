import { Navigate, createBrowserRouter, type RouteObject } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { Home } from '@/pages/Home'

/**
 * Checkout e Success são carregados sob demanda (code splitting):
 * a home abre mais rápido e o formulário (React Hook Form + Zod) só baixa quando necessário.
 * Exportado separadamente para os testes usarem com createMemoryRouter.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'checkout',
        lazy: async () => ({ Component: (await import('@/pages/Checkout')).Checkout }),
      },
      {
        path: 'success',
        lazy: async () => ({ Component: (await import('@/pages/Success')).Success }),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
