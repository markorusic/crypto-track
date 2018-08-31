import React, { Component } from 'react'
import { REFRESH_INTERVAL } from 'config/app'
import cryptoService from 'services/crypto'


class App extends Component {

  state = {
    listings: []
  }

  componentWillMount () {
    this.reloadData()
    setInterval(this.reloadData, REFRESH_INTERVAL)
  }

  reloadData = () => {
    cryptoService.api.fetchData()
      .then(({ data }) => {
        this.setState({ listings: data })
      })
  }

  render () {
    const { listings }  = this.state
    return (
      <div>
        {
          listings.map(({ id, name }, index) => (
            <p key={id}>
              {index + 1}. {name}
            </p>
          ))
        }
      </div>
    );
  }
}

export default App
