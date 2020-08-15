import api from '@/api';
import * as actions from './action-types';
import * as mutations from './mutation-types';
import { LOAD_STATE } from './shared';

async function getPlayers({ commit }) {
  try {
    commit(mutations.SET_PLAYERS_LOAD_STATE, LOAD_STATE.LOADING);
    const res = await api.getPlayers();
    if (res.data) {
      commit(mutations.SET_PLAYERS, res.data);
      commit(mutations.SET_PLAYERS_LOAD_STATE, LOAD_STATE.LOADED);
      return LOAD_STATE.LOADED;
    }
  } catch (e) {
    console.log(e);
    commit(mutations.SET_PLAYERS_LOAD_STATE, LOAD_STATE.ERROR_LOADING);
    return LOAD_STATE.ERROR_LOADING;
  }
}

export default {
  [actions.GET_PLAYERS]: getPlayers,
};
