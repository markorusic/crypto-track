import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrencyListItem from './CurrencyListItem'

class CurrencyList extends Component {

  render() {
    const { currencies, onUserAmountSubmit } = this.props

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Short Name</th>
              <th>$ Value</th>
              <th>last 24h</th>
              <th>Amount you own</th>
              <th>$ value of your coin</th>
              <th>$ profit/loss since last visit</th>
            </tr>
          </thead>
          <tbody>
            {
              currencies
                .map(currency =>
                  <CurrencyListItem
                    key={currency.id}
                    currency={currency}
                    onUserAmountSubmit={onUserAmountSubmit}
                  />
                )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

CurrencyList.propTypes = {
  currencies: PropTypes.array.isRequired,
  onUserAmountSubmit: PropTypes.func.isRequired
}

export default CurrencyList
