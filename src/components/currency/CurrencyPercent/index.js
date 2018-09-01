import React from 'react'
import PropTypes from 'prop-types'
import { formatCurrencyPercent } from 'helpers/format'

const CurrencyPercent = ({ percent }) => {
  const currencyPercentClass = percent >= 0 ? 'green' : 'red'
  return (
    <span className={'text-' + currencyPercentClass}>
      {formatCurrencyPercent(percent)}
    </span>
  )
}

CurrencyPercent.propTypes = {
  percent: PropTypes.number.isRequired
}

export default CurrencyPercent
