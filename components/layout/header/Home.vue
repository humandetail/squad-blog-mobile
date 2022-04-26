<template>
  <header class="page-header">
    <LayoutContainer>
      <div class="site">
        <LayoutHeaderComponentsSite />
      </div>
      <div class="extra">
        <div class="header-btn">
          <a href="/search">
            <span class="iconfont icon-search" />
          </a>
        </div>
        <div class="header-btn">
          <LayoutHeaderComponentsMenuIcon />
        </div>
      </div>
    </LayoutContainer>
  </header>

  <LayoutHeaderComponentsMenu />
</template>

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
    justify-content: space-between;
  }

  .extra {
    display: flex;
    align-items: center;
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
