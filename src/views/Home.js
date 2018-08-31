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
    return cryptoService.api.fetchData()
      .then(({ data }) => {
        const currencies = Object.values(data)
        this.setState({ currencies })
      })
  }

  toggleLoader = () => {
    this.setState(prevState => ({
      showLoader: !prevState.showLoader
    }))
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
        />
      </div>
    );
  }
}

export default App
