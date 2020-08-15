<template>
  <nav class="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <img src="@/assets/logo.png" style="max-height: 2.5em" alt="Logo" />
        </router-link>
        <a
          id="navbarMenuBurger"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbarMenu">
        <div class="navbar-start">
          <!-- <router-link :to="{ name: 'home' }" class="navbar-item">Home</router-link> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          const { target } = el.dataset;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  },
  watch: {
    // eslint-disable-next-line
    $route() {
      const elements = [document.getElementById('navbarMenu'), document.getElementById('navbarMenuBurger')];
      elements.forEach((el) => {
        if (el) {
          el.classList.remove('is-active');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-item {
  font-weight: 500;
  color: #434343;
  font-size: 0.95em;
}
</style>
