import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import PokemonData from './components/PokemonData';
import PokemonNameNotFound from './components/PokemonNameNotFound';
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
    });
  }

  getPokemon = async () => {
    try {
      const { pokemonName } = this.state;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
      this.setState({
        pokemon: res.data,
        pokemonColor: '',
        pokemonArr: '',
      });
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
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokemonColor}/`);
      this.setState({
        pokemonArr: res.data,
        pokemonName: '',
        pokemon: '',
      });
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
        <div className = "search text-center text-uppercase text-info" >
          <h1>Pokemon App name butterfree</h1>
          <div className = "search" >
            <input type = "text" name = "pokemonName" value = {pokemonName} onChange = {this.onChange} disabled={pokemonSearch}/> 
            <button onClick = {this.getPokemon}>search</button> 
          </div>  
        </div>
        {/* serach by color */}
        <div className = "search text-center text-uppercase text-info" >
          <h1>Pokemon App color</h1>
          <div className = "search" >
            <input type = "text" name = "pokemonColor" value = {pokemonColor} onChange = {this.onChange} disabled={pokemonSearch}/> 
            <button onClick = {this.getPokemonArr}>search</button> 
          </div>  
        </div>
        {pokemon && !pokemonSearch && <PokemonData pokemonData={this.state.pokemon} /> }
        {pokemonSearch && <PokemonNameNotFound name={pokemonName} color={pokemonColor} clicked={this.resetSearch}/>}
        {pokemonArr && !pokemonSearch && <PokemonArr pokemonArr={this.state.pokemonArr} />}
        
      </div>
    );
  }
}

export default App;