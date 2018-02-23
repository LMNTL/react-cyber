class Entity{
  constructor(){
    this.x = -1;
    this.y = -1;
    this.sprite = '';
    this.status = 'none';
    this.name = '';
    this.active = true;
    this.hp = 0;
    this.armor = 0;
    this.inventory = [];
    this.attacks = {};
    this.speed = 10;
    this.pressure = 5;
    this.xp = 0;
    this.direction = 'right';
  }
}

module.exports = Entity;