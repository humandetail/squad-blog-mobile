<template>
  <div class="no-results">
    抱歉没有找到与“
    <span class="keyword">
      {{ fixedKeyword }}
    </span>
    ”相关的内容。
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fixedKeyword: string;
}>()
</script>

<style lang="scss" scoped>
.no-results {
  margin: .32rem 0 .16rem;
  padding-left: .16rem;
  font-size: .16rem;
  font-weight: 700;

  .keyword {
    color: var(--danger-color);
  }
}
</style>
