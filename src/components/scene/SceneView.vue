<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from "vue";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";
import SceneViewLoader from "@/components/scene/SceneViewLoader.vue";
import { useParallax } from "@/components/scene/scripts/sceneParallax";
export default defineComponent({
  name: "SceneView",
  components: { SceneViewLoader },
  props: {
    images: {
      type: Object as PropType<SceneImagesProp>,
      required: true,
    },
  },
  setup() {
    const sceneRef = ref<HTMLElement>();
    const loadedImagesCount = ref(0);
    const isLoadedAllImages = computed(() => loadedImagesCount.value === 9);
    const { onMouseMove, parallaxStyles } = useParallax(
      sceneRef as Ref<HTMLElement>,
    );
    return {
      sceneRef,
      onMouseMove,
      parallaxStyles,
      isLoadedAllImages,
      loadedImagesCount,
    };
  },
});
</script>

<template>
  <div class="scene--wrap" ref="sceneRef" @mousemove.passive="onMouseMove">
    <SceneViewLoader :count="loadedImagesCount" :visible="!isLoadedAllImages" />
    <img
      class="scene__img"
      v-for="(url, key) in images"
      :key="url"
      :src="url"
      :class="[key]"
      alt=""
      v-show="url"
      @load="() => ++loadedImagesCount"
      :style="parallaxStyles[key]"
    />
    <img
      class="scene__img bottomLantern"
      :src="require(`@/assets/images/scene/bottomLantern.png`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
    <img
      class="scene__img upperLantern"
      :src="require(`@/assets/images/scene/upperLantern.png`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
    <img
      class="scene__img upperBlackout"
      :src="require(`@/assets/images/scene/upperBlackout.png`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
    <img
      class="scene__img bottomBlackout"
      :src="require(`@/assets/images/scene/bottomBlackout.png`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
    <img
      class="scene__img light"
      :src="require(`@/assets/images/scene/light.svg`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.scene {
  &__img {
    position: absolute;
    pointer-events: none;
    will-change: transform;
    transition: transform 10ms linear;

    &.background {
      z-index: var(--z-index-scene-background);
      inset: var(--inset-scene);
      width: 110%;
      height: 110%;
      object-fit: cover;
    }

    &.leftColumn {
      z-index: var(--z-index-scene-column);
      height: 110%;
      left: var(--inset-scene);
      top: var(--inset-scene);
      bottom: var(--inset-scene);
      transform-origin: left;
    }

    &.rightColumn {
      z-index: var(--z-index-scene-column);
      height: 110%;
      right: var(--inset-scene);
      top: var(--inset-scene);
      bottom: var(--inset-scene);
      transform-origin: right;
    }

    &.cube {
      z-index: var(--z-index-scene-cube);
      bottom: -7.9817559863%;
      top: 10.3762827822%;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
    }

    &.bottomLantern {
      z-index: var(--z-index-scene-lantern);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &.upperLantern {
      z-index: var(--z-index-scene-lantern);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottomBlackout {
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
    }

    &.upperBlackout {
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
    }

    &.light {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: var(--z-index-scene-light);
    }
  }

  &--wrap {
    opacity: 0;
    position: absolute;
    overflow: hidden;
    z-index: 1;
    inset: 0;
    perspective: 1800px;
    perspective-origin: center;
    transform-style: preserve-3d;
  }
}
</style>
