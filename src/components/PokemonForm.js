import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
    let pokemon = {}
    pokemon.name = e.target.name.value
    pokemon.stats = [{
      'name': 'hp', 
      'value': e.target.hp.value
    }]
    pokemon.sprites = {
      'front': e.target.frontUrl.value,
      'back': e.target.backUrl.value
    }
    console.log('adding',pokemon)
    this.props.addPokemon(pokemon)
    e.target.name.value = ''
    e.target.hp.value = ''
    e.target.frontUrl.value = ''
    e.target.backUrl.value = ''
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
