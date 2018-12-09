import React from 'react';

const PokemonNotFound = ( { name, color, clicked } ) => {
  return (
    <div className="text-center">
      {name && <div>There is no pokemon with name or name id {name}</div>}     
      {color && <div>There is no pokemon with color name or color id {color}</div>}
      <button className="btn btn-success mt-3" onClick={clicked}>
        click to continue search
      </button>
    </div>

  )
}

export default PokemonNotFound;