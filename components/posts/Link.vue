<template>
  <component
    :is="postLink ? NuxtLink : 'span'"
    :to="link"
    class="post-link"
    :class="{ 'is-link': postLink }"
  >
    <span
      class="iconfont"
      :class="`icon-${isPrev ? 'arrow-left' : 'arrow-right'}`"
    />
    <span
      class="title"
    >
      {{ postLink ? postLink.title : '没有了' }}
    </span>
  </component>
</template>

<script setup lang="ts">

import { PostLinkType } from '~~/types/response'

const props = withDefaults(defineProps<{
  postLink: PostLinkType | null,
  isPrev?: boolean
}>(), {
  isPrev: false
})

const NuxtLink = resolveComponent('nuxt-link')

const link = computed(() => props.postLink ? `/posts/${props.postLink.id}` : undefined)
</script>

<style lang="scss" scoped>
.post-link {
  display: flex;
  align-items: center;
  color: var(--secondary-text);
  font-size: .14rem;

  &.is-link {
    cursor: pointer;
    text-decoration: none;
    font-size: inherit;

    &:hover {
      color: var(--primary-text);
    }
  }

  .iconfont {
    font-size: .2rem;
  }

  .title {
    padding: .04rem;
  }
}
</style>
