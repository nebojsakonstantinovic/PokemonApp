import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import PokemonData from './components/PokemonData';
import PokemonNotFound from './components/PokemonNotFound';
import PokemonArr from './components/PokemonArr';

class App extends Component {
  state = {
    pokemonName: '',
    pokemonColor: '',
    pokemon: '',
    pokemonArr: '',
    pokemonSearch: false,
  };

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
    });
  }

  getPokemon = async () => {
    try {
      const { pokemonName } = this.state;
      if (pokemonName) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        this.setState({
          pokemon: res.data,
          pokemonColor: '',
          pokemonArr: '',
        });
      }
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonColor: '',
      });
    }
  }

  getPokemonArr = async () => {
    try {
      const { pokemonColor } = this.state;
      if (pokemonColor) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokemonColor}/`);
        this.setState({
          pokemonArr: res.data,
          pokemonName: '',
          pokemon: '',
        });
      }
    } catch (e) {
      console.error(e)
      this.setState({
        pokemonSearch: true,
        pokemon: '',
        pokemonName: '',
      });
    }
  }

  render() {
    const { pokemonName, pokemonColor, pokemon, pokemonArr, pokemonSearch } = this.state;

    return (
      <div className="container">
        {/* search by name */}
        <div className = "search text-center text-uppercase text-info mb-3">
          <h1 className="mb-4">Pokemon App</h1>
          <h2>Search pokemon by name</h2>
          <div className = "search input-group">
            <input className="form-control" placeholder= "Enter pokemon name or id" type = "text" name = "pokemonName" value = {pokemonName} onChange = {this.onChange} disabled={pokemonSearch}/> 
            <div className="input-group-append">
              <button className="btn btn-info" onClick = {this.getPokemon}>search</button> 
            </div>
          </div>  
        </div>
        {/* serach by color */}
        <div className = "search text-center text-uppercase text-info mb-5">
          <h2>Search pokemon by color</h2>
          <div className = "search input-group" >
            <input className="form-control" placeholder= "Enter pokemon color or id"  type = "text" name = "pokemonColor" value = {pokemonColor} onChange = {this.onChange} disabled={pokemonSearch}/>
            <div className="input-group-append">
              <button className="btn btn-info" onClick = {this.getPokemonArr}>search</button>
            </div>
          </div>  
        </div>
        {pokemon && !pokemonSearch && <PokemonData pokemonData={this.state.pokemon} /> }
        {pokemonSearch && <PokemonNotFound name={pokemonName} color={pokemonColor} clicked={this.resetSearch}/>}
        {pokemonArr && !pokemonSearch && <PokemonArr pokemonArr={this.state.pokemonArr} />}
        
      </div>
    );
  }
}

export default App;