<template>
  <nav class="nav-wrapper">
    <ul class="nav">
      <li
        class="item"
      >
        <nuxt-link
          to="/"
        >
          首页
        </nuxt-link>
      </li>
      <li
        v-for="item in categories"
        :key="item.id"
        class="item"
      >
        <nuxt-link
          :to="`/categories/${item.name}`"
        >
          {{ item.displayName }}
        </nuxt-link>
      </li>
      <li
        class="item"
      >
        <nuxt-link
          to="/about"
        >
          关于我
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~~/config/api'
import { CategoriesData, PageResponseType } from '~~/types/response'

const menuToggleButtonIsActive = useMenuToggleButtonIsActive()

const categories = useCategories()

watch(menuToggleButtonIsActive, async (isActive) => {
  if (isActive && categories.value.length === 0) {
    const { data } = await useCustomFetch<PageResponseType<CategoriesData>>(CATEGORIES)
    categories.value = data.value.records || []
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.nav-wrapper {
  font-size: .16rem;
  .nav {
    margin-top: .16rem;
    .item {
      & + .item {
        margin-top: .08rem;
      }

      a {
        display: inline-block;
        color: var(--primary-text);
        text-decoration: none;

        &:hover {
          color: var(--brand-color);
        }

        &.router-link-exact-active {
          color: var(--brand-color);
        }
      }
    }
  }
}
</style>
