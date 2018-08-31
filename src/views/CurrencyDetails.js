import React, { Component } from 'react'
import {
  formatCurrencyValue,
  formatDateFromNow
} from 'helpers/format'
import LargeNumber from 'components/shared/LargeNumber'
import CurrencyPercent from 'components/currency/CurrencyPercent'
import Loader from 'components/shared/Loader'
import cryptoServiceApi from 'services/crypto/api'

export default class CurrencyDetails extends Component {

  state = {
    currency: null,
    showLoader: false
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.toggleLoader()
    cryptoServiceApi.fetchDataById(id)
      .then(data => {
        this.setState({ currency: data })
        this.toggleLoader()
      })
  }

  toggleLoader = () => {
    this.setState(prevState => ({
      showLoader: !prevState.showLoader
    }))
  }

  render () {
    const { currency, showLoader } = this.state

    if (showLoader) {
      return (
        <Loader />
      )
    }

    return (
      <div>
        <h1>{currency.name}({currency.symbol}) #{currency.rank}</h1>
        <p>Last Updated: {formatDateFromNow(currency.last_updated * 1000)}</p>
        <div className="currency-details">
          <p>Value: {formatCurrencyValue(currency.quotes.USD.price)}</p>
          <p>
            Last 1h: <CurrencyPercent percent={currency.quotes.USD.percent_change_1h} />
          </p>
          <p>
            Last 24h: <CurrencyPercent percent={currency.quotes.USD.percent_change_24h} />
          </p>
          <p>
            Last 7d: <CurrencyPercent percent={currency.quotes.USD.percent_change_7d} />
          </p>
          <p>
            <LargeNumber
              textBefore="Market Cap: $"
              textAfter="USD"
              number={currency.quotes.USD.market_cap}
            />
          </p>
          <p>
            <LargeNumber
              textBefore="Circulating Supply:"
              textAfter={currency.symbol}
              number={currency.circulating_supply}
            />
          </p>
          <p>
            <LargeNumber
              textBefore="Total Supply:"
              textAfter={currency.symbol}
              number={currency.total}
            />
          </p>
          <p>
            <LargeNumber
              textBefore="Max Supply:"
              textAfter={currency.symbol}
              number={currency.max_supply}
            />
          </p>
        </div>
      </div>
    )
  }
}
