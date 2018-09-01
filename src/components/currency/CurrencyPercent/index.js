import React from 'react'
import { formatCurrencyPercent } from 'helpers/format'

export default ({ percent }) => {
  const currencyPercentClass = percent >= 0 ? 'green' : 'red'
  return (
    <span className={'text-' + currencyPercentClass}>
      {formatCurrencyPercent(percent)}
    </span>
  )
}
