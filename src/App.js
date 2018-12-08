import React, {
  Component
} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    inputText: '',
    pokemon: '',
  };

  onChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  getPokemon = async () => {
    const {
      inputText
    } = this.state;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputText}`, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    console.log(res);

    this.setState({
      pokemon: res
    });
  }

  render() {
    const {
      inputText
    } = this.state;

    return ( <
      div className = "text-center text-uppercase text-info" >
      <
      h1 > Patka < /h1> <
      div className = "search" >
      <
      input type = "text"
      name = "inputText"
      value = {
        inputText
      }
      onChange = {
        this.onChange
      }
      /> <
      button onClick = {
        this.getPokemon
      } > search < /button> <
      /div> <
      /div>
    );
  }
}

export default App;