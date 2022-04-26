<template>
  <section class="banner">
    <CommonLoading :loading="pending">
      <swiper
        :modules="modules"
        :loop="true"
        :lazy="{
          enable: true,
          checkInView: true,
          loadOnTransitionStart: true
        }"
        :preload-images="false"
        :autoplay="true"
      >
        <swiper-slide
          v-for="item in records"
          :key="item.id"
        >
          <article
            class="post-item"
          >
            <div class="cover">
              <CommonCoverPic
                :url="item.coverPic"
                :alt="item.title"
                :to="`/posts/${item.id}`"
                :lazy="true"
                lazy-class-name="swiper-lazy"
              />
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
            </div>
            <h2 class="title">
              <nuxt-link
                :to="`/posts/${item.id}`"
              >
                {{ item.title }}
              </nuxt-link>
            </h2>
          </article>
        </swiper-slide>
      </swiper>

      <div class="banner-pagination" />
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { Lazy, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { POSTS_RECOMMENDED } from '~~/config/api'
import { PageResponseType, PostItem } from '~~/types/response'

const { data, pending } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_RECOMMENDED, {
  params: {
    current: 1,
    pageSize: 5
  }
})

const records = computed(() => data.value.records)

const modules = [Lazy, Autoplay]
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.banner {
  width: 100%;
  padding: 0;
  aspect-ratio: 440 / 280;

  .post-item {
    position: relative;
    height: 100%;

    ::v-deep(.swiper) {
      height: 100%;
    }

    .title {
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      width: 100%;
      background-color: var(--swiper-extra-bg);

      a {
        display: block;
        padding: 0.16rem;
        color: var(--plain-color);
        text-decoration: none;
        font-size: .16rem;
        line-height: 1;
        @include ellipsis;
      }
    }
  }
}
</style>
