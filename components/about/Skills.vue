<template>
  <section v-if="!isEmpty" class="skills-wrapper">
    <header>
      <h2 class="title">
        我大抵是学废了，细数了一下了解过的技术，这个不会，那个也不会
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="(item, index) in skills"
        :key="item.id"
        class="item"
      >
        <div class="skill-icon">
          <CommonCoverPic
            :url="item.icon"
            :alt="item.name"
            width="0.24rem"
            height="0.24rem"
          />
        </div>
        <div class="info" :class="{ 'border-top': index !== 0 }">
          <div class="name" :title="item.name">
            {{ item.name }}
          </div>

          <div class="desc" :title="item.description">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { SkillItem } from '~~/types/response'

const props = defineProps<{
  skills: SkillItem[]
}>()

const isEmpty = computed(() => {
  const skills = props.skills
  return !skills || !Array.isArray(skills) || skills.length === 0
})
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.skills-wrapper {
  margin: .2rem 0;
  padding: .16rem;
  background-color: var(--plain-color);

  .title {
    font-size: .16rem;
    line-height: .24rem;
  }

  .list {
    margin-top: .2rem;
    .item {
      display: flex;
      align-items: flex-start;
      padding: .08rem 0;

      .skill-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: .4rem;
        height: .4rem;
        margin-top: .08rem;
        border-radius: 50%;
        background-color: var(--img-background);
        overflow: hidden;
      }

      .info {
        flex: 1;
        min-width: 0;
        margin-left: .16rem;
        padding-top: .08rem;

        .name {
          min-width: 0;
          font-weight: 700;
          @include ellipsis;
        }
      }

      .desc {
        font-size: .14rem;
        color: var(--secondary-text);
      }
    }
  }
}
</style>
