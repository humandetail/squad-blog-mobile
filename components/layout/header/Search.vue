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
        <div
          class="search-wrapper"
          :class="{ 'is-focus': focused }"
          @click="handleSearchWrapperClick"
        >
          <input
            ref="inputRef"
            :value="keyword"
            class="search-input"
            type="text"
            @input="handleInput"
            @keydown="handleSearch"
          >
          <div
            v-show="!focused && !keyword"
            class="placeholder"
          >
            <span class="iconfont icon-search" />
            <span class="tips">
              输入关键字搜索
            </span>
          </div>
        </div>
      </div>
    </LayoutContainer>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  keyword: string;
}>(), {
  keyword: ''
})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:keyword', value: string),
  (e: 'search')
}>()

const router = useRouter()
const inputRef = ref()
const { focused } = useFocus(inputRef)

const handleBack = () => {
  router.back()
}

const handleSearchWrapperClick = () => {
  focused.value = true
}

const handleInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:keyword', target.value.trim())
}

const handleSearch = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emit('search')
  }
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

    .search-wrapper {
      position: relative;
      height: .32rem;
      padding: 0 .16rem;
      border-radius: .16rem;
      background-color: var(--search-bg);

      .search-input {
        width: 100%;
        height: 100%;
        color: var(--primary-text);
        border: 0;
        font-size: .16rem;
        background-color: transparent;
        outline: none;
      }

      .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: .14rem;
        color: var(--secondary-text);

        .iconfont {
          font-size: .18rem;
          margin-right: .04rem;
        }
      }
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
