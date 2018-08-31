import React from 'react'

const CurrencyDetails = ({ match }) => (
  <div>
    <h1>{match.params.id}</h1>
  </div>
)

export default CurrencyDetails
