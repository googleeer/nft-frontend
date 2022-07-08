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
  <transition name="fadeOut" mode="out-in">
    <div class="scene__loader flex flexCenter" v-if="visible">
      {{ count }} of 10 resources
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.scene {
  &__loader {
    z-index: 5;
    position: absolute;
    inset: 0;
    background: rgba(28, 35, 77, 1);
  }
}
</style>
