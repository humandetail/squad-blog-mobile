<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="cover-pic-with-link"
  >
    <figure class="cover-pic">
      <img
        v-if="lazy"
        :class="lazyClassName"
        :data-src="url"
        :alt="alt"
      >
      <img
        v-else
        v-lazy="url"
        :alt="alt"
      >
    </figure>
  </nuxt-link>
  <figure v-else class="cover-pic">
    <img
      v-if="lazy"
      :class="lazyClassName"
      :data-src="url"
      :alt="alt"
    >
    <img
      v-else
      v-lazy="url"
      :alt="alt"
    >
  </figure>
</template>

<script setup lang="ts">
import { RouteRecord } from 'vue-router'

withDefaults(defineProps<{
  url: string;
  to?: RouteRecord | string;
  // custom lazyload
  lazy?: boolean;
  lazyClassName?: string;
  alt?: string;
}>(), {
  to: '',
  lazy: false,
  lazyClassName: '',
  alt: ''
})
</script>

<style lang="scss" scoped>
.cover-pic-with-link {
  display: block;
}

.cover-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 440 / 280;
  background-color: var(--img-background);

  img {
    display: block;
    width: auto !important;
    height: auto !important;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
