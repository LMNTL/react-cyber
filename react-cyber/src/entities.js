import React, { Component } from 'react';
//import Player from './classes/player.js';
import './entities.css';
var player = require("./classes/player.js");
var ReactGridLayout = require('react-grid-layout');

class Entities extends Component{
  constructor(props) {
    super(props);
    this.state = {
      player: null
    };
  }
  
  componentDidMount(){
    const newPlayer = new player.Player();
    this.setState({
      player: newPlayer
    });
  }

  render(){
    var layout = [
      {i: 'a', x: 2, y: 2, w: 1, h: 1, static: true}
    ];
    return this.state ? ( 
      <ReactGridLayout className="root" layout={layout} cols={5} rows={5} width={100} rowHeight={100}>
        <div key='a'><img className='player' src={this.state.player ? this.state.player.sprite : null }></img></div>
      </ReactGridLayout>
    ) : null;
  }
}

export default Entities;