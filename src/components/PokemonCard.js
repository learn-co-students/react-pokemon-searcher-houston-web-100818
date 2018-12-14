import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showFront: true
    };
  }

  currentImage = () => {
    if (this.state.showFront) {
      return this.props.pokemon.sprites.front;
    } else {
      return this.props.pokemon.sprites.back;
    }
  };

  hp = () => {
    let myHp = this.props.pokemon.stats.find(stat => stat.name == "hp").value;

    return myHp;
  };

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img
              src={this.currentImage()}
              alt="oh no!"
              onClick={() =>
                this.setState(state => {
                  state.showFront = !state.showFront;
                  return state;
                })
              }
            />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.hp()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
