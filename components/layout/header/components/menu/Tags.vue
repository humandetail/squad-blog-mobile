<template>
  <section class="tags-wrapper">
    <header class="header">
      <h6 class="title">
        <span class="iconfont icon-tags" />
        文章标签
      </h6>
    </header>
    <ul class="tags">
      <li
        v-for="item in tags"
        :key="item.id"
        class="item"
      >
        <nuxt-link
          :to="`/tags/${item.name}`"
        >
          {{ item.displayName }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { TAGS } from '~~/config/api'
import { TagsData, PageResponseType } from '~~/types/response'

const tags = useTags()

const menuToggleButtonIsActive = useMenuToggleButtonIsActive()

watch(menuToggleButtonIsActive, async (isActive) => {
  if (isActive && tags.value.length === 0) {
    const { data } = await useCustomFetch<PageResponseType<TagsData>>(TAGS)
    tags.value = data.value.records || []
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.tags-wrapper {
  margin-top: .2rem;
  padding-top: .16rem;
  border-top: 1px solid var(--border-color);

  .title {
    display: flex;
    align-items: center;

    .iconfont {
      margin-right: .08rem;
      font-size: .2rem;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: .08rem;
    .item {
      a {
        display: inline-block;
        padding: 0 .16rem;
        color: var(--primary-text);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        &.router-link-exact-active {
          color: var(--brand-color);
        }
      }
    }
  }
}
</style>
