<template>
  <div class="has-results">
    共{{ total }}条与“
    <span class="keyword">
      {{ fixedKeyword }}
    </span>
    ”相关的内容。
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  fixedKeyword: string;
}>()
</script>

<style lang="scss" scoped>
.has-results {
  font-size: .14rem;

  .keyword {
    color: var(--danger-color);
  }
}
</style>
