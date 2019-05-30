import React, { Component } from 'react'
import './BadJoke.css'
import { BadJokeService }  from './services/BadJokeService'

class BadJoke extends Component {

  state = {
    joke: {id: 0, text: ''}
  }

  callService(id) {
    BadJokeService(id).then(result => {
        if (result.ok) {
          this.setState({joke: result.joke})
        } else {
          this.setState({joke: {id, text: 'Essa piada ainda é tão ruim que ainda não existe!!!' }})
        }
      }).catch(e => {
          console.log(e)
          this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
      })
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.callService(params.id)
  }

  copyToClipboard() {
    document.getElementById("permalink").select()
    document.execCommand("copy")
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
            <br />
            <div>
                <label htmlFor='permalink'>Permalink:</label>
                <input id='permalink' readOnly type='text' value={`${window.location.origin}/${this.state.joke.id}`}></input>
                <button onClick={this.copyToClipboard}>Copiar</button>
            </div>
            <br />
            <br />
            <div>
              <a href="/" className="button">Quero ver uma nova piada!</a>
            </div>
          </div>
        </div>
    )
  }
}

export default BadJoke
