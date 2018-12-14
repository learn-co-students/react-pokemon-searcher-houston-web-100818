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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.addPokemon(this.state)
    console.log(this.state)
    // reset this.state values
    this.setState({
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input onChange={this.handleChange} fluid label="Name" placeholder="Name" name="name" value={this.state.name} />
            <Form.Input onChange={this.handleChange} fluid label="hp" placeholder="hp" name="hp" value={this.state.hp} />
            <Form.Input onChange={this.handleChange} fluid label="Front Image URL" placeholder="url" name="frontUrl" value={this.state.frontUrl} />
            <Form.Input onChange={this.handleChange} fluid label="Back Image URL" placeholder="url" name="backUrl" value={this.state.backUrl} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
