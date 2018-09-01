import React from 'react'
import PropTypes from 'prop-types'
import { formatLargeNumber } from 'helpers/format'

const LargeNumber = ({ number, textBefore, textAfter }) => {

  if (!number) {
    return (
      <span>{textBefore} No information</span>
    )
  }

  return (
    <span>{textBefore} {formatLargeNumber(number)} {textAfter}</span>
  )
}

LargeNumber.propTypes = {
  number: PropTypes.number.isRequired,
  textBefore: PropTypes.string,
  textAfter: PropTypes.string
}

export default LargeNumber