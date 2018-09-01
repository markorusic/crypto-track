import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserCurrencyForm extends Component {

  constructor (props) {
    super(props)
    const { amount = '' } = props
    this.state = {
      amount
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
            className="text-center"
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

UserCurrencyForm.propTypes = {
  amount: PropTypes.any,
  onSubmit: PropTypes.func.isRequired
}

export default UserCurrencyForm
