<template>
  <CommonLoading :loading="pending">
    <div class="posts-page">
      <SkeletonPostsContent v-if="!isMounted" />

      <article v-else class="post-container">
        <h1 class="title">
          {{ post.title }}
        </h1>

        <PostsWidgets :post="post" />

        <div
          class="content squad__post-content"
          v-html="content"
        />

        <section class="post-link-wrapper border-top">
          <PostsLink
            key="prev"
            :is-prev="true"
            :post-link="prev"
          />

          <PostsLink
            key="next"
            :is-prev="false"
            :post-link="next"
          />
        </section>
      </article>
    </div>
  </CommonLoading>

  <LayoutFooter />

  <Teleport to="body">
    <div
      class="btn-toc"
      @click="TOCVisible = true"
    >
      目录
    </div>
  </Teleport>

  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <section
      v-show="TOCVisible"
      class="post-toc-wrapper"
    >
      <CommonLoading :loading="pending">
        <header class="border-bottom">
          <h2 class="title">
            大纲
          </h2>

          <span
            class="iconfont icon-unexpanded"
            @click="TOCVisible = false"
          />
        </header>
        <div class="toc" v-html="toc" />
      </CommonLoading>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { POSTS_DETAIL } from '~~/config/api'
import { PostDetail } from '~~/types/response'

definePageMeta({
  key: route => 'posts-' + route.params.id,
  title: '正文',
  pageTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__rollIn',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  },
  layoutTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__zoomInUp',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  }
})

usePostHighlightTheme()
useCodeCopy()

const { $markdownRender } = useNuxtApp()
const route = useRoute()
const settings = useSettings()

const TOCVisible = ref(false)

// lifecycle hooks must before the first await statement.
onMounted(() => {
  if (post.value.content) {
    const HTMLString = $markdownRender(`[TOC]\n${post.value.content}`)
    const reg = /<nav class="table-of-contents">.*?<\/nav>/

    const result = HTMLString.match(reg)

    if (result) {
      toc.value = result[0]
      content.value = HTMLString.replace(reg, '')
    }
  }
  isMounted.value = true;

  (document.querySelector('.post-toc-wrapper') as HTMLDivElement).addEventListener('click', handleTOCClick, false)
})

onBeforeUnmount(() => {
  (document.querySelector('.post-toc-wrapper') as HTMLDivElement).addEventListener('click', handleTOCClick, false)
})

const id = route.params.id

const { data, pending } = await useCustomFetch<PostDetail>(POSTS_DETAIL, {
  params: { id }
})

const post = computed(() => data.value.post)
const prev = computed(() => data.value.prev || null)
const next = computed(() => data.value.next || null)

const content = ref(post.value.content || '')
const toc = ref('')
const isMounted = ref(false)

// 引入模板
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: post.value.template
    }
  ],
  title: `${post.value.seoTitle ? post.value.seoTitle : post.value.title} - ${settings.value.seoTitle}`,
  meta: [
    { name: 'keyword', content: `${post.value.seoKeywords ? post.value.seoKeywords + ',' : ''}${settings.value.seoKeywords}` },
    { name: 'description', content: `${post.value.seoDescription ? post.value.seoDescription + ',' : ''}${settings.value.seoDescription}` }
  ]
})

const handleTOCClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName.toLowerCase() === 'a') {
    TOCVisible.value = false
  }
}
</script>

<style lang="scss">
@import '~~/assets/styles/post-content.scss';
</style>

<style lang="scss" scoped>
.posts-page {
  padding: .16rem;
  background-color: var(--plain-color);

  .post-container {
    padding: .2rem 0;
  }

  .title {
    line-height: 1.4;
  }

  .content {
    margin-top: .36rem;
  }
}

.post-link-wrapper {
  margin-top: .24rem;
}

.post-toc-wrapper {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 7;
  width: 100%;
  height: 100%;
  padding: .6rem .16rem .16rem;
  background-color: var(--plain-color);
  overflow: auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .2rem;
    font-weight: 700;
    text-align: center;

    .iconfont {
      color: var(--secondary-text);
    }
  }

  .toc {
    margin-top: .2rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    ::v-deep(ol) {
      ol {
        margin: 0.5em 0 0 1em;
      }

      a {
        color: var(--primary-text);
        font-size: .14rem;
        word-break: break-all;

        &:hover {
          color: var(--brand-color);
        }
      }

      li {
        line-height: 1.4;

        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
  }
}

.btn-toc {
  position: fixed;
  right: .16rem;
  bottom: .16rem;
  z-index: 1;
  width: .44rem;
  height: .44rem;
  border-radius: 50%;
  line-height: .44rem;
  font-size: .14rem;
  text-align: center;
  color: var(--plain-color);
  background-color: var(--brand-color);
}
</style>
