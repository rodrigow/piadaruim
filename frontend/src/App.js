import React, { Component } from 'react';
import './App.css';
import { BadJokeService }  from './services/BadJokeService'

class App extends Component {

  state = {
    joke: ''
  }

  componentDidMount() {
    BadJokeService().then(result => {
      if (result.ok) {
        console.log(result)
        this.setState({joke: result.joke})
      } else {
        console.log(result)
      }
    }).catch(e => {
        console.log(e)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Piada Ruim do Dia!
          </p>
        </header>
        <div className="joke">
          <p id="badjoke">{this.state.joke}</p>
        </div>
      </div>
    );
  }
}

export default App;
