import React from 'react'
import {
  formatCurrencyValue,
  formatDateFromNow
} from 'helpers/format'
import LargeNumber from 'components/shared/LargeNumber'
import CurrencyPercent from 'components/currency/CurrencyPercent'

export default ({ currency }) => (
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
