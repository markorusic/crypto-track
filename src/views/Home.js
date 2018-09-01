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
    isLoading: false
  }

  componentWillMount () {
    this.toggleLoader()
    this.reloadData()
      .then(this.toggleLoader)
    this.currencyReloadInterval = setInterval(this.reloadData, REFRESH_INTERVAL_MS)
  }

  componentWillUnmount () {
    clearInterval(this.currencyReloadInterval)
  }

  reloadData = () => {
    return currencyService.fetchCurrencyData()
      .then(currencies => {
        this.setState({ currencies })
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
