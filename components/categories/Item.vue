<template>
  <article class="item">
    <h2 class="title">
      <nuxt-link :to="postLink">
        {{ record.title }}
      </nuxt-link>
    </h2>

    <CommonCoverPic
      :url="record.coverPic"
      :alt="record.title"
      :to="postLink"
    />

    <div class="widgets">
      <CommonPostWidget
        :value="date"
      />
      <PostsWidgetsTag
        v-for="tag in record.tags"
        :key="tag.name"
        :tag="tag"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'

const props = defineProps<{
  record: PostItem
}>()

const postLink = computed(() => `/posts/${props.record.id}`)
const date = useDateFormat(props.record.createdTime, 'YYYY-MM-DD')

</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.item {
  width: 100%;
  padding: .16rem;
  border-radius: .08rem;
  background-color: var(--plain-color);

  & + .item {
    margin-top: .16rem;
  }
}

.title {
  margin-bottom: .08rem;

  a {
    display: block;
    color: var(--primary-text);
    font-size: .16rem;
    line-height: 1.4;
    text-decoration: none;
  }
}

.widgets {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: .08rem;

  > * {
    margin: .04rem;
  }
}
</style>
