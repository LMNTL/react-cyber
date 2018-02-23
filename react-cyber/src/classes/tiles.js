import React, { Component } from 'react';
import './tiles.css';
var player = require("./player.js");
var npc = require("./npc.js");

class Tiles extends Component{
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      tiles: [],
      xBound: 5,
      yBound: 5,
      player: null
    };
  }

  addRect(x, y, xLength, yLength, value){
    if(x + xLength > this.state.yBound || y + yLength > this.state.yBound){
      console.log("created rectangle out of world bounds")
      return null;
    }
    let newTile = this.state.tiles;
    for(let i = x; i < x + xLength; i++) {
      newTile.push([]);
      for(let k = y; k < y + yLength; k++) {
        newTile[i][k] = value;
      }
    }
    this.setState({tiles: newTile});
  }
  
  movePlayer = (distance) => {
    let changedPlayer = this.state.player;
    changedPlayer.x += distance[0];
    changedPlayer.y += distance[1];
    this.setState({player: changedPlayer});
  }
  
  isEmpty = (x, y) => {
    return !this.state.entities.some(entity => (entity.x === x && entity.y === y));
  }
  
  setDirection = (direction) => {
    let rotatedPlayer = this.state.player;
    rotatedPlayer.direction = direction;
    this.setState({player: rotatedPlayer});
  }
  
  addEntity = (entity) => {
    const updatedEntities = this.state.entities;
    updatedEntities.push(entity);
    this.setState({entities: updatedEntities});
  }
  
  handleKeyDown = (event) => {
    const x = this.state.player.x;
    const y = this.state.player.y;
    switch(event.keyCode){
      case 100: //left
        if(x > 0 && this.state.tiles[x-1][y] == 'empty' && this.isEmpty(x-1,y)){
          this.setDirection('left');
          this.movePlayer([-1, 0]);
        }
        break;
      case 98: //down
        if(y >= 0 && this.state.tiles[x][y+1] == 'empty' && this.isEmpty(x,y+1)){
          this.setDirection('down');
          this.movePlayer([0, +1]);
        }
        break;
      case 102: //right
        if(x < this.state.xBound && this.state.tiles[x+1][y] == 'empty' && this.isEmpty(x+1,y)){
          this.setDirection('right');
          this.movePlayer([+1, 0]);
        }
        break;
      case 104: //up
        if(y < this.state.yBound && this.state.tiles[x][y-1] == 'empty' && this.isEmpty(x,y-1)){
          this.setDirection('up');
          this.movePlayer([0, -1]);
        }
        break;
       default:
        break;
    }
    console.log(`${this.state.player.x}, ${this.state.player.y}`);
  }

  componentDidMount(){
    const newPlayer = new player.Player();
    newPlayer.x = 2;
    newPlayer.y = 2;
    this.state.entities.push(newPlayer);
    const emptyWorld = [...Array(this.state.xBound).keys()].map(i => Array(this.state.yBound));
    this.setState({tiles: emptyWorld, player: newPlayer});
    this.addRect(0, 0, 5, 5, "empty");
    this.addRect(2, 2, 1, 1, "red");
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    let cat = new npc.NPC();
    cat.x = 4;
    cat.y = 4;
    this.addEntity(cat);
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  render(){
    return this.state.tiles && this.state.player ? (
      <div>
        <div className="root">
          {this.state.tiles.map((row, xIndex) => (
            row.map((cell, yIndex) => {
              return (<div className={cell} gridColumn={(xIndex+1)+'/1'} gridRow={(yIndex+1)+'/1'} key={[xIndex, yIndex]}></div>);
            })
          ))}
        </div>
        <div className='entities'>
          <img className={this.state.player.direction + ' player'} style={{gridColumn: this.state.player.x+1 / 1, gridRow: this.state.player.y+1 / 1}} src={this.state.player ? this.state.player.sprite : null }></img>
          {this.state.entities.map((entity, index) => {
            return (<div key={index} style={{gridColumn: entity.x+1 / 1, gridRow: entity.y+1 / 1}}>cat</div>)
          })}
        </div>
      </div>
    ) : null;
  }
}

export default Tiles;