import * as mutations from './mutation-types';

export default {
  [mutations.SET_PLAYERS](state, payload) {
    state.players = payload;
  },
  [mutations.SET_PLAYERS_LOAD_STATE](state, payload) {
    state.playersLoadState = payload;
  },
};
