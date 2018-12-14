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

  addPokemon = (pokemon) => {
    fetch('http://localhost:3000/pokemon', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)   
    })
    .then(() => {
      this.setState( state => { 
        state.pokemonArray = [...this.state.pokemonArray, pokemon] 
        this.search('')
        return state
      })
    })
  }
  
  filterMethod = (text) => {
    return this.state.pokemonArray.filter((pokemon) => {
      const result = pokemon.name.search(text)
      if (result===-1){
        return false
      } else {
        return true
      }
    })
  }

  search = _.debounce((searchTerm) => {
    this.setState({
      filteredArray: this.filterMethod(searchTerm)
  })}, 200)

  deletePokemon = (id) => {
    fetch(`http://localhost:3000/pokemon/${id}`, {
      method: "DELETE"
    })  
    .then(() => {
      const delID = this.state.filteredArray.findIndex((pokemon)=>pokemon.id===id)
      this.setState(state => {
        state.filteredArray.splice(delID,1)
        return state
      })
    })  
  }

  render() {
    console.log('rendering')
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={e => this.search(e.target.value)} showNoResults={false} />
        <br />
        <PokemonCollection pokemonArray = {this.state.filteredArray} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    )
  }
}

export default PokemonPage
