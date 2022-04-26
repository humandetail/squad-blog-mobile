<template>
  <nuxt-link
    class="post-tag"
    :to="`/tags/${tag.name}`"
  >
    {{ tag.displayName }}
  </nuxt-link>
</template>

<script setup lang="ts">
import { TagItem } from '~~/types/response'

defineProps<{
  tag: TagItem
}>()
</script>

<style lang="scss" scoped>
.post-tag {
  display: inline-block;
  height: .22rem;
  padding: 0 .08rem;
  color: var(--plain-color);
  font-size: .14rem;
  line-height: .22rem;
  text-decoration: none;
  border-radius: .04rem;
  background-color: var(--success-color);

  &:hover {
    opacity: .9;
  }
}
</style>
