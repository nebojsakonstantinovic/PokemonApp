import React from 'react';


const PokemonData = ( {pokemonData} ) => {
  console.log(pokemonData);
  return (
    <div className="Pokemon-card">
      <div className="row">
        <div className="col-12 col-md-3 text-center">{pokemonData.sprites && <img src={pokemonData.sprites.back_default} alt="pokemon"/>}</div>
        <div className="col-12 col-md-9 text-center text-md-left"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro totam ut velit. Ipsa unde hic dolorem dolorum aperiam earum, distinctio nobis! Molestias optio aspernatur officiis, eaque natus necessitatibus consequuntur?</p></div>
      </div>
      <p>
        this pokemon has id of {pokemonData.id}
      </p>
      <p>
        this pokemon name is {pokemonData.name}
      </p>
      <p>
        this pokemon base experience is {pokemonData.base_experience}
      </p>
      <p>
        this pokemon height {pokemonData.height}
      </p>
    </div>
  )
}

export default PokemonData;
