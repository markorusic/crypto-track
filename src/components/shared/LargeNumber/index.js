import React from 'react'
import { formatLargeNumber } from 'helpers/format'

export default ({ number, textBefore, textAfter }) => {

  if (!number) {
    return (
      <span>{textBefore} No information</span>
    )
  }

  return (
    <span>{textBefore} {formatLargeNumber(number)} {textAfter}</span>
  )
}
