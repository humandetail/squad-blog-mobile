<template>
  <header class="page-header">
    <LayoutContainer>
      <div
        class="header-btn btn-back"
        @click="handleBack"
      >
        <span class="iconfont icon-left" />
      </div>
      <div class="middle-wrapper">
        <slot>
          <h1 class="title">
            {{ title }}
          </h1>
        </slot>
      </div>
      <div class="header-btn">
        <a href="/search">
          <span class="iconfont icon-search" />
        </a>
      </div>
      <div class="header-btn">
        <LayoutHeaderComponentsMenuIcon />
      </div>
    </LayoutContainer>
  </header>

  <LayoutHeaderComponentsMenu />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
}>(), {
  title: ''
})

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: .44rem;
  padding: .08rem 0;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  ::v-deep(.container) {
    display: flex;
    align-items: center;
  }

  .middle-wrapper {
    flex: 1;
    padding: 0 .08rem;

    .title {
      font-size: .2rem;
      line-height: .32rem;
    }
  }

  .header-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: .24rem;
    height: .32rem;
    text-align: center;

    .iconfont {
      font-size: .24rem;
      color: var(--secondary-text);
    }

    & + .header-btn {
      margin-left: .08rem;
    }
  }
}
</style>
