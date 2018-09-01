import api from './api'
import userService from 'services/user'

export default {
  fetchCurrencyData () {
    return api.fetchData()
      .then((data) => {
        const currencies = Object.values(data)
        return currencies
          .map((currnecy) => ({
            ...currnecy,
            userData: userService.getCurrencyData(currnecy.id)
          }))
      })
  }
}
