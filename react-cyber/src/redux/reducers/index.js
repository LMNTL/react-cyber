import { combineReducers } from 'redux';
import player from './player.js';
import npcs from './npcs.js';
import messages from './messages.js';

const allReducers = combineReducers({
    player, npcs, messages
});

export default allReducers;