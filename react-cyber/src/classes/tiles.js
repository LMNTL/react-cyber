import React, { Component } from 'react';
import './tiles.css';
import PropTypes from 'prop-types';
import Player from './player.js';
import { connect } from 'react-redux';
import { movePlayer, damageNPC } from '../redux/actions';
import NPC from "./npc.js";


class Tiles extends Component{
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      tiles: [],
      xBound: 100,
      yBound: 100,
      player: null
    };
  }

  addRect(x, y, xLength, yLength, value){
    if(x + xLength > this.state.yBound || y + yLength > this.state.yBound){
      console.log("created rectangle out of world bounds")
      return false;
    }
    let newTile = this.state.tiles;
    for(let i = x; i < x + xLength; i++) {
      newTile.push([]);
      for(let k = y; k < y + yLength; k++) {
        newTile[i][k] = value;
      } 
    }
    this.setState( { tiles: newTile } );
    return true;
  }
  
  isEmpty = (x, y) => {
    return !this.props.npcs.some(entity => (entity.x === x && entity.y === y && entity.active)) && this.state.tiles[x][y] === 'empty' && [this.props.player.x, this.props.player.y] !== [x,y];
  }
  
  isInBounds = (x, y) => {
    return (x >= 0 && y >= 0 && x < this.state.xBound && y < this.state.yBound);
  }

  getNpc = (x, y) => {
    if(this.props.npcs.some(entity => (entity.x === x && entity.y === y)) )
      return this.props.npcs.findIndex(entity => (entity.x === x && entity.y === y));
    return false;
  }

  randomEmptyAdj = (x, y) => {
    let emptyAdj = []
    if(this.isInBounds(x-1,y) && this.isEmpty(x-1,y)) emptyAdj.push([x-1,y]);
    if(this.isInBounds(x+1,y) && this.isEmpty(x+1,y)) emptyAdj.push([x+1,y]);
    if(this.isInBounds(x,y-1) && this.isEmpty(x,y-1)) emptyAdj.push([x,y-1]);
    if(this.isInBounds(x,y+1) && this.isEmpty(x,y+1)) emptyAdj.push([x,y+1]);
    return emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  }

  attack = (attacker, defender) => {
    let damage;
    damage = attacker.attack - defender.defense;
    return damage;
  }

  randomEmpty = () => {
    let [x, y] = [null,null];
    do{
      x = Math.floor(Math.random() * this.state.xBound);
      y = Math.floor(Math.random() * this.state.yBound);
    } while (this.isEmpty(x,y));
    return [x, y];
  }
  
  handleKeyDown = (event) => {
    let moved = true;
    const x = this.props.player.x;
    const y = this.props.player.y;
    switch(event.keyCode){
      case 100: //left
        if(this.isInBounds(x-1,y)) {
          if(this.isEmpty(x-1,y)) {
            this.props.movePlayer(-1, 0, 'left');
          } else {
            let enemy = this.getNpc(x-1,y);
            if(enemy !== false) this.props.damageNPC(enemy, this.attack(this.props.player, this.props.npcs[enemy]));
          }
        }
        break;
      case 98: //down
        if(this.isInBounds(x,y+1)) {
          if(this.isEmpty(x,y+1)) {
            this.props.movePlayer(0, 1, 'down');
          } else {
            let enemy = this.getNpc(x,y+1);
            if(enemy !== false) this.props.damageNPC(enemy, this.attack(this.props.player, this.props.npcs[enemy]));
          }
        }
        break;
      case 102: //right
        if(this.isInBounds(x+1,y)) {
          if(this.isEmpty(x+1,y)) {
            this.props.movePlayer(1, 0, 'right');
          } else {
            let enemy = this.getNpc(x+1,y);
            if(enemy !== false) this.props.damageNPC(enemy, this.attack(this.props.player, this.props.npcs[enemy]));
          }
        }
        break;
      case 104: //up
        if(this.isInBounds(x,y-1)) {
          if(this.isEmpty(x,y-1)) {
            this.props.movePlayer(0, -1, 'up');
          } else {
            let enemy = this.getNpc(x,y-1);
            if(enemy !== false) this.props.damageNPC(enemy, this.attack(this.props.player, this.props.npcs[enemy]));
          }
        }
        break;
       default:
        moved = false;
        break;
    }
    if(moved){
    }
  }

  isVisible = (x, y) => {
    const [playerX, playerY] = [this.props.player.x, this.props.player.y];
    return Math.abs(x-playerX) <= 2 && Math.abs(y-playerY) <= 2;
  }

  componentDidMount(){
    const emptyWorld = [...Array(this.state.xBound).keys()].map(i => Array(this.state.yBound));
    this.setState({tiles: emptyWorld});
    this.addRect(0, 0, 40, 40, "empty");
    this.addRect(3, 3, 20, 20, "red");
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  render(){
    return this.state.tiles && this.props ? (
      <div>
        <div className="root">
          {this.state.tiles.map((row, xIndex) => (
            row.map((cell, yIndex) => {
              return this.isVisible (xIndex, yIndex) ? (
                <div
                  className={cell}               
                  style={{
                    gridColumn: (xIndex+3-this.props.player.x) / 1,
                    gridRow: (yIndex+3-this.props.player.y) / 1 }}
                  key={[xIndex, yIndex]}>
                </div>
              ) : null;
            })
          ))}
        </div>
        <div className='entities'>
          <img
              className={`${this.props.player.direction} player ${this.props.player.animation}`}
              style={{
                gridColumn: 3 / 1,
                gridRow: 3 / 1 }}
              src={this.props.player.sprite}>
          </img>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player.player,
    npcs: state.npcs.npcs
  };
} 

const mapDispatchToProps = {
  movePlayer, damageNPC  
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);