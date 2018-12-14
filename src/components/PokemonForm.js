import React from 'react'
import { Form } from 'semantic-ui-react'

export default class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  clearForm = () => {
    this.setState({
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    })
  }

  handleInputChange = (e) => {
    e.persist()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.addPokemon(this.state)
    this.clearForm()
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input value={this.state.name} onChange={this.handleInputChange} fluid label="Name" placeholder="Name" name="name" />
            <Form.Input value={this.state.hp} onChange={this.handleInputChange} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input value={this.state.frontUrl} onChange={this.handleInputChange} fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input value={this.state.backUrl} onChange={this.handleInputChange} fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}
