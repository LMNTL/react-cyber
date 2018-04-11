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
        case 'LEVEL_UP':
            return {
                ...state,
                player: {
                    ...state.player,
                    level: state.player.level+1,
                    xpToNextLevel: state.player.level*100,
                    maxHp: state.player.maxHp*1.15
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
        default:
            return state;
    }
}

export default player;