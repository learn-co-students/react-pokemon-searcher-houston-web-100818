import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor() {
    super()
    this.state = {
      pokemonArray: [],
      filteredArray: []

    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
      .then(data => this.setState({
        pokemonArray: data,
        filteredArray: data
      }))
  }

  handleSearch() {

  }

  render() {
    console.log('filteredArray:', this.state.filteredArray)
    console.log(<Search.props />)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemonArray = {this.state.pokemonArray} />
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
