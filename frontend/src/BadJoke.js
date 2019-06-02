import React, { Component } from 'react'
import './BadJoke.css'
import { BadJokeService}  from './services/BadJokeService'
import { BadJokesTotal} from "./services/BadJokesTotal";

class BadJoke extends Component {

  state = {
    joke: {id: 0, text: '', answer: '', _limit: 0}
  };

  splitedAnswer = '';
  // idsAlreadyBeenRead = [];
  idsAlreadyBeenRead = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,146,148,149,150,151,152,153,154,155,156,157,159,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294];
  totalOfJokes = 0;

  callService(id) {
    this.buttonAnswerVisibility("none");
    BadJokeService(id).then(result => {
        if (result.ok) {
            if(this.alreadyBeenRead(result.joke)) {
                this.callService();
            }else {
                this.splitQuestionAnswerByQuestionMark(result.joke)
            }

        } else {
          this.setState({joke: {id, text: 'Essa piada ainda é tão ruim que ainda não existe!!!' }})
        }
      }).catch(e => {
          console.log(e);
          this.setState({joke: {id: 0, text: "Erro, tente mais tarde"}})
      })
  }

  buttonAnswerVisibility(param) {
    const buttonAnswer = document.getElementById("button-answer");
    buttonAnswer.style.display = param;
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.callService(params.id)
    this.BadJokesTotalService();
  }

    BadJokesTotalService() {
        BadJokesTotal().then(result => {
            if (result.ok) {
                this.totalOfJokes = result.jokes._total;
            }
            console.log("result: ", result)
            console.log("this.totalOfJokes: ", this.totalOfJokes)
        }).catch(e => {
            console.log(e);
        })
    }

    copyToClipboard() {
    document.getElementById("permalink").select();
    document.execCommand("copy")
  }

  getJokesAnswer(joke) {
      this.setState({joke: {id: joke.id, text: joke.text, answer: 'R: ' + this.splitedAnswer, _limit: 0}});
      this.buttonAnswerVisibility("none")
  }

  splitQuestionAnswerByQuestionMark(joke) {
      const splitJoke = joke.text.match(/\S[^?]*(?:\?+|$)/g);
      if (splitJoke.length > 1){
          this.buttonAnswerVisibility("inline");
          this.splitedAnswer = splitJoke[1]; // saving splitedAnswer to be show later
      }
      this.setState({joke: {id: joke.id, text: splitJoke[0], answer: '', _limit: 0}})
  }

  alreadyBeenRead(joke) {
    console.log("alreadyBeenRead? ",joke.id)
    console.log("idsAlreadyRead: " , this.idsAlreadyBeenRead)
    this.checkAlreadyBeenReadLimit(joke)
    if (this.idsAlreadyBeenRead.indexOf(joke.id) === -1) {
      this.idsAlreadyBeenRead.push(joke.id)
      this.idsAlreadyBeenRead.sort((a, b) => a - b);
      return false;
    }
    console.log("JÁ FOI LIDA");
    this.setState({joke: {id: joke.id, text: 'Buscando uma não lida... ', answer: '', _limit: 0}})
    return true;
  }

  checkAlreadyBeenReadLimit(joke) {
      console.log("checking..", joke)
      console.log("checking lenght..", this.idsAlreadyBeenRead.length)
      if(this.idsAlreadyBeenRead.length   === this.totalOfJokes ) {
          this.idsAlreadyBeenRead = []
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
            <p id="splitedAnswer">{this.state.joke.answer}</p>
            <button id="button-answer" className="button-answer" onClick={(e) => this.getJokesAnswer(this.state.joke)}>
                Ver resposta
            </button>
            <br />
            <div>
                <label htmlFor='permalink'>Permalink:</label>
                <input id='permalink' readOnly type='text' className="input" value={`${window.location.origin}/${this.state.joke.id}`} />
                <button className="button-permalink" onClick={this.copyToClipboard}>Copiar</button>
            </div>
            <br />
            <br />
            <div>
              <button className="button"  onClick={(e) => this.callService()}>Quero ver uma nova piada!</button>
            </div>
          </div>
        </div>
    )
  }
}

export default BadJoke
