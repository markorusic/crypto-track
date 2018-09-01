import Home from 'views/Home'
import CurrencyDetails from 'views/CurrencyDetails'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/currency/:id',
    component: CurrencyDetails
  }
]

export default routes
