import React from 'react'

export default ({ currency }) => {
  const { id, name, symbol, quotes } = currency
  return (
    <tr className="currency-list-item">
      <td>
        <a href={'/currency' + id}>
          {name}
        </a>
      </td>
      <td>{symbol}</td>
      <td>${Math.round(quotes.USD.price * 100) / 100}</td>
      <td>{quotes.USD.percent_change_24h}%</td>
      <td>
        input
      </td>
      <td>test</td>
    </tr>
  )
}
