<template>
  <article class="search-results">
    <SearchResultItem
      v-for="record in records"
      :key="record.id"
      :record="record"
      :fixed-keyword="fixedKeyword"
    />
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'

defineProps<{
  records: PostItem[];
  fixedKeyword: string;
}>()
</script>

<style lang="scss" scoped>
.search-results {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
