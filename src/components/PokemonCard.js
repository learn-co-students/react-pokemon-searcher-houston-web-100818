import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    img: this.props.pokemon.sprites.front
  }

  toggleImage = () => {
    this.state.img === this.props.pokemon.sprites.front ?
    this.setState({ img: this.props.pokemon.sprites.back })
    : this.setState({ img: this.props.pokemon.sprites.front})
  }

  findHP = () => {
    let statHP = this.props.pokemon.stats.find(stat => stat.name === 'hp')
    return statHP.value
  }

  render() {
    return (
      <Card onClick={this.toggleImage}>
          <div className="image">
            <img src={this.state.img} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHP()} hp
            </span>
          </div>
      </Card>
    )
  }
}

export default PokemonCard
