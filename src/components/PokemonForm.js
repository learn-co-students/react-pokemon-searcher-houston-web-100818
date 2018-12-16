import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: ""
    };
  }

  // handleChange = (e, input) => {
  //   this.setState({ [input.name]: input.value });
  //   console.log(input);
  // };

  updateFormProperty(key, value) {
    this.setState(state => {
      state[key] = value;
      return state;
    });
  }

  handleSubmit = () => {
    let newPoke = {
      name: this.state.name,
      stats: [
        {
          value: this.state.hp,
          name: "hp"
        }
      ],
      sprites: {
        front: this.state.frontUrl,
        back: this.state.backUrl
      }
    };
    this.props.addPokemon(newPoke);

    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newPoke)
    }).then(newPokes => {
      console.log(newPokes);
    });
  };

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              onChange={e => this.updateFormProperty("name", e.target.value)}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              onChange={e => this.updateFormProperty("hp", e.target.value)}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="frontUrl"
              onChange={e =>
                this.updateFormProperty("frontUrl", e.target.value)
              }
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="backUrl"
              onChange={e => this.updateFormProperty("backUrl", e.target.value)}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
