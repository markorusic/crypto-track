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
  syncWithLocalStorage (userCurrencies) {
    localStorage.setItem(USER_DATA_LC_KEY, JSON.stringify(userCurrencies))
  },
  saveCurrency ({ id, amount, currencyValue }) {
    const userCurrencies = this.getAllCurrencyData()
    userCurrencies[id] = { amount, currencyValue }
    this.syncWithLocalStorage(userCurrencies)
    return userCurrencies[id]
  },
  updateUserCurrencyValues (currencies) {
    const userCurrencies = this.getAllCurrencyData()
    for (const currencyId in userCurrencies) {
      const currency = currencies.find(currency => currency.id === Number(currencyId))
      if (currency) {
        userCurrencies[currencyId].lastCurrencyValue = currency.quotes.USD.price
      }
    }
    this.syncWithLocalStorage(userCurrencies)
  }
}
