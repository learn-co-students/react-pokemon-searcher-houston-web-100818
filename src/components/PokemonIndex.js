import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  
  constructor() {
    super()
    this.state = {
      pokemon: []
    }
  }
  
  getPokemon = () => {
    fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(pokemon => {
      this.setState({
        pokemon: pokemon
      })
    })
  }

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonForm />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
      </div>
    )
  }
}

export default PokemonPage
