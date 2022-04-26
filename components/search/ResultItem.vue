<template>
  <article class="result-item">
    <CommonCoverPic
      :url="record.coverPic"
      :alt="record.title"
      :to="`/posts/${record.id}`"
    />

    <h2 class="title">
      <nuxt-link
        :to="`/posts/${record.id}`"
        v-html="title"
      />
    </h2>

    <div class="extra">
      <span class="date">{{ date }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'

const props = defineProps<{
  record: PostItem;
  fixedKeyword: string;
}>()

const date = useDateFormat(props.record.createdTime, 'YYYY-MM-DD')

const title = computed(() => replaceKeyword(props.record.title))

const replaceKeyword = (value: string) => {
  return value.replace(new RegExp(`(${props.fixedKeyword})`, 'i'), '<span class="keyword">$1</span>')
}
</script>

<style scoped lang="scss">
@import '~~/assets/styles/mixins.scss';

.result-item {
  width: calc(50% - .08rem);
  margin: .16rem 0;

  .title {
    margin-top: .08rem;
    line-height: 1.4;
    font-size: .16rem;
    color: var(--primary-text);
    @include multi-ellipsis(2);

    a {
      color: inherit;
    }
  }

  .extra {
    margin-top: .08rem;
    font-size: .12rem;

    .date {
      color: var(--secondary-text);
    }
  }

  ::v-deep(.cover-pic-with-link) {
    border-top-left-radius: .08rem;
    border-top-right-radius: .08rem;
    overflow: hidden;
  }

  ::v-deep(.keyword){
    color: var(--danger-color);
  }
}
</style>
