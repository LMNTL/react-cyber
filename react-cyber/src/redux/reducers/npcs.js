import NPC from '../../classes/npc.js';

const initialState = {
    npcs: []
}

const npcs = (state = initialState, action) => {
    switch(action.type){
        case 'DAMAGE_NPC':
            const newHp = state.npcs[action.payload.id].hp - action.payload.damage;
            const isActive = newHp > 0;
            return {
                ...state,
                npcs: [
                    ...state.npcs.slice( 0, action.payload.id ),
                    { ...state.npcs[action.payload.id], hp: newHp, active: isActive },
                    ...state.npcs.slice( action.payload.id + 1 ),
                ]
            }
        case 'ADD_NPC':
            let newNpc = action.payload.npc;
            newNpc.id = state.npcs.length;
            return {
                ...state,
                npcs: state.npcs.concat(newNpc)
            }
        case 'MOVE_NPC':
            const newX = state.npcs[action.payload.id].x + action.payload.x;
            const newY = state.npcs[action.payload.id].y + action.payload.y;
            return {
                ...state,
                npcs: [
                    ...state.npcs.slice( 0, action.payload.id ),
                    {...state.npcs[action.payload.id], x: newX, y: newY},
                    ...state.npcs.slice( action.payload.id + 1 ),
                ]
            }
        default:
            return state;
    }
}

export default npcs;