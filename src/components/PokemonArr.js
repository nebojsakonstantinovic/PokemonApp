import React, { Component } from 'react'

 class PokemonArr extends Component {
  state = {
    sort: false,
  }

  setSortToTrue = () => {
    this.setState({
      sort: true,
    })
  }

  setSortToFalse = () => {
    this.setState({
      sort: false,
    })
  }

  render() {
    const { sort } = this.state;
    let arrOfPokemonName;
    if (this.props.pokemonArr.pokemon_species !== undefined) {
        arrOfPokemonName = this.props.pokemonArr.pokemon_species.map( (e) => {
        return e.name;
      })
      console.log(arrOfPokemonName);
    }

    return (
      <div>
        <button onClick={this.setSortToTrue}>sort on</button>
        <button onClick={this.setSortToFalse}>sort off</button>
        <ul>
          {sort && arrOfPokemonName && arrOfPokemonName.sort().map( (el,i) => (
            <li key={i}>{el}</li>
          ))}
          {!sort && arrOfPokemonName && arrOfPokemonName.map( (el,i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PokemonArr;
