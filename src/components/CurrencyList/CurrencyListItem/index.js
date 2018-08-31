import React, { Component } from 'react'
import {
  formatCurrencyValue,
  formatCurrencyPercent
} from 'helpers/format'
import UserCurrencyForm from 'components/CurrencyList/UserCurrencyForm'

export default class CurrencyListItem extends Component {

  onUserAmountSubmit = (amount) =>  {
    const { currency, onUserAmountSubmit } = this.props
    const { id } = currency
    onUserAmountSubmit({
      id,
      amount
    })
  }

  render () {
    const { currency } = this.props
    const { id, name, symbol, quotes, userAmount } = currency
    const currencyPercentClass = quotes.USD.percent_change_24h > 0 ? 'green' : 'red'

    return (
      <tr className="currency-list-item">
        <td>
          <a href={'/currency' + id}>
            {name}
          </a>
        </td>
        <td>{symbol}</td>
        <td>{formatCurrencyValue(quotes.USD.price)}</td>
        <td className={'text-' + currencyPercentClass}>
          {formatCurrencyPercent(quotes.USD.percent_change_24h)}
        </td>
        <td>
          <UserCurrencyForm
            onSubmit={this.onUserAmountSubmit}
          />
        </td>
        <td>{formatCurrencyValue(userAmount)}</td>
      </tr>
    )
  }
}
