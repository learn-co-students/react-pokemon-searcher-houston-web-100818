import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor() {
    super()
    this.state = {
      isFront: true
    }
  }

  handleClick = () => this.setState({ isFront: !this.state.isFront })

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img 
            alt={this.props.pokemon.name} 
            src={this.state.isFront ?  this.props.pokemon.sprites.front :
            this.props.pokemon.sprites.back}
            title = {this.state.isFront ? 'front' : 'back'}
            onClick = {this.handleClick}
             />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats[5].value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
