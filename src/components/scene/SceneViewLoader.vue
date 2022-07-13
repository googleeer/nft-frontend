<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "SceneViewLoader",
  props: {
    visible: Boolean,
    count: {
      type: Number,
      default: 0,
    },
    countOf: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const percent = computed(() =>
      Math.round((props.count / props.countOf) * 100),
    );
    return { percent };
  },
});
</script>

<template>
  <transition name="fadeOut" mode="out-in">
    <div class="scene__loader flex flexCenter" v-if="visible">
      <img class="scene__loader--gif" src="@/assets/images/progress.gif" />
      <span class="scene__loader--percent">{{ percent + "%" }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.scene {
  &__loader {
    z-index: 5;
    position: absolute;
    inset: 0;
    background: var(--color-black);
    &--gif {
      width: 300px;
      @media screen and (max-width: 768px) {
        width: 200px;
      }
    }
    &--percent {
      position: absolute;
      font-size: 32px;
      text-align: center;
      @media screen and (max-width: 768px) {
        width: 200px;
      }
    }
  }
}
</style>
