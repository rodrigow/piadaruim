import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import BadJoke from './BadJoke'


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={BadJoke} />
        </Switch>
      </Router>
    )
  }
}

export default App
