<template>
  <div class="categories-page">
    <CommonTabs
      :tabs="tabs"
      :current="displayName"
    />
    <CategoriesWrapper />
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~~/config/api'
import { CategoriesData, PageResponseType } from '~~/types/response'

definePageMeta({
  key: route => 'categories-' + route.params.name,
  title: '分类',
  pageTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__rollIn',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  },
  layoutTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__zoomInUp',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  }
})

const route = useRoute()
const categories = useCategories()
const settings = useSettings()

if (!categories.value || categories.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<CategoriesData>>(CATEGORIES)
  categories.value = data.value.records || []
}

const displayName = computed(() => {
  const name = route.params.name as string
  const item = categories.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})

const tabs = computed(() => categories.value.map(item => ({ id: item.id, name: item.displayName, route: `/categories/${item.name}` })))

useHead({
  title: `${displayName.value} - ${settings.value.seoTitle}`
})
</script>

<style lang="scss" scoped>
.categories-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
