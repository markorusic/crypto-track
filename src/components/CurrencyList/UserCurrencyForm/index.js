import React, { Component } from 'react'

export default class UserCurrencyForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      amount: props.amount || ''
    }
  }

  onAmountChange = (event) => {
    this.setState({
      amount: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { amount } = this.state
    const isValidAmount = this.isValidAmount()
    if (isValidAmount) {
      this.props.onSubmit(amount)
      this.setState({ amount: '' })
    }
  }

  isValidAmount = () => {
    const regexp = /^[0-9]+([,.][0-9]+)?$/g
    return regexp.test(this.state.amount)
  }

  render () {
    const { amount } = this.state
    const disableSubmit = !this.isValidAmount()
    return (
      <form onSubmit={this.onSubmit} className="user-currency-form">
        <div>
          <input
            type="text"
            value={amount}
            onChange={this.onAmountChange}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}
