<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SceneViewLoader",
  props: {
    visible: Boolean,
    count: Number,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <transition>
    <div class="scene__loader flex flexCenter" v-if="visible">
      {{ count }} of 9 resources
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.scene {
  &__loader {
    z-index: 1;
    position: absolute;
    inset: 0;
    background: rgba(28, 35, 77, 0.92);
  }
}
</style>
