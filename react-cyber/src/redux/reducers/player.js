import Player from '../../classes/player.js';

const initialState = {
    player: new Player()
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return {
                ...state,
                player: {
                    ...state.player,
                    x: state.player.x + action.x,
                    y: state.player.y + action.y,
                    direction: action.direction
                } }
        case 'TAKE_DAMAGE':
            return {
                ...state,
                player: {
                    ...state.player,
                    hp: state.player.hp-action.damage
                }
            }
        case 'ADD_STATUS':
            return {
                ...state,
                player: {
                    ...state.player,
                    status: [action.status, ...state.status]
                }
            }
        case 'GET_XP':
            return {
                ...state,
                player: {
                    ...state.player,
                    xp: state.player.xp + action.payload.xp,
                    xpToNextLevel: state.player.xpToNextLevel - action.payload.xp
                }
            }
        case 'LEVEL_UP':
            return {
                ...state,
                player: {
                    ...state.player,
                    level: state.player.level + 1,
                    xpToNextLevel: action.payload.remainingXp,
                    attack: state.player.attack + 1,
                    maxHp: Math.floor( state.player.maxHp * 1.2 )
                }
            }
        default:
            return state;
    }
}

export default player;