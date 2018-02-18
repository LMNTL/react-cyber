import Entity from './entity.js';
import Player from './player.js';

class NPC extends Entity{
  constructor(options){
    super(options);
    this.nerve;
  }
  die = () => {
    this.active = false;    
  };
}

module.exports = NPC;