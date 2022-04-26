<template>
  <div class="search-page">
    <LayoutHeaderSearch
      v-model:keyword="keyword"
      @search="handleSearch"
    />

    <ClientOnly>
      <LayoutInfiniteScroll
        :fetch="infiniteFetch"
        :is-empty="total <= 0"
        :has-more="hasMore"
      >
        <SearchHistory
          :fixed-keyword="fixedKeyword"
          @search="handleHistorySearch"
        />
        <CommonLoading :loading="loading">
          <template v-if="alreadySearch && total <= 0">
            <SearchNoResultTips
              :fixed-keyword="fixedKeyword"
            />
            <SearchSuggestion />
          </template>
          <section
            v-if="alreadySearch && total > 0"
            class="results-wrapper"
          >
            <SearchHasResultTips
              :fixed-keyword="fixedKeyword"
              :total="total"
            />
            <SearchResult
              :records="records"
              :fixed-keyword="fixedKeyword"
            />
          </section>
        </CommonLoading>
      </LayoutInfiniteScroll>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { POSTS_SEARCH } from '~~/config/api'
import { PageResponseType, PostItem } from '~~/types/response'

definePageMeta({
  layout: false,
  key: 'search',
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

const settings = useSettings()

useHead({
  title: `搜索 - ${settings.value.seoTitle}`
})

const keyword = ref('')
const fixedKeyword = ref('')

const records = ref<PostItem[]>([])
const alreadySearch = ref(false)
const loading = ref(false)

const current = ref(1)
const pageSize = 10
const total = ref(0)

const hasMore = computed(() => {
  if (!alreadySearch.value) {
    return true
  }
  return Math.ceil(total.value / pageSize) > current.value
})

const setDedefault = () => {
  current.value = 1
  total.value = 0
  alreadySearch.value = false
  records.value = []
}

const handleSearch = async () => {
  setDedefault()
  fixedKeyword.value = keyword.value

  if (!keyword.value) {
    return
  }

  loading.value = true
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_SEARCH, {
    params: {
      keyword: keyword.value,
      current: current.value,
      pageSize
    }
  })

  records.value = data.value.records || []
  total.value = data.value.total || 0

  alreadySearch.value = true
  loading.value = false
}

const handleHistorySearch = (k: string) => {
  keyword.value = k
  handleSearch()
}

const infiniteFetch = async () => {
  current.value += 1
  const { data } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_SEARCH, {
    params: {
      keyword: keyword.value,
      current: current.value,
      pageSize
    }
  })

  records.value.push(...(data.value.records || []))
}
</script>

<style lang="scss" scoped>
.search-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.results-wrapper {
  flex: 1;
  min-height: 0;
  padding: .16rem;
  background-color: var(--plain-color);
  overflow-y: auto;
}
</style>
