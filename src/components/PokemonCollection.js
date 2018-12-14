import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

export default class PokemonCollection extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.pokemon.map(pokemon => {
          return <PokemonCard {...pokemon} key={pokemon.id} />;
        })}
      </Card.Group>
    )
  }
}
