<template>
  <ClientOnly>
    <teleport to="body">
      <transition
        name="slide"
      >
        <section
          v-show="menuToggleButtonIsActive"
          class="menu-wrapper"
        >
          <LayoutHeaderComponentsMenuNav />
          <LayoutHeaderComponentsMenuTags />
        </section>
      </transition>

      <div v-show="menuToggleButtonIsActive" class="back-mark" />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const menuToggleButtonIsActive = useMenuToggleButtonIsActive()
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  width: calc(100vw - .48rem);
  height: 100vh;
  padding: .6rem .16rem .16rem;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);
  overflow-y: auto;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: transform .3s ease-out;
  }

  &.slide-enter-from,
  &.slide-leave-to {
    transform: translateX(100%);
  }
}

.back-mark {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 8;
  width: 100vw;
  height: 100vh;
  backdrop-filter: saturate(180%) blur(20px)
}
</style>
