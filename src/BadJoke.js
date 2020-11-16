import React, { Component } from 'react'
import './BadJoke.css'
import { BadJokeService}  from './services/BadJokeService'

class BadJoke extends Component {

  state = {
    joke: {id: 0, text: '', answer: ''}
  };

  splitedAnswer = '';
  idsAlreadyBeenRead = [];

  callService = id => {
    BadJoke.buttonAnswerVisibility("none");
    BadJokeService(id, this.idsAlreadyBeenRead.join(',')).then(result => {
        if (result.ok) {
            this.splitQuestionAnswerByQuestionMark(result.joke)
        } else {
          this.setState({joke: {id, text: 'Essa piada ainda é tão ruim que ainda não existe!!!' }})
            this.idsAlreadyBeenRead = [];
        }
      }).catch(e => {
          console.log(e);
          this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
      })
  };

  static buttonAnswerVisibility = param => {
    const buttonAnswer = document.getElementById("button-answer");
    buttonAnswer.style.display = param;
  };

  componentDidMount = () => {
    const { location: { search } } = this.props;
    let id = search.split('=')[1];
    this.callService(id);
  };


  static copyToClipboard = () => {
    document.getElementById("permalink").select();
    document.execCommand("copy")
  };

  getJokesAnswer = joke => {
    this.setState({joke: {id: joke.id, text: joke.text, answer: 'R: ' + this.splitedAnswer}});
    BadJoke.buttonAnswerVisibility("none")
  };

  splitQuestionAnswerByQuestionMark = joke => {
     const splitJoke = joke.text.match(/\S[^?]*(?:\?+|$)/g);
     if (splitJoke.length > 1){
         BadJoke.buttonAnswerVisibility("inline"); // show answer's button
        this.splitedAnswer = splitJoke[1]; // saving splitedAnswer to be show later
     }
     this.setState({joke: {id: joke.id, text: splitJoke[0], answer: ''}})
     this.idsAlreadyBeenRead.push(joke.id)
  };

  render = () => (
      <div className="App">
          <header className="App-header">
              <p>
                  Piada Ruim do Dia!
              </p>
          </header>
          <div className="joke">
              <p id="badjoke">{this.state.joke.text}</p>
              <p id="splitedAnswer">{this.state.joke.answer}</p>
              <button id="button-answer" className="button-answer"
                      onClick={(e) => this.getJokesAnswer(this.state.joke)}>
                  Ver resposta
              </button>
              <br/>
              <div>
                  <label htmlFor='permalink'>Permalink:</label>
                  <input id='permalink' readOnly type='text' className="input"
                         value={`${window.location.origin}/?id=${this.state.joke.id}`}/>
                  <button className="button-permalink" onClick={BadJoke.copyToClipboard}>Copiar</button>
              </div>
              <br/>
              <br/>
              <div>
                  <button className="button" onClick={(e) => this.callService()}>Quero ver uma nova piada!</button>
              </div>
          </div>
      </div>
  );
}

export default BadJoke
