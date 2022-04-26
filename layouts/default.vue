<template>
  <LayoutHeaderHome v-if="route.name === 'index'" />
  <LayoutHeaderDefault
    v-else
    :title="route.meta.title + ''"
  />

  <main class="main">
    <slot />
  </main>

  <Teleport to="body">
    <CommonThemeToggleButton />
    <CommonBackTop />
  </Teleport>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
