import Entity from './entity.js';

export class Player extends Entity{
  constructor(options){
    super(options);
    this.level = 1;
    this.xpToNextLevel = 0;
    this.sprite = 'playersprite.jpg';
  }
  attack = (npc, attackName) => {
    if(this.attack > npc.armor){
      npc.hp -= this.attack-npc.armor;
      if(npc.hp <= 0){
        npc.die();
      }
    }
  };
  static debug = () => {
    console.log('debug');
  }
}