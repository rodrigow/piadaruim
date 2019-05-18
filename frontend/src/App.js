import React, { Component } from 'react';
import './App.css';
import { BadJokeService }  from './services/BadJokeService'

class App extends Component {

  state = {
    joke: {}
  }

  // Array to store id of jokes already read
  jokesAlreadyRead = []


  // Extracting call to BadJokeService to a method for reuse it
  callBadJokeService() {
    BadJokeService().then(result => {
      if (result.ok) {
        this.setState({joke: result.joke})
        // TODO add check if already read joke
        
        this.jokesAlreadyRead.push(result.joke.id)
        console.log("this.alreadyReadJokes: " + this.jokesAlreadyRead)
      } else {
        this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
      }
    }).catch(e => {
        console.log(e)
        this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
    })
  }

  componentDidMount() {
    this.callBadJokeService()
  }

  nextJoke(e) {
    e.preventDefault()
    console.log("this.jokesAlreadyRead.length: " , this.jokesAlreadyRead.length)
    console.log("this.state.totalOfJokes: " ,this.state.joke.totalOfJokes)
    var totalJokes = this.state.joke.totalOfJokes
    // 1. All of jokes it's already read
    if (this.state.joke.totalOfJokes > this.jokesAlreadyRead.length){
      // Get another joke
      this.callBadJokeService()
      console.log("this.jokesAlreadyRead.length > this.state.totalOfJokes")
    }else {
      this.setState({joke: {id: 0, text: "Você já leu todas as piadas, Parabéns!", total: totalJokes}})
    }


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
        <div className="next">
        <button className="button" onClick={(e) => this.nextJoke(e)}>
          Próxima Piada!
        </button>
        </div>
      </div>
    );
  }
}

export default App;
