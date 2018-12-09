import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import PokemonData from './components/PokemonData';
import PokemonNotFound from './components/PokemonNotFound';
import PokemonArr from './components/PokemonArr';
import PokemonError from './components/PokemonError';

class App extends Component {
  state = {
    pokemonName: '',
    pokemonColor: '',
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
      pokemonSearch: false,
      pokemonName: '',
      pokemonColor: '',
      pokemon: '',
      pokemonArr: '',
      pokemonError: false,
    });
  }

  getPokemonList = async () => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        const idArr = Array.from(Array(res.data.count + 1).keys()).slice(1).map(e => e.toString());
        console.log(idArr);
        const nameArr = res.data.results.map(e => e.name);
        console.log(nameArr);
        const pokemonList = idArr.concat(nameArr);
        this.setState({
          pokemonList,
        });
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonColor: '',
        pokemonError: true,
      });
    }
  }

  getPokemonArrList = async () => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/`);
        const idArr = Array.from(Array(res.data.count + 1).keys()).slice(1).map(e => e.toString());
        const nameArr = res.data.results.map(e => e.name);
        const pokemonArrList = idArr.concat(nameArr);
        this.setState({
          pokemonArrList,
        });
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonColor: '',
        pokemonError: true,
      });
    }
  }

  getPokemon = async () => {
    try {
      const { pokemonName, pokemonList } = this.state;
      console.log(pokemonName);
      if (pokemonList.includes(pokemonName)) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        this.setState({
          pokemon: res.data,
          pokemonColor: '',
          pokemonArr: '',
        });
      } else {
        this.setState({
          pokemonSearch: true,
          pokemon: '',
          pokemonColor: '',
        });
      }
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonColor: '',
        pokemonError: true,
      });
    }
  }

  getPokemonArr = async () => {
    try {
      const { pokemonColor, pokemonArrList } = this.state;
      if (pokemonArrList.includes(pokemonColor)) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokemonColor}/`);
        this.setState({
          pokemonArr: res.data,
          pokemonName: '',
          pokemon: '',
        });
      } else {
        this.setState({
          pokemonSearch: true,
          pokemon: '',
          pokemonName: '',
        });
      }
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonName: '',
        pokemonError: true,
      });
    }
  }

  callSinglePokemon = (e) => {
    console.log(typeof e.target.textContent);
    const x = e.target.textContent;
    this.setState({
      pokemonName: x,
    }, this.getPokemon);
  }

  render() {
    const { pokemonName, pokemonColor, pokemon, pokemonArr, pokemonSearch, pokemonError } = this.state;

    return (
      <div className="container">
        {/* search by name */}
        <div className = "search text-center text-uppercase text-dark mb-3">
          <h1 className="mb-4">Pokemon App</h1>
          <h2>Search pokemon by name</h2>
          <div className = "search input-group">
            <input className="form-control" placeholder= "Enter pokemon name or id" type = "text" name = "pokemonName" value = {pokemonName} onChange = {this.onChange} disabled={pokemonSearch}/> 
            <div className="input-group-append">
              <button className="btn btn-dark" onClick = {this.getPokemon}>search</button> 
            </div>
          </div>  
        </div>
        {/* serach by color */}
        <div className = "search text-center text-uppercase text-dark mb-5">
          <h2>Search pokemon by color</h2>
          <div className = "search input-group" >
            <input className="form-control" placeholder= "Enter pokemon color or id"  type = "text" name = "pokemonColor" value = {pokemonColor} onChange = {this.onChange} disabled={pokemonSearch}/>
            <div className="input-group-append">
              <button className="btn btn-dark" onClick = {this.getPokemonArr}>search</button>
            </div>
          </div>  
        </div>
        {pokemon && !pokemonSearch && !pokemonError && <PokemonData pokemonData={this.state.pokemon} /> }
        {pokemonArr && !pokemonSearch && !pokemonError && <PokemonArr pokemonArr={this.state.pokemonArr} clicked={this.callSinglePokemon} />}
        {pokemonSearch && !pokemonError && <PokemonNotFound name={pokemonName} color={pokemonColor} clicked={this.resetSearch}/>}
        {pokemonError && <PokemonError clicked={this.resetSearch} />}
      </div>
    );
  }
}

export default App;