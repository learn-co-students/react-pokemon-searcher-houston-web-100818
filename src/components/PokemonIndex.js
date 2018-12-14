import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import { stat } from "fs";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      allPokemons: [],
      // filter: false,
      input: ""
    };
  }

  search = _.debounce(input => {
    this.setState(state => {
      state.input = input;
      return state;
    }),
      500;
  });

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(response => {
        return response.json();
      })
      .then(allPokemons => {
        this.setState(state => {
          state.allPokemons = allPokemons;
          return state;
        });
      });
  }

  createPokemon = newPoki => {
    const newPokiObject = {
      name: newPoki.name,
      stats: [{ name: "hp", value: newPoki.hp }],
      sprites: { front: newPoki.frontUrl, back: newPoki.backUrl }
    };

    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPokiObject)
    }).then(() => {
      this.setState(
        state => {
          state.allPokemons = [newPokiObject, ...state.allPokemons];
          return state;
        },
        () => {
          this.pokemons();
        }
      );
    });
  };

  pokemons() {
    let pokemons = this.state.allPokemons;

    pokemons = pokemons.filter(pokemon =>
      pokemon.name.includes(this.state.input)
    );

    return pokemons;
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={e => this.search(e.target.value)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemons={this.pokemons()} />
        <br />
        <PokemonForm createPokemon={this.createPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
