import React, { Component } from 'react'
import Container from 'components/shared/Container'
import CurrencyDetailsContent from 'components/currency/CurrencyDetailsContent'
import withLoading from 'hoc/withLoading'
import currencyServiceApi from 'services/currency/api'

const CurrencyDetailsContentWithLoading = withLoading(CurrencyDetailsContent)

export default class CurrencyDetails extends Component {

  state = {
    currency: null,
    isLoading: false
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.toggleLoader()
    currencyServiceApi.fetchDataById(id)
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
      <Container>
        <CurrencyDetailsContentWithLoading
          isLoading={isLoading}
          currency={currency}
        />
      </Container>
    )
  }
}
