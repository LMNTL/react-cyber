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
    newPlayer.x = 2;
    newPlayer.y = 2;
    this.setState({
      player: newPlayer
    });
    window.addEventListener("onkeyup", this.move);
  }
  
  move = (event) => {
    console.log('moving!');
    let nextPlayer = this.player;
    switch(event.key){
      case "ArrowLeft": //left
        nextPlayer.moveLeft();
        break;
      default:
        break;
    }
    this.setState({ player: nextPlayer });
  }
  
  render(){
    var layout = this.state.player ? [
      {i: 'player', x: this.state.player.x , y: this.state.player.y, w: 1, h: 1, static: true}
    ] : [];
    return this.state ? (
        <div key='player'><img className='player' src={this.state.player ? this.state.player.sprite : null }></img></div>
    ) : null;
  }
}

export default Entities;