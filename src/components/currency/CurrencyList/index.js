import React, { Component } from 'react'
import { TOTAL_CURRENCIES_PER_PAGE } from 'config/app'
import Pagination from 'components/shared/Pagination'
import CurrencyListItem from './CurrencyListItem'

export default class CurrencyList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      currentPage: 1,
    }

  }

  getCurrenciesToShow = () => {
    const { currencies } = this.props
    const { currentPage } = this.state
    const offset = (currentPage - 1) * TOTAL_CURRENCIES_PER_PAGE
    return currencies.slice(offset, offset + TOTAL_CURRENCIES_PER_PAGE)
  }

  goToPage = (page) => {
    this.setState({ currentPage: page })
  }

  render () {
    const { currencies, onUserAmountSubmit } = this.props
    const { currentPage } = this.state
    const totalItems = currencies.length
    const currenciesToShow = this.getCurrenciesToShow()

    return (
      <div>
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
              currenciesToShow
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
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          perPage={TOTAL_CURRENCIES_PER_PAGE}
          onPageClick={this.goToPage}
          pageNeighbours={3}
          itemType="Currencies"
        />
      </div>
    )
  }
}
