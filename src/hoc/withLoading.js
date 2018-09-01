import React from 'react'
import Loader from 'components/shared/Loader'

const withLoading = (Component) => ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <Loader />
      
    )
  }
  return (
    <Component {...props} />
  )
}

export default withLoading
