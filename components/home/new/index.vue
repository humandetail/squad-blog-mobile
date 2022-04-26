<template>
  <section class="posts-new">
    <header class="header">
      <span class="ornamental left" />
      <h1 class="title">
        最新文章
      </h1>
      <span class="ornamental right" />
    </header>

    <CommonLoading :loading="pending">
      <ul class="posts">
        <li
          v-for="item in records"
          :key="item.id"
          class="item"
        >
          <article class="post-item">
            <div class="content">
              <h2 class="title">
                <nuxt-link :to="`/posts/${item.id}`">
                  {{ item.title }}
                </nuxt-link>
              </h2>

              <div class="info">
                <div class="widgets">
                  <CommonPostWidget
                    :value="getTime(item.createdTime)"
                  />
                  <CommonPostWidget
                    :value="item.categoryDisplayName"
                    :link="`/categories/${item.categoryName}`"
                  />
                </div>
                <div class="widgets">
                  <PostsWidgetsTag
                    v-for="tag in item.tags"
                    :key="tag.name"
                    :tag="tag"
                  />
                </div>
              </div>
            </div>

            <CommonCoverPic
              :url="item.coverPic"
              :alt="item.title"
              :to="`/posts/${item.id}`"
            />
          </article>
        </li>
      </ul>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '@vueuse/shared'
import { POSTS_NEW } from '~~/config/api'

const { data, pending } = await useCustomFetch(POSTS_NEW)

const records = computed(() => data.value.records)

const getTime = (dateLinkString: string) => formatDate(new Date(dateLinkString), 'YYYY-MM-DD')

</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';
$danger-color: var(--danger-color);

.posts-new {
  position: relative;
  margin: .2rem 0;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: .44rem;

    .title {
      font-size: .18rem;
      font-weight: 700;
      margin: 0 .08rem;
    }

    .ornamental {
      position: relative;
      width: 20%;
      height: 1px;
      background-color: var(--placeholder-color);

      &.left::after,
      &.right::before {
        content: '';
        position: absolute;
        top: 50%;
        width: .1rem;
        height: .1rem;
        background-color: var(--placeholder-color);
        transform-origin: center center;
        transform: translateY(-50%) rotate(45deg);
      }

      &.left::after {
        right: 0;
      }

      &.right::before {
        left: 0;
      }
    }
  }

  .posts {
    margin-top: .16rem;
  }

  .item + .item {
    margin-top: .08rem;
  }

  .post-item {
    display: flex;
    align-items: flex-start;
    padding: .16rem;
    background-color: var(--plain-color);

    .content {
      margin-right: .16rem;
      flex: 1;

      .title {
        font-size: .16rem;
        line-height: .24rem;
        color: var(--primary-text);
        @include multi-ellipsis(2);

        a {
          color: inherit;
        }
      }

      .widgets {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: .08rem;

        > :not(:first-child) {
          margin-left: .08rem;
        }
      }
    }

    ::v-deep(.cover-pic-with-link) {
      width: 1.15rem;
    }
  }
}
</style>
