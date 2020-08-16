import Vue from 'vue';
import Vuex from 'vuex';
import { LOAD_STATE } from './shared';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: null,
    playersLoadState: LOAD_STATE.UNLOADED,
    qualifyingOffer: null,
    cutoffSalary: null,
  },
  mutations,
  actions,
  modules: {},
});
