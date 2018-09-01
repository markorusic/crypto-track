import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from 'routes'

export default class App extends Component {
  render() {
    const routeComponents = routes
      .map(({ path, component }, key) => (
        <Route
          exact
          path={path}
          component={component}
          key={key}
        />
      ))
    return (
      <BrowserRouter>
        <Switch>
          {routeComponents}
        </Switch>
      </BrowserRouter>
    )
  }
}
