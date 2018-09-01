import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrencyValue } from 'helpers/format'
import UserCurrencyForm from 'components/currency/CurrencyList/UserCurrencyForm'
import CurrencyPercent from 'components/currency/CurrencyPercent'

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

    return (
      <tr className="currency-list-item">
        <td>
          <Link to={'/currency/' + id}>
            {name}
          </Link>
        </td>
        <td>{symbol}</td>
        <td>{formatCurrencyValue(quotes.USD.price)}</td>
        <td>
          <CurrencyPercent percent={quotes.USD.percent_change_24h} />
        </td>
        <td>
          <UserCurrencyForm
            amount={userAmount}
            onSubmit={this.onUserAmountSubmit}
          />
        </td>
        <td>{formatCurrencyValue(userAmount * quotes.USD.price)}</td>
      </tr>
    )
  }
}
