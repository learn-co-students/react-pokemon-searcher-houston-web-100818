import React from 'react'
import PokemonDetails from './PokemonDetails'
import { Card } from 'semantic-ui-react'

export default class PokemonCard extends React.Component {

  constructor() {
    super()
    this.state = {
      sprite: 'front',
      showDetails: false
    }
  }

  toggleSprite = () => {
    this.setState({
      sprite: this.state.sprite === 'front' ? 'back' : 'front'
    })
  }

  toggleDetail = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    return <Card>
        <div>
          <div className="image">
            <img onClick={this.toggleSprite} src={this.props.sprites[this.state.sprite]} alt="oh no!" />
          </div>
          <div className="content">
            <h4 className="header">{this.props.name.toUpperCase()}</h4>
          </div>
          <div className="extra content">
            <span>
              <p>
                <em>
                  {this.props.types
                    ? this.props.types.join(", ")
                    : "no types listed"}
                </em>
              </p>
              <i className="icon heartbeat red" />
              {this.props.stats.find(stat => {
                  return stat.name === "hp";
                }).value} hp
            </span>
          </div>
          <div>
            <button onClick={this.toggleDetail}>
              {this.state.showDetails ? "Hide Details" : "Show Details"}
            </button>
            {this.state.showDetails && <PokemonDetails {...this.props}/> }
          </div>
        </div>
      </Card>;
  }
}
