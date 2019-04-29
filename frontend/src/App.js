import React, { Component } from 'react';
import './App.css';
import { BadJokeService }  from './services/BadJokeService'

class App extends Component {

  state = {
    joke: {}
  }

  componentDidMount() {
    BadJokeService().then(result => {
      if (result.ok) {
        this.setState({joke: result.joke})
      } else {
        this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
      }
    }).catch(e => {
        console.log(e)
        this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
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
          <p id="badjoke">{this.state.joke.text}</p>
        </div>
      </div>
    );
  }
}

export default App;
