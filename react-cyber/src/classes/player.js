import Entity from './entity.js';

export default class Player extends Entity{
  constructor(options){
    super(options);
    this.level = 1;
    this.xpToNextLevel = 0;
    this.x = 2;
    this.y = 2;
    this.hp = 10;
    this.maxHp = 10;
    this.sprite = 'playersprite.png';
  }
}