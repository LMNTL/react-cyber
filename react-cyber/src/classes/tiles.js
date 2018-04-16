import React, { Component } from 'react';
import './tiles.css';
import PropTypes from 'prop-types';
import Player from './player.js';
import { connect } from 'react-redux';
import { movePlayer, damageNPC, getXP, levelUp, moveNpc, takeDamage, addMessage } from '../redux/actions';
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
    let direction;
    let movementVector;
    switch(event.keyCode){
      case 100:
        movementVector = [-1, 0];
        direction = 'left';
        break;
      case 98:
        movementVector = [0, 1];
        direction = 'down';
        break;
      case 102:
        movementVector = [1, 0];
        direction = 'right';
        break;
      case 104:
        movementVector = [0, -1];
        direction = 'up';
        break;
      default:
        break;
    }
    if( movementVector && this.isInBounds( x + movementVector[0], y + movementVector[1] ) ) {
      if( this.isEmpty( x + movementVector[0], y + movementVector[1] ) ) {
        this.props.movePlayer( movementVector[0], movementVector[1], direction );
      } else {
        let npc = this.getNpc( x + movementVector[0], y + movementVector[1] );
        if(npc !== false) this.attackNPC(npc);
        else moved = false;
      }
    } else moved = false;
    if( moved ) this.moveNpcs();
  }

  attackNPC = (enemy) => {
    let damage = this.attack(this.props.player, this.props.npcs[enemy]);
    if( this.props.npcs[ enemy ].hp <= damage ){
      this.props.getXP( this.props.npcs[enemy].xp );
      if( this.props.player.xpToNextLevel <= 0 )
        this.levelUp();
    }
    this.props.damageNPC(enemy, damage);
    this.props.addMessage(`You attacked the ${this.props.npcs[ enemy ].name} for ${damage} damage!`);
  }

  levelUp = () => {
    console.log( ( this.props.player.maxHp * 1.2 ).toFixed(0) );
    let remainingXp = this.props.player.xpToNextLevel;
    let levelsGained = 0;
    do{
      remainingXp += ( this.props.player.level + 1 ) * 100;
      levelsGained++;
    } while (remainingXp <= 0);
    for( let i = 0; i < levelsGained; i++ ){
      this.props.levelUp(remainingXp);
    }
  }

  moveNpcs = () => {
    this.props.npcs.forEach( npc => {
      if ( npc.active ){
        if ( npc.hostile ) this.moveTowardsPlayer( npc );
        else this.wander( npc );
      }
    } );
  }

  wander = ( npc ) => {
    return null;
  }

  moveTowardsPlayer = ( npc ) => {
    let xVector = npc.x - this.props.player.x;
    if( xVector != 0 ) xVector = xVector / Math.abs( xVector );
    const newX = this.props.player.x + xVector;
    let yVector = npc.y - this.props.player.y;
    if( yVector != 0 ) yVector = yVector / Math.abs( yVector );
    const newY = this.props.player.y + yVector;
    if ( this.isInBounds( newX, newY ) && this.isEmpty( newX, newY ) )
      this.props.moveNpc( -xVector, -yVector, npc.id );
    else if ( this.isPlayerAdjacent( npc.x, npc.y ) ) {
      this.attackPlayer( npc );
    }
  }

  attackPlayer = ( npc ) => {
    const damage = this.props.player.defense - npc.attack;
    this.props.takeDamage( damage );
    this.props.addMessage( `${npc.name} attacked you for ${damage} damage!` )
  }

  isPlayerAdjacent = ( x, y ) => {
    if ( Math.abs( this.props.player.x - x ) <= 1 && Math.abs( this.props.player.y - y ) <= 1 )
      return true;
    return false;
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
  movePlayer, damageNPC, getXP, levelUp, moveNpc, takeDamage, addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);