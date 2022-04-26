<template>
  <LayoutInfiniteScroll
    :fetch="infiniteFetch"
    :is-empty="total <= 0"
    :has-more="hasMore"
  >
    <section class="tags-wrapper">
      <CommonLoading :loading="loading">
        <div class="posts">
          <TagsItem
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
        </div>
      </CommonLoading>
    </section>
  </LayoutInfiniteScroll>
</template>

<script setup lang="ts">
import { POSTS_TAGS } from '~~/config/api'
import { PageResponseType, PostItem } from '~~/types/response'

const route = useRoute()

const tagName = computed(() => route.params.name)

const records = ref<PostItem[]>([])
const loading = ref(true)

const current = ref(1)
const pageSize = 10
const total = ref(0)

const hasMore = computed(() => {
  return Math.ceil(total.value / pageSize) > current.value
})

const infiniteFetch = async (isFirstFetch = false) => {
  if (!isFirstFetch) {
    current.value += 1
  }
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_TAGS, {
    params: {
      name: tagName.value,
      current: current.value,
      pageSize
    }
  })

  records.value.push(...(data.value.records || []))
  if (isFirstFetch) {
    total.value = data.value.total || 0
  }
}

await infiniteFetch(true)
loading.value = false
</script>

<style lang="scss" scoped>
.tags-wrapper {
  flex: 1;
  min-height: 0;
  padding: 0 .16rem;
  overflow-y: auto;

  .posts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
