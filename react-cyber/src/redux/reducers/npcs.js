import NPC from '../../classes/npc.js';

const initialState = {
    npcs: []
}

const npcs = (state = initialState, action) => {
    switch(action.type){
        case 'DAMAGE_NPC':
            let npc = [...state.npcs];
            npc[action.payload.id].hp = state.npcs[action.payload.id].hp - action.payload.damage;
            if(state.npcs[action.payload.id].hp <= 0) npc[action.payload.id].active = false
            return {
                ...state,
                npcs: npc
            }
        case 'ADD_NPC':
            return {
                ...state,
                npcs: state.npcs.concat(action.payload.npc)
            }
        default:
            return state;
    }
}

export default npcs;