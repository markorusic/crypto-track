import { USER_DATA_LC_KEY } from 'config/app'

const DEFAULT_USER_CURRENCY = {
  amount: 0,
  lastCurrencyValue: null
}

export default {
  getAllCurrencyData () {
    return JSON.parse(
      localStorage.getItem(USER_DATA_LC_KEY)
    ) || {}
  },
  getCurrencyData (id) {
    return this.getAllCurrencyData()[id] || DEFAULT_USER_CURRENCY
  },
  saveCurrency ({ id, amount, currencyValue }) {
    const userData = this.getAllCurrencyData()
    userData[id] = { amount, lastCurrencyValue: currencyValue }
    this.syncWithLocalStorage(userData)
    return userData[id]
  },
  syncWithLocalStorage (data) {
    localStorage.setItem(USER_DATA_LC_KEY, JSON.stringify(data))
  }
}
