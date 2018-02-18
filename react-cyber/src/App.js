import React, { Component } from 'react';
//import Player from './classes/player.js';
import Tiles from './classes/tiles.js';
import Entities from './entities.js';

class App extends Component {
  render() {
    return (
      <div>
        <Tiles></Tiles>
        <Entities></Entities>
      </div>
    );
  }
}

export default App;
