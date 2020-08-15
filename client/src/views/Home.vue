<template>
  <div>
    <div v-if="loadState === LOAD_STATE.ERROR_LOADING">
      <div class="container">
        <p class="tip danger">Error loading data 🤧</p>
      </div>
    </div>
    <div v-else v-loading="[LOAD_STATE.LOADING, LOAD_STATE.UNLOADED].includes(loadState)">
      <section class="section">
        <div class="container">
          <player-table />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import PlayerTable from '@/components/PlayerTable';
import { LOAD_STATE } from '@/store/shared';
import { GET_PLAYERS } from '@/store/action-types';

export default {
  name: 'Home',
  components: {
    PlayerTable,
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
  },
  created() {
    if (this.$store.state.playersLoadState === LOAD_STATE.UNLOADED) {
      this.$store.dispatch(GET_PLAYERS);
    }
  },
};
</script>
