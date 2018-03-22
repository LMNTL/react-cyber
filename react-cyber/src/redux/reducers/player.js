import Player from '../../classes/player.js';

const initialState = {
    player: new Player()
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return { ...state, player: {...player, x: action.x, y: action.y} }
        default:
            return state;
    }
}

export default player;