<template>
  <div class="site-wrapper">
    <nuxt-link to="/">
      <img
        v-if="settings.logoPic"
        class="site-logo"
        :src="settings.logoPic"
        alt="Logo"
      >
      <span class="site-name">
        {{ settings.siteName || '细节个人博客' }}
      </span>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const settings = useSettings()
</script>

<style lang="scss" scoped>
.site-wrapper {
  a {
    display: flex;
    align-items: center;
    height: .24rem;
    text-decoration: none;
    color: var(--primary-text);

    .site-logo {
      width: .24rem;
      height: .24rem;
    }

    .site-name {
      margin-left: .08rem;
      font-weight: 700;
      font-size: .2rem;
    }
  }
}
</style>
