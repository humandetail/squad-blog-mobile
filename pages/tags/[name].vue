<template>
  <div class="tags-page">
    <CommonTabs
      :tabs="tabs"
      :current="displayName"
    />
    <TagsWrapper />
  </div>
</template>

<script setup lang="ts">
import { TAGS } from '~~/config/api'
import { TagsData, PageResponseType } from '~~/types/response'

definePageMeta({
  key: route => 'tags-' + route.params.name,
  title: '标签',
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
const tags = useTags()
const settings = useSettings()

if (!tags.value || tags.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<TagsData>>(TAGS)
  tags.value = data.value.records || []
}

const displayName = computed(() => {
  const name = route.params.name as string
  const item = tags.value.find(item => item.name === name)

  return item ? item.displayName : '-'
})

const tabs = computed(() => tags.value.map(item => ({ id: item.id, name: item.displayName, route: `/tags/${item.name}` })))

useHead({
  title: `${displayName.value} - ${settings.value.seoTitle}`
})
</script>

<style lang="scss" scoped>
.tags-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
