import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatCurrencyValue } from 'helpers/format'
import UserCurrencyForm from 'components/currency/CurrencyList/UserCurrencyForm'
import CurrencyPercent from 'components/currency/CurrencyPercent'

class CurrencyListItem extends Component {

  onUserAmountSubmit = (amount) =>  {
    const { currency, onUserAmountSubmit } = this.props
    const { id, quotes } = currency
    onUserAmountSubmit({
      id,
      amount,
      currencyValue: quotes.USD.price
    })
  }

  render () {
    const { currency } = this.props
    const { id, name, symbol, quotes, lastValue, userData } = currency
    const lastUserCurrencyValue = userData.amount * lastValue
    const currentUserCurrencyValue = userData.amount * quotes.USD.price

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
            amount={userData.amount}
            onSubmit={this.onUserAmountSubmit}
          />
        </td>
        <td>{formatCurrencyValue(currentUserCurrencyValue)}</td>
        <td>{formatCurrencyValue(currentUserCurrencyValue - lastUserCurrencyValue)}</td>
      </tr>
    )
  }
}

CurrencyListItem.propTypes = {
  currency: PropTypes.object.isRequired,
  onUserAmountSubmit: PropTypes.func.isRequired
}

export default CurrencyListItem
