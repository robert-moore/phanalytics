import * as mutations from './mutation-types';

export default {
  [mutations.SET_PLAYERS](state, payload) {
    state.players = payload;
  },
  [mutations.SET_PLAYERS_LOAD_STATE](state, payload) {
    state.playersLoadState = payload;
  },
  [mutations.SET_QUALIFYING_OFFER](state, payload) {
    state.qualifyingOffer = payload;
  },
  [mutations.SET_CUTOFF_SALARY](state, payload) {
    state.cutoffSalary = payload;
  },
};
