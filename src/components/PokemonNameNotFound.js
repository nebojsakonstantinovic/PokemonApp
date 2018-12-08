import React from 'react';

const PokemonNameNotFound = ( { name, color, clicked } ) => {
  return (
    <div>
      {name && <div>There is no pokemon by the name {name}</div>}     
      {color && <div>There is no pokemon by that color {color}</div>}
      <button onClick={clicked}>
        click to continue search
      </button>
    </div>

  )
}

export default PokemonNameNotFound;