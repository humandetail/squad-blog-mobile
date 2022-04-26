<template>
  <LayoutContainer>
    <section class="tabs-wrapper">
      <ul
        ref="tabsRef"
        class="tabs"
      >
        <li
          v-for="item in tabs"
          :key="item.id"
          class="tab"
        >
          <nuxt-link
            :to="item.route"
            :class="{ 'is-active': item.name === current }"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { getElementDocPosition } from '~~/libs/utils'
import { TabItem } from '~~/types'
withDefaults(defineProps<{
  tabs: TabItem[],
  current?: string;
}>(), {
  current: ''
})

const tabsRef = ref()

onMounted(() => {
  nextTick(() => {
    try {
      const oActive = document.getElementsByClassName('is-active')[0] as HTMLElement
      tabsRef.value.scroll({ left: getElementDocPosition(oActive).left })
    } catch {}
  })
})
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: .2rem 0;
  height: .72rem;
  overflow-y: hidden;

  .tabs {
    padding-bottom: .32rem;
    white-space: nowrap;
    overflow-x: scroll;
    scroll-behavior: smooth;

    .tab {
      display: inline-block;

      a {
        display: inline-block;
        padding: 0 .16rem;
        line-height: .32rem;
        font-size: .18rem;
        color: var(--primary-text);

        &.is-active {
          position: relative;
          font-weight: 700;
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            width: .2rem;
            height: .04rem;
            border-radius: .02rem;
            background-color: var(--brand-color);
            transform: translate(-50%, 0);
          }
        }
      }
    }
  }
}
</style>
