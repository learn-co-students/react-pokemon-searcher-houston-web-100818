import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

export default class PokemonPage extends React.Component {
  
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


  formatNewPokemon = (pokemonData) => {
    return {
      "name": pokemonData.name,
      "stats": [
        {
          "value": pokemonData.hp,
          "name": "hp"
        }
      ],
      "sprites": {
        "front": pokemonData.frontUrl,
        "back": pokemonData.backUrl
      }
    }
  }
  
  addPokemon = (pokemonData) => {
    const newPokemon = this.formatNewPokemon(pokemonData)
    fetch("http://localhost:3000/pokemon", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
    this.setState({
      pokemon: [newPokemon, ...this.state.pokemon]
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
        <Search onSearchChange={_.debounce((e, input) => this.handleSearchChange(input.value), 500)} showNoResults={false} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection pokemon={this.filterPokemonByName()} />
      </div>
    )
  }
}
