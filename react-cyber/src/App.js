import React, { Component } from 'react';
import Tiles from './classes/tiles.js';
import HUD from './classes/hud.js';

class App extends Component {
  render() {
    return (
      <div>
        <Tiles></Tiles>
        <HUD></HUD>
      </div>
    );
  }
}

export default App;
