<template>
  <div>
    <section class="section">
      <div class="container">
        <el-divider></el-divider>
        <nav class="level">
          <div class="level-left">
            <router-link :to="{ name: 'home' }" class="level-item is-size-6">
              <span class="has-text-weight-bold">Phanalytics</span>
            </router-link>
            <a href="mailto:me@robmoo.re" target="_blank" class="level-item">Contact Me</a>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.level-item {
  color: #4a4a4a;
  margin-left: 30px;
  font-weight: 400;
  font-size: 0.85em;
  text-transform: uppercase;
}
</style>
