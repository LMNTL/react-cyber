//constants

const DIE = "DIE";
const SPAWN_NPC = "SPAWN_NPC";
const MOVE_PLAYER = "MOVE_PLAYER";
const TAKE_DAMAGE = "TAKE_DAMAGE";
const LEVEL_UP = "LEVEL_UP";
const ADD_STATUS = "ADD_STATUS";
const DAMAGE_NPC = "DAMAGE_NPC";
const ADD_NPC = "ADD_NPC";

// actions
export const die = npcID => {
  return {
    type: DIE,
    npcID
  }
}

export const movePlayer = (x, y, direction) => {
  return {
    type: MOVE_PLAYER,
    x,
    y,
    direction
  }
}

export const takeDamage = damage => {
  return {
    type: TAKE_DAMAGE,
    damage
  }
}

export const levelUp = () => {
  return {
    type: LEVEL_UP
  }
}

export const addStatus = status => {
  return {
    type: ADD_STATUS,
    status
  }
}

export const damageNPC = (id, damage) => {
  return {
    type: DAMAGE_NPC,
    payload: {
      id,
      damage
    }
  }
}

export const addNPC = (npc, id) => {
  return {
    type: ADD_NPC,
    payload: {
      npc,
      id
    }
  }
}