import React from 'react'
import CurrencyListItem from './CurrencyListItem'

export default ({ currencies = [] }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Short Name</th>
        <th>$ Value</th>
        <th>last 24h</th>
        <th>Amount you own</th>
        <th>$ value of your coin</th>
      </tr>
    </thead>
    <tbody>
      {
        currencies
          .map(currency =>
            <CurrencyListItem
              key={currency.id}
              currency={currency}
            />
          )
      }
    </tbody>
  </table>
)
