import React, { Component } from 'react';
import Tiles from './classes/tiles.js';
import HUD from './classes/hud.js';
import Entities from './classes/entities.js';
import MessageLog from './classes/messagelog.js';

class App extends Component {
  render() {
    return (
      <div>
        <Tiles></Tiles>
        <HUD></HUD>
        <Entities></Entities>
        <MessageLog></MessageLog>
      </div>
    );
  }
}

export default App;
