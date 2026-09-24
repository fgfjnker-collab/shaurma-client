import { createBrowserRouter, createHashRouter, type RouteObject } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CatalogPage } from './pages/CatalogPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HelpPage } from './pages/HelpPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'help', element: <HelpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

// Для статического хостинга без настройки сервера используется hash-роутинг (см. .env.static)
const createRouter = import.meta.env.VITE_ROUTER_MODE === 'hash' ? createHashRouter : createBrowserRouter

export const router = createRouter(routes)
