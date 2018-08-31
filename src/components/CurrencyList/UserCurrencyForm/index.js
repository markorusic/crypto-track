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

  onSubmit = () => {
    this.props.onSubmit(this.state.amount)
  }

  render () {
    const { disableSubmit } = this.props;
    const { amount } = this.state;
    return (
      <div className="user-currency-form">
        <div>
          <input
            type="text"
            value={amount}
            onChange={this.onAmountChange}
          />
        </div>
        <div>
          <button
            onClick={this.onSubmit}
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}
