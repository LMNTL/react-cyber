import React, { Component } from 'react';
import './tiles.css';

class Tiles extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      xBound: 5,
      yBound: 5,
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

  componentDidMount(){
    const emptyWorld = [...Array(this.state.xBound).keys()].map(i => Array(this.state.yBound));
    this.setState({tiles: emptyWorld});
    this.addRect(0, 0, 5, 5, "empty");
    this.addRect(2, 2, 1, 1, "red");
  }

  render(){
    return this.state.tiles ? (
      <div className="root">
        {this.state.tiles.map((row, xIndex) => (
          row.map((cell, yIndex) => {
            return (<div className={cell} key={[xIndex, yIndex]}>{cell}</div>);
          })
        ))}
      </div>
    ) : null;
  }
}

export default Tiles;