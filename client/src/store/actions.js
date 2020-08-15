import api from '@/api';
import * as actions from './action-types';
import * as mutations from './mutation-types';
import { LOAD_STATE } from './shared';

function addSalaryRanks(players) {
  let salaryPrevious = -1;
  let indexPrevious = 0;
  players.forEach((p, i) => {
    if (p.salary) {
      if (p.salary === salaryPrevious) {
        p.salaryRank = indexPrevious;
        p.salaryTie = true;
      } else {
        p.salaryRank = i;
        indexPrevious = i;
        salaryPrevious = p.salary;
        if (players[i + 1] && players[i + 1].salary === p.salary) {
          p.salaryTie = true;
        } else {
          p.salaryTie = false;
        }
      }
    } else {
      p.salaryRank = null;
    }
  });
}

async function getPlayers({ commit }) {
  try {
    commit(mutations.SET_PLAYERS_LOAD_STATE, LOAD_STATE.LOADING);
    const res = await api.getPlayers();
    if (res.data) {
      addSalaryRanks(res.data);
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
