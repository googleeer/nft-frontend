<script lang="ts">
import { defineComponent } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "BaseLayout",
  components: {},
  setup() {
    const appState = useAppStateStore();
    const { preloader } = storeToRefs(appState);
    return { preloader };
  },
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="preloader" v-if="preloader">
      <img src="@/assets/images/preloader.gif" />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  inset: 0;
  left: 0px;
  z-index: var(--z-index-preloader);
  background: rgba(0, 0, 0, 0.45);
  -webkit-backdrop-filter: blur(27.1828px);
  backdrop-filter: blur(27.1828px);
  img {
    width: 270px;
    height: 270px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 768px) {
      width: 197px;
      height: 197px;
    }
  }
}
</style>
