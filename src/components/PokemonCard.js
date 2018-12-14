import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor() {
    super()
    this.state = {
      sprite: 'front'
    }
  }

  toggleSprite = () => {
    this.setState({
      sprite: this.state.sprite === 'front' ? 'back' : 'front'
    })
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img onClick={this.toggleSprite} src={this.props.sprites[this.state.sprite]} alt="oh no!" />
          </div>
          <div className="content">
            <h4 className="header">{this.props.name.toUpperCase()}</h4>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.stats.find((stat) => {
                return stat.name === 'hp'
              }).value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
