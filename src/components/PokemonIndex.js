import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
  }

  fetchPokemons = () => {
    return fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemons => this.setState({ pokemons }))
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  search = _.debounce((searchTerm) => this.searchPokemon(searchTerm), 500)

  searchPokemon = (searchTerm) => {
    this.fetchPokemons()
    .then( () => {
      let filteredPokemons = this.state.pokemons.filter( pokemon => pokemon.name.includes(searchTerm) )
      this.setState({ pokemons: filteredPokemons })
    })
  }

  addPokemon = (newPokemon) => {
    console.log('invoked in index', newPokemon)
    // post and return state to render
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newPokemon.name,
        stats: [{'value': parseInt(newPokemon.hp), 'name': 'hp'}],
        sprites: {
          front: newPokemon.frontUrl,
          back: newPokemon.backUrl
        }
      })
    })
    .then(resp => resp.json())
    .then( () => {this.fetchPokemons()} )
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={e => this.search(e.target.value)} showNoResults={false} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection pokemons={this.state.pokemons} />
      </div>
    )
  }
}

export default PokemonPage
