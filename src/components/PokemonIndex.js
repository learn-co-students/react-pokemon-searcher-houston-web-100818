import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import FilterSelect from './FilterSelect'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

export default class PokemonPage extends React.Component {
  
  constructor() {
    super()
    this.state = {
      pokemon: [],
      pokemonTypes: [],
      pokemonMoves: [],
      pokemonAbilities: [],
      filters: {
        name: '',
        type: null,
        move: null,
        ability: null
      }
    }
  }
  
  getPokemon = () => {
    fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(pokemon => {
      let types = []
      let moves = []
      let abilities = []
      pokemon.forEach(poke => {
        poke.types.forEach(type => {
          if (!types.includes(type)) {
            types.push(type)
          }
        })
        poke.moves.forEach(move => {
          if (!moves.includes(move)) {
            moves.push(move)
          }
        })
        poke.abilities.forEach(ability => {
          if (!abilities.includes(ability)) {
            abilities.push(ability);
          }
        });
      })
      this.setState({
        pokemon: pokemon,
        pokemonTypes: types.sort(),
        pokemonMoves: moves.sort(),
        pokemonAbilities: abilities.sort()
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
    fetch("http://localhost:3000/pokemon", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.formatNewPokemon(pokemonData))
    })
    .then((newPokemon) => {
      this.setState({
        pokemon: [newPokemon, ...this.state.pokemon]
      })
    })
  }

  handleSearchChange = (searchValue) => {
    this.setState(state => {
      state.filters['name'] = searchValue
      return state
    })
  }

  handleSelection = (e) => {
    e.persist()
    this.setState(state => {
      state.filters[e.target.name] = e.target.value
      return state
    })
  }

  filterPokemon = () => {
    switch (true) {
      case this.state.filters.type !== null && this.state.filters.move !== null && this.state.filters.ability !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.types.includes(this.state.filters.type) && pokemon.moves.includes(this.state.filters.move) && pokemon.abilities.includes(this.state.filters.ability);
        });
      case this.state.filters.type !== null && this.state.filters.move !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.types.includes(this.state.filters.type) && pokemon.moves.includes(this.state.filters.move);
        });
      case this.state.filters.type !== null && this.state.filters.ability !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.types.includes(this.state.filters.type) && pokemon.abilities.includes(this.state.filters.ability);
        });
      case this.state.filters.move !== null && this.state.filters.ability !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.moves.includes(this.state.filters.move) && pokemon.abilities.includes(this.state.filters.ability);
        });
      case this.state.filters.type !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.types.includes(this.state.filters.type);
        });
      case this.state.filters.move !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.moves.includes(this.state.filters.move);
        });
      case this.state.filters.ability !== null:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name) && pokemon.abilities.includes(this.state.filters.ability);
        });
      default:
        return this.state.pokemon.filter(pokemon => {
          return pokemon.name.startsWith(this.state.filters.name);
        });
    }

  }

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <h3>Search Pokemon by Name:</h3>
        <Search onSearchChange={_.debounce((e, input) => this.handleSearchChange(input.value), 500)} showNoResults={false} />
        <h3>Filter Pokemon by Type:</h3>
        <FilterSelect category="type" handleSelection={this.handleSelection} choices={this.state.pokemonTypes} />
        <h3>Filter Pokemon by Move:</h3>
        <FilterSelect category ="move" handleSelection={this.handleSelection} choices={this.state.pokemonMoves} />
        <h3>Filter Pokemon by Ability:</h3>
        <FilterSelect category ="ability" handleSelection={this.handleSelection} choices={this.state.pokemonAbilities} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection pokemon={this.filterPokemon()} />
      </div>
    )
  }
}
