import React from 'react';

const PokemonError = ( { clicked } ) => {
  return (
    <div className="text-center">
      <div>Something went wrong</div>
      <button className="btn btn-primary mt-3" onClick={clicked}>
        try again
      </button>
    </div>

  )
}

export default PokemonError;