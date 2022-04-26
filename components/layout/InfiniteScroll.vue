<template>
  <section
    ref="el"
    class="infinite-scroll-container"
  >
    <slot />
    <CommonLoading
      v-if="!isEmpty"
      :loading="loading"
      font-size=".2rem"
    />
    <div v-if="!isEmpty && !loading && !hasMore" class="no-more">
      - 我也是有底线的 -
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  fetch: Function;
  isEmpty: Boolean;
  hasMore?: boolean;
}>(), {
  hasMore: true
})

const loading = ref(false)
const el = ref()

useInfiniteScroll(
  el,
  async () => {
    if (!props.hasMore) {
      loading.value = false
      return
    }
    loading.value = true
    await props.fetch()
    setTimeout(() => {
      loading.value = false
    }, 2000)
  },
  { distance: 20 }
)
</script>

<style lang="scss" scoped>
.infinite-scroll-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  .no-more {
    text-align: center;
    color: var(--secondary-text);
    line-height: .44rem;
  }
}
</style>
