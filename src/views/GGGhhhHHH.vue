<script lang="ts">
import { defineComponent } from "vue";
import ThreeView from "@/components/3d/ThreeView.vue";

export default defineComponent({
  name: "GGGhhhHHH",
  components: { ThreeView },
  setup() {
    return {};
  },
});
</script>

<template>
  <div style="position: relative; z-index: 1">
    <ThreeView
      nft-model-scene="/wedar_360_2k_smallsize_v2.exr"
      nft-model="/Flower3_5g_Alien.glb"
    />
  </div>
</template>

<style lang="scss" scoped></style>
