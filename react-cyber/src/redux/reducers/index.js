import { combineReducers } from 'redux';
import player from './player.js';
import npcs from './npcs.js';

const allReducers = combineReducers({
    player, npcs
});

export default allReducers;