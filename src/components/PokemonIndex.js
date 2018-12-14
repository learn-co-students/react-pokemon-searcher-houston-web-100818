import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  
  constructor() {
    super()
    this.state = {
      pokemon: [],
      searchTerm: ''
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

  handleSearchChange = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm
    })
  }

  filterPokemonByName = () => {
    return this.state.pokemon.filter(pokemon => {
      return pokemon.name.startsWith(this.state.searchTerm);
    });
  }

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, data) => this.handleSearchChange(data.value), 500)} showNoResults={false} />
        <br />
        <PokemonForm />
        <br />
        <PokemonCollection pokemon={this.filterPokemonByName()} />
      </div>
    )
  }
}

export default PokemonPage
