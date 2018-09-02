import React from 'react'
import PropTypes from 'prop-types'
import {
  formatCurrencyValue,
  formatDateFromNow
} from 'helpers/format'
import LargeNumber from 'components/shared/LargeNumber'
import CurrencyPercent from 'components/currency/CurrencyPercent'

const CurrencyDetailsContent = ({ currency }) => (
  <div>
    <div className="currency-details-header flex-sp-between">
      <div>
        <h1 className="my-10">
          <span>{currency.name}</span>
          <span className="short-name">({currency.symbol})</span>
        </h1>
        <span className="rank">Rank #{currency.rank}</span>
      </div>
      <div className="mt-10">
        <table className="table-min mt-10">
          <thead>
            <tr>
              <th>Last 1h</th>
              <th>Last 24h</th>
              <th>Last 7d</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CurrencyPercent percent={currency.quotes.USD.percent_change_1h} />
              </td>
              <td>
                <CurrencyPercent percent={currency.quotes.USD.percent_change_24h} />
              </td>
              <td>
                <CurrencyPercent percent={currency.quotes.USD.percent_change_7d} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div><div></div><div></div>
    </div>
    <div className="my-10">
      <h2>
        <span className="small">USD Value: </span> <span>{formatCurrencyValue(currency.quotes.USD.price)}</span>
      </h2>
    </div>
    <table className="table my-10">
      <thead>
        <tr>
          <th>Market Cap</th>
          <th>Volume (24h)</th>
          <th>Circulating Supply</th>
          <th>Max Supply</th>
          <th>Total Supply</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <LargeNumber
              textAfter="USD"
              number={currency.quotes.USD.market_cap}
            />
          </td>
          <td>
            <LargeNumber
              textAfter="USD"
              number={currency.quotes.USD.volume_24h}
            />
          </td>
          <td>
            <LargeNumber
              textAfter={currency.symbol}
              number={currency.circulating_supply}
            />
          </td>
          <td>
            <LargeNumber
              textAfter={currency.symbol}
              number={currency.max_supply}
            />
          </td>
          <td>
            <LargeNumber
              textAfter={currency.symbol}
              number={currency.total_supply}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <span>Last Updated: {formatDateFromNow(currency.last_updated * 1000)}</span>
    </div>
  </div>
)

CurrencyDetailsContent.propTypes = {
  currency: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
}

export default CurrencyDetailsContent
