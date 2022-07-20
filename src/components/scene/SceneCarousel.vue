<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SceneCarousel",
  props: {
    allCubes: {
      type: Object as PropType<{ [id: number]: string }>,
      default: () => ({}),
    },
    prevId: Number,
    nextId: Number,
    activeId: Number,
    direction: String,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="carousel">
    <transition :name="direction === 'prev' ? 'leftPrev' : 'leftNext'">
      <img
        class="carousel__item left"
        :key="nextId"
        :src="allCubes[nextId]"
        :alt="nextId"
      />
    </transition>
    <transition :name="direction === 'prev' ? 'centerPrev' : 'centerNext'">
      <img
        class="carousel__item center"
        :key="activeId"
        :src="allCubes[activeId]"
        :alt="activeId"
      />
    </transition>
    <transition :name="direction === 'prev' ? 'rightPrev' : 'rightNext'">
      <img
        class="carousel__item right"
        :key="prevId"
        :src="allCubes[prevId]"
        :alt="prevId"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  &__item {
    position: absolute;
    bottom: -7.9817559863%;
    top: 10.3762827822%;
    height: 100%;
    max-height: 90vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-index-scene-cube);
    user-select: none;
    pointer-events: none;

    &.left {
      transform: translateX(-100%) scale(0.6);
    }

    &.right {
      transform: scale(0.6);
    }
  }
}
</style>
