import Player from '../../classes/player.js';

const initialState = {
    player: new Player()
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return { ...state, player: {...state.player, x: state.player.x + action.x, y: state.player.y + action.y, direction: action.direction} }
        default:
            return state;
    }
}

export default player;