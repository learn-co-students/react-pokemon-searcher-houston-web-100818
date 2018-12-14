import React from 'react'
import { Card, Confirm, Button } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor() {
    super()
    this.state = {
      open: false,
      isFront: true
    }
  }

  handleClick = () => this.setState({ isFront: !this.state.isFront })

  capitalizer = (name) => {
    const nameArray = name.split('')
    const capLetter = nameArray[0].toUpperCase()
    nameArray.splice(0,1,capLetter)
    return nameArray.join('')
  }

  findHP = (pokemon) => {
    const hpStat = pokemon.stats.find((stat) => stat.name === 'hp')

    return hpStat.value
  }

  // open = ()=>this.setState({open: true})
  // close = ()=>this.setState({open: false})

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
            <div className="header">{this.capitalizer(this.props.pokemon.name)} 
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" 
              // onClick = {this.props.deletePokemon(this.props.pokemon.id)} 
              />
              {this.findHP(this.props.pokemon)}
            </span>
            <div>
              <i className='delete icon' 
              link='true' 
              onClick/>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
