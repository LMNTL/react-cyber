import Entity from './entity.js';
import Player from './player.js';

export default class NPC extends Entity{
  constructor(){
    super();
    this.id = -1;
    this.hostile = true;
  }
}
