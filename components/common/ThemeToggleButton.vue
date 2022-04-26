<template>
  <div
    class="theme-button"
    :class="{ 'is-dark': themeMode === Theme.dark }"
    @click="handleClick"
  >
    <span
      class="iconfont"
      :class="`icon-theme-${themeMode === Theme.dark ? 'dark' : 'light'}`"
    />
  </div>
</template>

<script setup lang="ts">
import { Theme, THEME_MODE_KEY } from '~~/config/constants'
const themeMode = useThemeMode()

onMounted(() => {
  themeMode.value = JSON.parse(localStorage.getItem(THEME_MODE_KEY)) as Theme || Theme.default
})

const handleClick = () => {
  themeMode.value = themeMode.value === Theme.dark ? Theme.default : Theme.dark
  localStorage.setItem(THEME_MODE_KEY, JSON.stringify(themeMode.value))
}
</script>

<style lang="scss" scoped>
.theme-button {
  position: fixed;
  right: .16rem;
  bottom: .68rem;
  z-index: 1;
  width: .44rem;
  height: .44rem;
  border-radius: 50%;
  line-height: .44rem;
  text-align: center;
  color: var(--primary-text);
  background-color: var(--img-background);

  .iconfont {
    font-size: .24rem;
  }
}
</style>
