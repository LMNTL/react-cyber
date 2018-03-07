import Entity from './entity.js';

export class Player extends Entity{
  constructor(options){
    super(options);
    this.level = 1;
    this.xpToNextLevel = 0;
    this.sprite = 'playersprite.png';
  }
}