<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";
import SceneViewLoader from "@/components/scene/SceneViewLoader.vue";
import {
  SceneDirection,
  useSceneSwipe,
} from "@/components/scene/scripts/sceneSwipe";
import { useImageLoading } from "@/components/scene/scripts/imageLoading";
import { useOverflowHiddenBody } from "@/components/scene/scripts/overflowHiddenBody";
import SceneCarousel from "@/components/scene/SceneCarousel.vue";

export default defineComponent({
  name: "SceneView",
  components: { SceneCarousel, SceneViewLoader },
  emits: ["toActive"],
  props: {
    images: {
      type: Object as PropType<SceneImagesProp>,
      required: true,
    },
    buttons: {
      type: Array as PropType<number[]>,
      required: true,
    },
    activeId: Number,
    blur: Boolean,
    sceneDirection: {
      type: String as PropType<SceneDirection>,
      require: true,
      default: "Y",
    },
    allCubes: {
      type: Object as PropType<{ [id: number]: string }>,
      default: () => ({}),
    },
    allCanvas: {
      type: Object as PropType<{ [id: number]: string }>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const carouselDirection = ref("");
    useOverflowHiddenBody();
    const defaultImages = {
      bottomLantern: require(`@/assets/images/scene/bottomLantern.png`),
      upperLantern: require(`@/assets/images/scene/upperLantern.png`),
      upperBlackout: require(`@/assets/images/scene/upperBlackout.png`),
      bottomBlackout: require(`@/assets/images/scene/bottomBlackout.png`),
      light: require(`@/assets/images/scene/light.svg`),
    };
    const { count, isLoadedAllImages, loadedImagesCount } = useImageLoading([
      ...Object.values(props.allCubes),
      ...Object.values(props.allCanvas),
      ...Object.values(props.images),
      ...Object.values(defaultImages),
    ]);

    const emitToActive = (id: number) => emit("toActive", id);
    const getIdxByDirection = (direction: "prev" | "next") => {
      const { buttons, activeId } = props;
      const currentIdx = buttons.findIndex((id) => id === activeId);
      return direction === "prev"
        ? currentIdx === 0
          ? buttons.length - 1
          : currentIdx - 1
        : currentIdx === buttons.length - 1
        ? 0
        : currentIdx + 1;
    };
    const getIdByDirection = (direction: "prev" | "next") =>
      props.buttons[getIdxByDirection(direction)];
    const onSwipe = (direction: "prev" | "next") => {
      const { buttons } = props;
      const nextIdx = getIdxByDirection(direction);
      console.log(direction);
      carouselDirection.value = direction;
      emitToActive(buttons[nextIdx]);
    };

    const {
      onSwipeEnd,
      onSwipeStart,
      onSwipeMove,
      onWheel,
      cubeStyles,
      nextCubeStyles,
      prevCubeStyles,
      wheelDirection,
    } = useSceneSwipe(props.sceneDirection, onSwipe);
    return {
      isLoadedAllImages,
      loadedImagesCount,
      count,
      defaultImages,
      onSwipeEnd,
      onSwipeStart,
      onSwipeMove,
      onWheel,
      cubeStyles,
      nextCubeStyles,
      prevCubeStyles,
      wheelDirection,
      emitToActive,
      getIdByDirection,
      carouselDirection,
    };
  },
});
</script>

<template>
  <div
    class="scene--wrap flex align-end"
    :class="{
      loading: !isLoadedAllImages,
    }"
    @touchstart="onSwipeStart"
    @touchmove="onSwipeMove"
    @touchend="onSwipeEnd"
    @mousedown="onSwipeStart"
    @mousemove="onSwipeMove"
    @mouseup="onSwipeEnd"
    @wheel="onWheel"
  >
    <template v-if="isLoadedAllImages">
      <img
        class="scene__img"
        v-for="(url, key) in { ...images, ...defaultImages }"
        :key="url"
        :src="url"
        :class="[key, wheelDirection]"
        :style="key.toLocaleLowerCase().includes('cube') ? cubeStyles : null"
        alt=""
        v-show="url"
      />

      <transition name="test" mode="out-in">
        <img
          class="scene__img canvas"
          :src="allCanvas[activeId]"
          alt=""
          v-if="allCanvas[activeId]"
        />
      </transition>
      <SceneCarousel
        :all-cubes="allCubes"
        :buttons="buttons"
        :next-id="getIdByDirection('next')"
        :prev-id="getIdByDirection('prev')"
        :active-id="activeId"
        :direction="carouselDirection"
      />
    </template>
    <div class="blur" v-if="blur"></div>
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
            scale="6"
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

    <slot></slot>
    <div class="pagination__wrapper flex direction-column align-center">
      <button
        v-for="btn of buttons"
        :key="btn"
        class="pagination__wrapper__btn"
        :class="{ active: btn === activeId }"
        @click="emitToActive(btn)"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scene {
  &__img {
    position: absolute;
    pointer-events: none;
    will-change: transform;

    &.canvas {
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      inset: -10px;
      z-index: -6;
      object-fit: cover;
      filter: url("#goovey");
    }

    &.background {
      z-index: var(--z-index-scene-background);
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.cube {
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--z-index-scene-cube);
      bottom: -7.9817559863%;
      top: 10.3762827822%;
      height: 100%;
      max-height: 90vh;

      @media screen and (max-width: 768px) {
        top: 7%;
      }

      &.nextY {
        transition: transform 0.4s ease-in;
        transform-origin: top !important;
        transform: translateX(-50%) translateY(-17px) scale(0.8) !important;
      }

      &.prevY {
        transition: transform 0.4s ease-in;
        transform-origin: bottom !important;
        transform: translateX(-50%) translateY(17px) scale(0.8) !important;
      }

      &.prevX {
        transition: all 0.7s ease;
        transform-origin: center !important;
        transform: translateX(0) scale(0.5) !important;
        opacity: 0;
      }

      &.nextX {
        transition: all 0.7s ease;
        transform-origin: center !important;
        transform: translateX(-100%) scale(0.5) !important;
        opacity: 0;
      }
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

    &.brandLogo {
      width: 310px;
      bottom: 102px;
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--z-index-scene-artistLogo);
      animation-name: wakeUpSm;
      animation-iteration-count: infinite;
      animation-timing-function: ease;
      animation-direction: alternate;
      animation-duration: 3s;
      transition-delay: 0.5s;

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
    user-select: none;

    &.loading {
      pointer-events: none;
    }
  }
}

.blur {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(27.1828px);
}

.pagination__wrapper {
  width: 100%;
  max-width: 13px;
  position: absolute;
  z-index: 2;
  right: 53px;
  top: 50%;
  transform: translateY(-50%);
  button {
    outline: none;
    border: none;
    margin: 10px;
    padding: 4.5px;
  }
  .active {
    padding: 6.5px;
  }
  &__btn {
    background: white;
    border-radius: 100%;
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
