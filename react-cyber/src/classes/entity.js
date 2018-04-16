class Entity{
  constructor(){
    this.x = -1;
    this.y = -1;
    this.sprite = '';
    this.status = [];
    this.name = '';
    this.active = true;
    this.hp = 0;
    this.maxHp = 0;
    this.armor = 0;
    this.inventory = [];
    this.cyberware = [];
    this.attack = 1;
    this.defense = 1;
    this.speed = 10;
    this.pressure = 5;
    this.xp = 0;
    this.direction = 'right';
  }
}

module.exports = Entity;