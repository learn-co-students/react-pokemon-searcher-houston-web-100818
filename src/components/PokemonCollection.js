import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {/* <h1 className='ui header' >Hello From Pokemon Collection  </h1> */}
        {this.props.pokemonArray.map((pokemon) => (
          <PokemonCard deletePokemon={this.props.deletePokemon} key={pokemon.id} pokemon={pokemon} />
        )) }
      </Card.Group>
    )
  }
}

export default PokemonCollection
