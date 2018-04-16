//constants

const DIE = "DIE";
const SPAWN_NPC = "SPAWN_NPC";
const MOVE_PLAYER = "MOVE_PLAYER";
const TAKE_DAMAGE = "TAKE_DAMAGE";
const LEVEL_UP = "LEVEL_UP";
const ADD_STATUS = "ADD_STATUS";
const DAMAGE_NPC = "DAMAGE_NPC";
const ADD_NPC = "ADD_NPC";
const MOVE_NPC = "MOVE_NPC";
const GET_XP = "GET_XP";
const ADD_MESSAGE = "ADD_MESSAGE";

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

export const levelUp = (remainingXp) => {
  return {
    type: LEVEL_UP,
    payload: {
      remainingXp
    }
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

export const getXP = (xp) => {
  return {
    type: GET_XP,
    payload: {
      xp
    }
  }
}

export const moveNpc = ( x, y, id ) => {
  return {
    type: MOVE_NPC,
    payload: {
      x,
      y,
      id
    }
  }
}

export const addMessage = ( message ) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      message
    }
  }
}