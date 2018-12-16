import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  constructor() {
    super();
    this.state = {
      backCard: false
    };
  }

  setSprites() {
    if (this.state.backCard === false) {
      return this.props.poke.sprites.front;
    } else {
      return this.props.poke.sprites.back;
    }
  }

  onToggleHandler = () => {
    console.log("click");
    this.setState({ backCard: !this.state.backCard });
  };

  mapHp() {
    let hp = this.props.poke.stats.find(stats => stats.name === "hp");

    return hp.value;
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.onToggleHandler}>
            <img src={this.setSprites()} alt="" />
          </div>
          <div className="content">
            <div className="header">{this.props.poke.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.mapHp()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
