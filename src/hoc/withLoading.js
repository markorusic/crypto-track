import React from 'react'
import Loader from 'components/shared/Loader'

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return (
        <Component {...props}  />
      )
    }
    return (
      <Loader />
    )
  }
}

export default WithLoading
