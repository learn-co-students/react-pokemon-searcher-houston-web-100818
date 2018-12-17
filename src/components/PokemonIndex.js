import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      input: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(resp => resp.json())
      .then(pokemon => {
        this.setState({ pokemon: pokemon });
      });
  }

  addPokemon = poke => {
    this.setState(state => {
      state.pokemon.push(poke);
      return state;
    });
  };

  search = _.debounce(input => {
    this.setState(state => {
      state.input = input;
      return state;
    }),
      500;
  });

  render() {
    // console.log(pokemon)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={e => this.search(e.target.value)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
