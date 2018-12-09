import React from 'react';

 const PokemonSearch = ( { value, onChange, disabled, onClick } ) => {
  return (
    <div className = "search text-center text-uppercase text-dark mb-3">
      <h1 className="mb-4">Pokemon App</h1>
      <h2>Search pokemon by name or color</h2>
      <div className = "search input-group">
        <input className="form-control" placeholder= "Enter pokemon name or color" type = "text" name = "pokemonInput" value = {value} onChange = {onChange} disabled={disabled}/> 
        <div className="input-group-append">
          <button className="btn btn-dark" onClick = {onClick}>search</button> 
        </div>
      </div>  
    </div>
  )
}

export default PokemonSearch;