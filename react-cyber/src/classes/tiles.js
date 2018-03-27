import React, { Component } from 'react';
import './tiles.css';
import PropTypes from 'prop-types';
import Player from './player.js';
import { connect } from 'react-redux';
import { movePlayer } from '../redux/actions';
let npc = require("./npc.js");


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

  setStateCache = () => {
    let cachedState = new Object();
    const addToCache = (cacheKey, cacheValue) => {
      if(cacheKey !== "none" && cacheValue !== "none") {
        cachedState[cacheKey.toString()] = cacheValue;
      } else {
        this.setState(cachedState);
      }
    }
    return addToCache;
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
    const addToState = this.setStateCache();
    changedPlayer.x += distance[0];
    changedPlayer.y += distance[1];
    addToState("player", changedPlayer);
    addToState("none", "none");
    //this.setState({player: changedPlayer});

  }
  
  isEmpty = (x, y) => {
    return !this.state.entities.some(entity => (entity.x === x && entity.y === y)) && this.state.tiles[x][y] === 'empty';
  }
  
  isInBounds = (x, y) => {
    return (x >= 0 && y >= 0 && x < this.state.xBound && y < this.state.yBound);
  }

  addEntity = (entity) => {
    const updatedEntities = this.state.entities;
    updatedEntities.push(entity);
    this.setState({entities: updatedEntities});
  }
  
  randomEmptyAdj = (x, y) => {
    let emptyAdj = []
    if(this.isInBounds(x-1,y) && this.isEmpty(x-1,y)) emptyAdj.push([x-1,y]);
    if(this.isInBounds(x+1,y) && this.isEmpty(x+1,y)) emptyAdj.push([x+1,y]);
    if(this.isInBounds(x,y-1) && this.isEmpty(x,y-1)) emptyAdj.push([x,y-1]);
    if(this.isInBounds(x,y+1) && this.isEmpty(x,y+1)) emptyAdj.push([x,y+1]);
    return emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  }
  
  handleKeyDown = (event) => {
    const addToState = this.setStateCache();
    let moved = true;
    const x = this.state.player.x;
    const y = this.state.player.y;
    switch(event.keyCode){
      case 100: //left
        if(this.isInBounds(x-1,y)) {
          if(this.isEmpty(x-1,y)) {
            this.props.movePlayer(-1, 0, 'left');
          }
        }
        break;
      case 98: //down
        if(this.isInBounds(x,y+1)) {
          if(this.isEmpty(x,y+1)) {
            this.props.movePlayer(0, 1, 'down');
          }
        }
        break;
      case 102: //right
        if(this.isInBounds(x+1,y)) {
          if(this.isEmpty(x+1,y)) {
            this.props.movePlayer(1, 0, 'right');
          }
        }
        break;
      case 104: //up
        if(this.isInBounds(x,y-1)) {
          if(this.isEmpty(x,y-1)) {
            this.props.movePlayer(0, -1, 'up');
          }
        }
        break;
       default:
        moved = false;
        break;
    }
    if(moved){

    }
    addToState('none', 'none');
  }

  isVisible = (x, y) => {
    const [playerX, playerY] = [this.props.player.x, this.props.player.y];
    return Math.abs(x-playerX) <= 2 && Math.abs(y-playerY) <= 2;
  }

  componentDidMount(){
    const newPlayer = new Player();
    newPlayer.x = 2;
    newPlayer.y = 2;
    this.state.entities.push(newPlayer);
    const emptyWorld = [...Array(this.state.xBound).keys()].map(i => Array(this.state.yBound));
    this.setState({tiles: emptyWorld, player: newPlayer});
    this.addRect(0, 0, 40, 40, "empty");
    this.addRect(2, 2, 1, 1, "red");
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
                  style={{gridColumn: (xIndex+3-this.props.player.x) / 1, gridRow: (yIndex+3-this.props.player.y) / 1}}
                  key={[xIndex, yIndex]}>
                </div>
              ) : null;
            })
          ))}
        </div>
        <div className='entities'>
          <img
              className={this.props.player.direction + ' player'}
              style={{gridColumn: 3 / 1, gridRow: 3 / 1}}
              src={this.props.player.sprite}>
          </img>
          {this.state.entities.map((entity, index) => {
            return (<div key={index} style={{gridColumn: entity.x+1 / 1, gridRow: entity.y+1 / 1}}>cat</div>)
          })}
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player.player
  };
}

const mapDispatchToProps = {
  movePlayer 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);