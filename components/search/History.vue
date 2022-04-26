<template>
  <ClientOnly>
    <section
      v-if="keywords.length > 0"
      class="history-wrapper"
    >
      <header class="header">
        <h2 class="title">
          历史搜索
        </h2>

        <div class="extra">
          <span
            class="icon"
            @click="handleClear"
          >
            清空
          </span>
          <span
            v-if="isDeleteMode"
            class="icon"
            @click="isDeleteMode = false"
          >
            取消
          </span>
          <span
            v-else
            class="icon iconfont icon-delete"
            @click="isDeleteMode = true"
          />
        </div>
      </header>

      <ul
        class="keywords"
        :class="{ 'is-delete-mode': isDeleteMode }"
      >
        <li
          v-for="item of keywords"
          :key="item"
          class="keyword"
          @click="handleKeywordClick(item)"
        >
          {{ item }}

          <span
            v-if="isDeleteMode"
            class="iconfont icon-delete"
            @click="handleDelete(item)"
          />
        </li>
      </ul>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import { HISTORY_KEYWORDS_KEY } from '~~/config/constants'

const props = defineProps<{
  fixedKeyword: string;
}>()

const emit = defineEmits<{(e: 'search', value: string): void}>()

const keywords = ref<string[]>([])
const isDeleteMode = ref(false)

onMounted(() => {
  keywords.value = JSON.parse(localStorage.getItem(HISTORY_KEYWORDS_KEY) || '[]')
})

const handleClear = () => {
  keywords.value = []
  localStorage.setItem(HISTORY_KEYWORDS_KEY, '[]')
}

const handleDelete = (item: string) => {
  keywords.value = keywords.value.filter(i => i !== item)

  localStorage.setItem(HISTORY_KEYWORDS_KEY, JSON.stringify(keywords.value))
}

const handleKeywordClick = (keyword: string) => {
  if (!isDeleteMode.value) {
    emit('search', keyword)
  }
}

watch(() => props.fixedKeyword, (keyword) => {
  if (!keyword) {
    return
  }
  keywords.value = JSON.parse(localStorage.getItem(HISTORY_KEYWORDS_KEY) || '[]')
  keywords.value.push(keyword)
  keywords.value = [...new Set(keywords.value)]

  if (keywords.value.length > 10) {
    keywords.value.shift()
  }

  localStorage.setItem(HISTORY_KEYWORDS_KEY, JSON.stringify(keywords.value))
})
</script>

<style lang="scss" scoped>
.history-wrapper {
  padding: .16rem;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: .32rem;
  padding-left: .12rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: .03rem;
    height: .14rem;
    background-color: var(--primary-text);
    transform: translateY(-50%);
  }

  .title {
    font-size: .16rem;
  }

  .extra {
    display: inline-flex;
    align-items: center;

    .icon {
      font-size: .12rem;
      line-height: .24rem;
      margin-left: .08rem;
    }
  }
}

.keywords {
  display: flex;
  flex-wrap: wrap;

  .keyword {
    position: relative;
    margin: .04rem;
    padding: .02rem .24rem .02rem .08rem;
    line-height: .2rem;
    border-radius: .12rem;

    .iconfont {
      position: absolute;
      right: .08rem;
      top: .02rem;
      line-height: .2rem;
      font-size: .12rem;
    }
  }

  &.is-delete-mode {
    .keyword {
      background-color: var(--border-color);
    }
  }
}
</style>
