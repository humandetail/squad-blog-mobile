<template>
  <transition
    enter-active-class="animate__animated animate__slideInDown"
  >
    <div
      v-show="visible"
      class="back-top"
      @click.stop="handleClick"
    >
      <span class="iconfont icon-backtop" />
    </div>
  </transition>
</template>

<script setup lang="ts">
const { y } = useWindowScroll()

const visible = computed(() => y.value > 200)

const handleClick = () => {
  window.scroll({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  right: .16rem;
  bottom: 1.18rem;
  z-index: 1;
  width: .44rem;
  height: .44rem;
  border-radius: 50%;
  line-height: .44rem;
  text-align: center;
  color: var(--primary-text);
  background-color: var(--img-background);

  .iconfont {
    font-size: .2rem;
  }
}
</style>
