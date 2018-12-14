import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

export default class PokemonCollection extends React.Component {
  
  renderPokemonCards = () => {
    return this.props.pokemon.map(pokemon => {
      return <PokemonCard {...pokemon} key={pokemon.id} />;
    })
  }
  
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemonCards()}
      </Card.Group>
    )
  }
}
