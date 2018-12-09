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
    const { pokemonArr, clicked } = this.props;
    const { sort } = this.state;
    let arrOfPokemonName;
    if (pokemonArr.pokemon_species !== undefined) {
        arrOfPokemonName = pokemonArr.pokemon_species.map( e => e.name)
    }

    const colorStyle = {
      color: pokemonArr.name,
      borderRadius: '5px',
    };

    return (
      <div>
        <h2 className="text-center">Pokemons with color <span className={`text-uppercase ${pokemonArr.name === 'white' ? "bg-dark" : ''}`}  style={colorStyle}>{pokemonArr.name}</span></h2>
        <div className="text-center mb-2">
          <button className={`btn mr-2 font-weight-bold ${sort ? 'btn-primary' : 'btn-outline-primary'}`} onClick={this.setSortToTrue}>sort on</button>
          <button className={`btn font-weight-bold ${sort ? 'btn-outline-primary' : 'btn-primary'}`} onClick={this.setSortToFalse}>sort off</button>
        </div>
        <div className="text-center mb-2">Click on pokemon in the list for more details</div>
        <ul className="list-unstyled list-group">
          {sort && arrOfPokemonName && arrOfPokemonName.sort().map( (el,i) => (
            <li className="list-group-item cursor-pointer" onClick={clicked} key={i}>{el}</li>
          ))}
          {!sort && arrOfPokemonName && arrOfPokemonName.map( (el,i) => (
            <li className="list-group-item cursor-pointer" onClick={clicked}  key={i}>{el}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PokemonArr;
