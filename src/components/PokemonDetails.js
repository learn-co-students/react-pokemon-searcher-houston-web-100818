import React from 'react'

const PokemonDetails = (props) => {
    console.log(props)
    return (
        <div>
            {props.stats.map((stat, index) => {
                return (stat.name !== 'hp' && <h5>{stat.name}: {stat.value}</h5>)
            })}
        </div>
    )
}

export default PokemonDetails