import React from 'react'

const PokemonDetails = (props) => {
    console.log(props)
    return (
        <div>
            <p>Height: {props.height}</p>
            <p>Weight: {props.weight}</p>
            <p>Abilities: {props.abilities.join(', ')}</p>
            <p>Moves: {props.moves.join(', ')}</p>
        </div>
    )
}

export default PokemonDetails