<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "SceneCarousel",
  props: {
    allCubes: {
      type: Object as PropType<{ [id: number]: string }>,
      default: () => ({}),
    },
    buttons: {
      type: Array as PropType<number[]>,
      required: true,
    },
    prevId: Number,
    nextId: Number,
    activeId: Number,
    direction: String,
  },
  setup(props) {
    const isCalm = ref(true);
    watch(
      () => props.prevId,
      () => {
        isCalm.value = false;
        setTimeout(() => (isCalm.value = true), 50);
      },
    );
    const orders = computed(() =>
      props.buttons.map((id, idx) => {
        const prevIdIdx = props.buttons.findIndex((id) => id === props.prevId);
        const firstOrder =
          prevIdIdx === 0 ? props.buttons.length - 1 : prevIdIdx - 1;
        if (firstOrder === idx) return 1;
        if (idx > firstOrder) return 1 + idx - firstOrder;
        return props.buttons.length - firstOrder + idx + 1;
      }),
    );

    return {
      isCalm,
      orders,
    };
  },
});
</script>

<template>
  <div class="carousel--wrap">
    <div class="carousel flex" :class="{ set: isCalm }">
      <img
        v-for="(id, idx) of buttons"
        :alt="id"
        :key="id"
        :src="allCubes[id]"
        :class="{
          prev: prevId === id,
          next: nextId === id,
          active: activeId === id,
          fromNext: direction === 'next' && activeId === id,
          fromPrev: direction === 'prev' && activeId === id,
          prevFromActive: prevId === id,
          nextFromActive: nextId === id,
        }"
        :style="{
          order: orders[idx],
        }"
        class="carousel__item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  display: flex;
  position: relative;
  left: -90vh;
  transform: translateX(90vh);

  &__item {
    max-height: 90vh;
    object-fit: contain;
    transition: all 0.5s ease-in;
    opacity: 0;
    user-select: none;

    &.active {
      opacity: 1;

      &.fromPrev {
        animation: fromPrev ease 1.5s;
      }

      &.fromNext {
        animation: fromNext ease 1.5s;
      }
    }

    &.prev {
      opacity: 1;

      &.prevFromActive {
        animation: prevFromActive ease 1.5s forwards;
      }
    }

    &.next {
      opacity: 1;

      &.nextFromActive {
        animation: nextFromActive ease 1.5s forwards;
      }
    }
  }

  &--wrap {
    overflow: hidden;
    position: absolute;
    bottom: -7.9817559863%;
    top: 10.3762827822%;
    height: 100%;
    max-height: 90vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-index-scene-cube);
    user-select: none;
  }
}

@keyframes prevFromActive {
  0% {
    transform: none;
  }
  100% {
    transform-origin: right;
    transform: scale(0.6) translateX(50%);
    opacity: 1;
  }
}

@keyframes nextFromActive {
  0% {
    transform: none;
  }
  100% {
    transform-origin: left;
    transform: scale(0.6) translateX(-50%);
    opacity: 1;
  }
}

@keyframes fromPrev {
  0% {
    transform-origin: right;
    transform: scale(0.6) translateX(50%);
    opacity: 1;
  }
  100% {
    transform: none;
  }
}

@keyframes fromNext {
  0% {
    transform-origin: left;
    transform: scale(0.6) translateX(-50%);
    opacity: 1;
  }
  100% {
    transform: none;
  }
}
</style>
