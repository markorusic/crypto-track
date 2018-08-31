import { TOTAL_CURRENCIES_SHOWN, USER_DATA_LC_KEY } from 'config/app'
import api from './api'

export default {
  fetchCurrencyData () {
    return api.fetchData()
      .then(({ data }) => {
        const currencies = Object.values(data)
        const userCurrencies = this.getUserCurrencyData()
        return currencies
          .slice(0, TOTAL_CURRENCIES_SHOWN)
          .map(currnecy => {
            return {
              ...currnecy,
              userAmount: userCurrencies[currnecy.id] || 0
            }
          })
      })
  },
  getUserCurrencyData () {
    return JSON.parse(
      localStorage.getItem(USER_DATA_LC_KEY)
    ) || {}
  },
  updateUserCurrencyData (data) {
    localStorage.setItem(USER_DATA_LC_KEY, JSON.stringify(data))
  },
  addUserCurrency ({ id, amount }) {
    const userCurrencies = this.getUserCurrencyData()
    userCurrencies[id] = amount
    this.updateUserCurrencyData(userCurrencies)
  },
}
