import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children }) => (
  <div className="page-container">
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.element.isRequired
}

export default Container
