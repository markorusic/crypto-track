import React, { Component } from 'react'
import { REFRESH_INTERVAL } from 'config/app'
import cryptoService from 'services/crypto'
import Loader from 'components/shared/Loader'
import CurrencyList from 'components/CurrencyList'


class App extends Component {

  state = {
    currencies: [],
    showLoader: false
  }

  componentWillMount () {
    this.toggleLoader()
    this.reloadData()
      .then(this.toggleLoader)
    setInterval(this.reloadData, REFRESH_INTERVAL)
  }

  reloadData = () => {
    return cryptoService.fetchCurrencyData()
      .then(currencies => {
        this.setState({ currencies })
      })
  }

  toggleLoader = () => {
    this.setState(prevState => ({
      showLoader: !prevState.showLoader
    }))
  }

  onUserAmountSubmit = (data) => {
    cryptoService.addUserCurrency(data)
  }

  render () {
    const { currencies, showLoader }  = this.state

    if (showLoader) {
      return (
        <Loader />
      )
    }

    return (
      <div>
        <CurrencyList
          currencies={currencies}
          onUserAmountSubmit={this.onUserAmountSubmit}
        />
      </div>
    );
  }
}

export default App
