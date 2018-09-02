import React, { Component } from 'react'
import { REFRESH_INTERVAL_MS } from 'config/app'
import currencyService from 'services/currency'
import userService from 'services/user'
import Container from 'components/shared/Container'
import CurrencyList from 'components/currency/CurrencyList'
import withLoading from 'hoc/withLoading'

const CurrencyListWithLoading = withLoading(CurrencyList)

class App extends Component {

  state = {
    currencies: [],
    lastCurrencyValues: userService.getAllCurrencyData(),
    isLoading: false
  }

  componentWillMount () {
    this.toggleLoader()
    this.reloadData()
      .then((currencies) => {
        this.toggleLoader()
        userService.updateUserCurrencyValues(currencies)
      })
    this.currencyReloadInterval = setInterval(this.reloadData, REFRESH_INTERVAL_MS)
  }

  componentWillUnmount () {
    clearInterval(this.currencyReloadInterval)
  }

  reloadData = () => {
    const { lastCurrencyValues } = this.state
    return currencyService.fetchCurrencyData()
      .then((currencies) => {
        currencies = currencies.map((curr) => {
          let lastValue = null
          if (lastCurrencyValues[curr.id]) {
            lastValue = lastCurrencyValues[curr.id].lastCurrencyValue
          }
          curr.lastValue = lastValue
          return curr
        })
        this.setState({ currencies })
        return currencies
      })
  }

  toggleLoader = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading
    }))
  }

  onUserAmountSubmit = ({ id, amount, currencyValue }) => {
    const userCurrencyData = userService.saveCurrency({ id, amount, currencyValue })
    this.setState(prevState => ({
      currencies: prevState.currencies.map(currency => {
        if (currency.id === id) {
          currency.userData = userCurrencyData
        }
        return currency
      })
    }))
  }

  render () {
    const { currencies, isLoading }  = this.state

    return (
      <Container>
        <CurrencyListWithLoading
          isLoading={isLoading}
          currencies={currencies}
          onUserAmountSubmit={this.onUserAmountSubmit}
        />
      </Container>
    )
  }
}

export default App
