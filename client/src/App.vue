<template>
  <div id="app">
    <the-navbar v-if="!['login', 'signup'].includes($route.name)" />
    <router-view class="router-view-container"></router-view>
    <the-footer v-if="!['login', 'signup'].includes($route.name)"></the-footer>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'app',
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-view-container {
  min-height: calc(100vh - 102px - 169px);
}
</style>
