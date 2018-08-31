import React, { Component } from 'react'
import CurrencyDetailsContent from 'components/currency/CurrencyDetailsContent'
import withLoading from 'hoc/withLoading'
import cryptoServiceApi from 'services/crypto/api'

const CurrencyDetailsContentWithLoading = withLoading(CurrencyDetailsContent)

export default class CurrencyDetails extends Component {

  state = {
    currency: null,
    isLoading: false
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
      isLoading: !prevState.isLoading
    }))
  }

  render () {
    const { currency, isLoading } = this.state

    return (
      <div>
        <CurrencyDetailsContentWithLoading
          isLoading={isLoading}
          currency={currency}
        />
      </div>
    )
  }
}
