import Entity from './entity.js';
import Player from './player.js';

export class NPC extends Entity{
  constructor(){
    super();
    this.nerve;
  }
  die = () => {
    this.active = false;    
  };
}
