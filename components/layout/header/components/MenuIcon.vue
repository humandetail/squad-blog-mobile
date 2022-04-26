<template>
  <div
    class="nav-toggle-icon"
    :class="{ 'is-active': isActive }"
    @click="handleClick"
  >
    <div class="inner">
      <div class="line line-top" />
      <div class="line line-middle" />
      <div class="line line-bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
const isActive = useMenuToggleButtonIsActive()

const route = useRoute()

const handleClick = () => {
  isActive.value = !isActive.value
}

watch(route, () => {
  isActive.value = false
})
</script>

<style lang="scss" scoped>
.nav-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: .32rem;
  height: .32rem;

  .inner {
    position: relative;
    width: .24rem;
    height: .2rem;
    overflow: hidden;

    .line {
      position: absolute;
      width: .24rem;
      height: .02rem;
      background-color: var(--secondary-text);
      transition: top .25s,background-color .5s,transform .25s;

      &.line-top {
        top: 0;
        left: 0;
        transform: translate(0);
      }

      &.line-middle {
        top: .09rem;
        left: 0;
        transform: translate(.12rem);
      }

      &.line-bottom {
        top: .18rem;
        left: 0;
        transform: translate(.05rem);
      }
    }
  }

  &:hover:not(.is-active) {
    .inner {
      .line-top {
        top: 0;
        left: 0;
        transform: translate(.05rem);
      }

      .line-middle {
        top: .09rem;
        left: 0;
        transform: translate(0);
      }

      .line-bottom {
        top: .18rem;
        left: 0;
        transform: translate(.12rem);
      }
    }
  }

  &.is-active {
    .inner {
      .line-top {
        top: .09rem;
        transform: translate(0) rotate(225deg);
      }

      .line-middle {
        top: .09rem;
        transform: translate(.25rem);
      }

      .line-bottom {
        top: .09rem;
        transform: translate(0) rotate(135deg);
      }
    }
  }
}
</style>
