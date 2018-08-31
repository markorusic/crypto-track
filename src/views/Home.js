import React, { Component } from 'react'
import { REFRESH_INTERVAL } from 'config/app'
import cryptoService from 'services/crypto'
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
    this.currencyReloadInterval = setInterval(this.reloadData, REFRESH_INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.currencyReloadInterval)
  }

  reloadData = () => {
    return cryptoService.fetchCurrencyData()
      .then(currencies => {
        this.setState({ currencies })
      })
  }

  toggleLoader = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading
    }))
  }

  onUserAmountSubmit = (data) => {
    const { id } = data
    cryptoService.addUserCurrency(data)
    this.setState(prevState => ({
      currencies: prevState.currencies.map(currency => {
        if (currency.id === id) {
          currency.userAmount = data.amount
        }
        return currency
      })
    }))
  }

  render () {
    const { currencies, isLoading }  = this.state

    return (
      <div>
        <CurrencyListWithLoading
          isLoading={isLoading}
          currencies={currencies}
          onUserAmountSubmit={this.onUserAmountSubmit}
        />
      </div>
    );
  }
}

export default App
