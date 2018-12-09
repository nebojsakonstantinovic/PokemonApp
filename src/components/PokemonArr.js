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
    const { pokemonArr } = this.props;
    const { sort } = this.state;
    let arrOfPokemonName;
    if (pokemonArr.pokemon_species !== undefined) {
        arrOfPokemonName = pokemonArr.pokemon_species.map( (e) => {
        return e.name;
      })
    }

    const colorStyle = {
      color: pokemonArr.name,
    };

    return (
      <div>
        <h2 className="text-center">Pokemons with color <span className="text-uppercase" style={colorStyle}>{pokemonArr.name}</span></h2>
        <div className="text-center mb-2">
          <button className="btn btn-success mr-1" onClick={this.setSortToTrue}>sort on</button>
          <button className="btn btn-danger" onClick={this.setSortToFalse}>sort off</button>
        </div>
        <ul className="list-unstyled list-group">
          {sort && arrOfPokemonName && arrOfPokemonName.sort().map( (el,i) => (
            <li className="list-group-item" key={i}>{el}</li>
          ))}
          {!sort && arrOfPokemonName && arrOfPokemonName.map( (el,i) => (
            <li className="list-group-item"  key={i}>{el}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PokemonArr;
