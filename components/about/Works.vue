<template>
  <section v-if="!isEmpty" class="works-wrapper">
    <header>
      <h2 class="title">
        曾经做过这些项目
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="(item, index) in works"
        :key="item.id"
        class="item"
        :class="{ 'border-top': index !== 0 }"
      >
        <AboutWorksGallery
          :pictures="item.pictures"
        />
        <div class="extra">
          <div class="info">
            <div class="name">
              {{ item.name }}
            </div>

            <div class="desc">
              {{ item.description }}
            </div>
          </div>

          <div class="links">
            <a
              v-for="link in getButtons(item)"
              :key="link.id"
              :href="link.link"
              class="link"
              target="_blink"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { WorkItem } from '~~/types/response'

const props = defineProps<{
  works: WorkItem[]
}>()

const isEmpty = computed(() => {
  const works = props.works
  return !works || !Array.isArray(works) || works.length === 0
})

const getButtons = ({ link }: WorkItem) => {
  if (!link) {
    return []
  }

  const links = link.split(',')

  if (links.length === 1) {
    return [
      { id: 1, link: links[0], name: '查看项目' }
    ]
  }

  return links.map((item, index) => ({ id: index + 1, link: item, name: `链接${index + 1}` }))
}
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.works-wrapper {
  margin: .2rem 0;
  padding: .16rem;

  .title {
    font-size: .16rem;
    line-height: .24rem;
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: .16rem 0;

    &:not(:first-child) {
      margin-top: .16rem;
    }

    .extra {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 7;
      width: 100%;
      height: .44rem;
      padding: .02rem .16rem;
      background-color: var(--swiper-extra-bg);
    }

    .info {
      min-width: 0;
      padding-right: .08rem;
      color: var(--plain-color);

      .name {
        font-size: .14rem;
        line-height: .2rem;
        font-weight: 700;
        color: var(--plain-color);
        @include ellipsis;
      }

      .desc {
        font-size: .12rem;
        line-height: .2rem;
        color: var(--plain-color);
        @include ellipsis;
      }
    }

    .links {
      display: flex;
      align-items: center;

      .link {
        font-size: .12rem;
        color: var(--plain-color);
        text-decoration: none;
        white-space: nowrap;

        & + .link {
          margin-left: .08rem;
        }
      }
    }
  }
}
</style>
