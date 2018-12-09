import React from 'react';


const PokemonData = ( {pokemonData} ) => {
  return (
    <div className="card Pokemon-card mx-auto">
      <div className="card-header">
        <div className="row">
          <div className="col-12 col-sm-3 text-center">{pokemonData.sprites && <img src={pokemonData.sprites.back_default} alt="pokemon"/>}</div>
          <div className="col-12 col-sm-9 d-flex justify-content-center align-items-center">Hi I am POKEMON</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {pokemonData.name && <li className="list-group-item">My name is <b className="text-capitalize">{pokemonData.name}</b></li>}
        {pokemonData.id && <li className="list-group-item">I have id of {pokemonData.id}</li>}
        {pokemonData.base_experience && <li className="list-group-item">My base experience is {pokemonData.base_experience}</li>}
        {pokemonData.height && <li className="list-group-item">I have height {pokemonData.height}</li>}
      </ul>
    </div>
  )
}

export default PokemonData;
