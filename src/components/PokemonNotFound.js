import React from 'react';

const PokemonNotFound = ( { name, clicked } ) => {
  return (
    <div className="text-center">
      {name && <div>There is no pokemon with name or color {name}</div>}     
      <button className="btn btn-primary mt-3" onClick={clicked}>
        click to continue search
      </button>
    </div>

  )
}

export default PokemonNotFound;