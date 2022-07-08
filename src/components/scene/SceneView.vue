<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";
import SceneViewLoader from "@/components/scene/SceneViewLoader.vue";

export default defineComponent({
  name: "SceneView",
  components: { SceneViewLoader },
  props: {
    images: {
      type: Object as PropType<SceneImagesProp>,
      required: true,
    },
    test: Boolean,
  },
  setup(props) {
    const count = computed(
      () => Object.values(props.images).filter((_) => _).length,
    );
    const loadedImagesCount = ref(0);
    const isLoadedAllImages = ref(false);
    watch(loadedImagesCount, (value) => {
      if (value === count.value) {
        setTimeout(() => (isLoadedAllImages.value = true), 420);
      }
    });
    return {
      isLoadedAllImages,
      loadedImagesCount,
      count,
    };
  },
});
</script>

<template>
  <div class="scene--wrap">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" hidden="hidden">
      <defs>
        <filter id="goovey">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="1"
            result="warpper"
          ></feTurbulence>
          <feColorMatrix in="warpper" type="hueRotate">
            <animate
              attributeType="XML"
              attributeName="values"
              values="0;110;150;210;360"
              dur="6s"
              repeatCount="indefinite"
            ></animate>
          </feColorMatrix>
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="8"
            in="SourceGraphic"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
    <SceneViewLoader
      :countOf="count"
      :count="loadedImagesCount"
      :visible="!isLoadedAllImages"
    />
    <img
      v-if="test"
      class="scene__img test"
      :src="require(`@/assets/images/scene/quarry_01_1k.png`)"
      @load="() => ++loadedImagesCount"
      alt=""
    />
    <img
      class="scene__img"
      v-for="(url, key) in images"
      :key="url"
      :src="url"
      :class="[key]"
      alt=""
      v-show="url"
      @load="() => ++loadedImagesCount"
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

    &.test {
      left: 50%;
      top: 52%;
      transform: translate(-50%, -50%);
      width: 1190px;
      z-index: -4;
      filter: url("#goovey");
    }

    &.background {
      z-index: var(--z-index-scene-background);
      inset: var(--inset-scene);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.leftColumn {
      left: var(--inset-scene);
      transform-origin: left;

      @media screen and (max-width: 1200px) and (min-height: 700px) {
        left: -10%;
      }

      @media screen and (max-width: 900px) and (min-height: 600px) {
        left: -15%;
      }
    }

    &.rightColumn {
      right: var(--inset-scene);

      transform-origin: right;

      @media screen and (max-width: 1200px) and (min-height: 700px) {
        right: -10%;
      }

      @media screen and (max-width: 900px) and (min-height: 600px) {
        right: -15%;
      }
    }

    &.leftColumn,
    &.rightColumn {
      z-index: var(--z-index-scene-column);
      height: 100%;
      top: var(--inset-scene);
      bottom: var(--inset-scene);

      @media (orientation: portrait) and (max-width: 1100px) {
        display: none;
      }

      @media screen and (max-width: 768px) and (min-height: 550px) {
        display: none;
      }
    }

    &.cube {
      z-index: var(--z-index-scene-cube);
      bottom: -7.9817559863%;
      top: 10.3762827822%;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      max-height: 90vh;
    }

    &.bottomLantern {
      z-index: var(--z-index-scene-lantern);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      max-height: 28vh;
    }

    &.upperLantern {
      z-index: var(--z-index-scene-lantern);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      max-height: 37vh;

      @media screen and (max-width: 768px) {
        top: -41px;
      }
    }

    &.artistLogo {
      top: 210px;
      width: 217px;
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--z-index-scene-artistLogo);
      animation-name: wakeUpSm;
      animation-iteration-count: infinite;
      animation-timing-function: ease;
      animation-direction: alternate;
      animation-duration: 3s;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &.bottomBlackout {
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      min-height: 220px;
    }

    &.upperBlackout {
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      min-height: 220px;
    }

    &.light {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: var(--z-index-scene-light);
    }
  }

  &--wrap {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    inset: 0;
    perspective: 2000px;
    perspective-origin: center;
    transform-style: preserve-3d;
  }
}
@keyframes wakeUpSm {
  0% {
    transform: translateX(-51%) rotate(0.3deg);
  }

  100% {
    transform: translateX(-49%) rotate(-0.3deg);
  }
}
</style>
