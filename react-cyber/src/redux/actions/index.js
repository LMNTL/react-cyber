//constants

const DIE = "DIE";
const SPAWN_NPC = "SPAWN_NPC";
const MOVE_PLAYER = "MOVE_PLAYER";

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

export const spawn_npc = npc => {
  return {
    type: SPAWN_NPC,
    npc
  }
}