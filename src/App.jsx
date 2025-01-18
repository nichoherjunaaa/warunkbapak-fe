import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutView from './pages/AboutView'
import HomeView from './pages/HomeView'
import CartView from './pages/CartView'
import OrderView from './pages/OrderView'
import ProductView from './pages/ProductView'
import LoginView from './pages/auth/LoginView'
import RegisterView from './pages/auth/RegisterView'
import PublicLayout from './layouts/PublicLayout'
import DetailProduct from './pages/DetailProduct'
import CheckoutView from './pages/CheckoutView'
// loader
import { loader as HomeLoader } from './pages/HomeView'
import { loader as ProductLoader } from './pages/ProductView'

// action
import { action as LoginAction } from './pages/auth/LoginView'
import { action as RegisterAction } from './pages/auth/RegisterView'

// storage
import {store} from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: 'products',
        element: <ProductView />,
        loader: ProductLoader,
      },
      {
        path: 'product/detail/:id',
        element: <DetailProduct/>,
      },
      {
        path: 'orders',
        element: <OrderView />,
      },
      {
        path : 'checkout',
        element: <CheckoutView />,
      },
      {
        path: 'cart',
        element: <CartView />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: '/register',
    element: <RegisterView />,
    action: RegisterAction(store),
  },
])
function App() {
  return (
    <RouterProvider router ={router} />
  )
}

export default App
