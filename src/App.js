import React, {Component} from 'react';
import axios from 'axios';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//components
import PokemonSearch from './components/PokemonSearch';
import PokemonData from './components/PokemonData';
import PokemonNotFound from './components/PokemonNotFound';
import PokemonArr from './components/PokemonArr';
import PokemonError from './components/PokemonError';

class App extends Component {
  state = {
    pokemonInput: '',
    pokemon: '',
    pokemonArr: '',
    pokemonList: [],
    pokemonArrList: [],
    pokemonSearch: false,
    pokemonError: false,
  };

  componentDidMount() {
    this.getPokemonArrList();
    this.getPokemonList();
  }

  onChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  resetSearch = () => {
    this.setState({
      pokemonInput: '',
      pokemon: '',
      pokemonArr: '',
      pokemonSearch: false,
      pokemonError: false,
    });
  }

  getPokemonList = async () => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        const pokemonList = res.data.results.map(e => e.name);
        this.setState({
          pokemonList,
        });
    } catch (e) {
      console.error(e)
      this.setState({
        pokemon: '',
        pokemonSearch: true,
        pokemonError: true,
      });
    }
  }

  getPokemonArrList = async () => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/`);
        const pokemonArrList  = res.data.results.map(e => e.name);
        this.setState({
          pokemonArrList,
        });
    } catch (e) {
      console.error(e)
      this.setState({
        pokemon: '',
        pokemonSearch: true,
        pokemonError: true,
      });
    }
  }

  getPokemon = async () => {
    try {
      const { pokemonInput, pokemonList, pokemonArrList  } = this.state;
      if (pokemonInput) {
        if (pokemonList.includes(pokemonInput.toLowerCase())) {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.toLowerCase()}/`);
          this.setState({
            pokemon: res.data,
            pokemonArr: '',
          });
        } else if (pokemonArrList.includes(pokemonInput.toLowerCase())) {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokemonInput.toLowerCase()}/`);
          this.setState({
            pokemonArr: res.data,
            pokemon: '',
          });
        } else {
          this.setState({
            pokemonSearch: true,
            pokemon: '',
          });
        }
      }
    } catch (e) {
      console.error(e)
      this.setState({
        pokemon: '',
        pokemonSearch: true,
        pokemonError: true,
      });
    }
  }

  callSinglePokemon = (e) => {
    const pokemonInput = e.target.textContent;
    this.setState({
      pokemonInput,
    }, this.getPokemon);
  }

  render() {
    const { pokemonInput, pokemon, pokemonArr, pokemonSearch, pokemonError } = this.state;

    return (
      <div className="container">
        <PokemonSearch value={pokemonInput} onChange={this.onChange} disabled={pokemonSearch} onClick={this.getPokemon} />
        {pokemon && !pokemonSearch && !pokemonError && <PokemonData pokemonData={pokemon} /> }
        {pokemonArr && !pokemonSearch && !pokemonError && <PokemonArr pokemonArr={pokemonArr} clicked={this.callSinglePokemon} />}
        {pokemonSearch && !pokemonError && <PokemonNotFound name={pokemonInput} clicked={this.resetSearch}/>}
        {pokemonError && <PokemonError clicked={this.resetSearch} />}
      </div>
    );
  }
}

export default App;