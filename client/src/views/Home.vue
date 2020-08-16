<template>
  <div class="grade">
    <div v-if="loadState === LOAD_STATE.ERROR_LOADING">
      <div class="container">
        <p class="tip danger">Error loading data 🤧</p>
      </div>
    </div>
    <div v-else v-loading="[LOAD_STATE.LOADING, LOAD_STATE.UNLOADED].includes(loadState)">
      <section class="section has-small-padding-bottom">
        <div class="container">
          <h1 class="is-size-2 has-text-weight-semibold has-text-centered">MLB Qualifying Offer in 2016</h1>
          <div class="divider"></div>
        </div>
      </section>
      <section class="section has-padding-vertical">
        <div class="container">
          <div
            class="has-diffused-shadow has-large-padding-horizontal has-large-padding-vertical has-border-radius-16 has-background-white"
          >
            <salary-histogram v-if="players" />
          </div>
        </div>
      </section>
      <section class="section has-large-padding-top">
        <div class="container">
          <div
            class="has-diffused-shadow has-large-padding-horizontal has-large-padding-vertical has-border-radius-16 has-background-white"
          >
            <player-table v-if="players" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import PlayerTable from '@/components/PlayerTable';
import SalaryHistogram from '@/components/SalaryHistogram';
import { LOAD_STATE } from '@/store/shared';
import { GET_PLAYERS } from '@/store/action-types';

export default {
  name: 'Home',
  components: {
    PlayerTable,
    SalaryHistogram,
  },
  data() {
    return {
      LOAD_STATE,
    };
  },
  computed: {
    loadState() {
      return this.$store.state.playersLoadState;
    },
    players() {
      return this.$store.state.players;
    },
  },
  created() {
    if (this.$store.state.playersLoadState === LOAD_STATE.UNLOADED) {
      this.$store.dispatch(GET_PLAYERS);
    }
  },
};
</script>
