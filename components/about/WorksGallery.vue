<template>
  <div class="gallery">
    <swiper
      :modules="modules"
      :lazy="{
        enable: true,
        checkInView: true,
        loadOnTransitionStart: true
      }"
      :preload-images="false"
    >
      <swiper-slide
        v-for="(item, index) in pictures"
        :key="index"
      >
        <img
          :src="item.url"
          :alt="item.name"
          lazy-class-name="swiper-lazy"
        >
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PictureItem } from '~~/types/response'

defineProps<{
  pictures: PictureItem[]
}>()

const modules = [Lazy]
</script>

<style lang="scss" scoped>
.gallery {
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;

    .swiper-pagination-bullet {
      width: .1rem;
      height: .1rem;
      background-color: var(--secondary-text);

      &.swiper-pagination-bullet-active {
        background-color: var(--primary-text);
        box-shadow: var(--banner-bullte-box-shadow);
      }
    }
  }
}
</style>
