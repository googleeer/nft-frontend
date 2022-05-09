<script lang="ts">
import { defineComponent } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "App",
  setup() {
    const appStateStore = useAppStateStore();
    const { preloader } = storeToRefs(appStateStore);
    return {
      preloader,
    };
  },
});
</script>

<template>
  <transition name="fade">
    <div v-if="preloader">
      <h1>This is loader ;)</h1>
    </div>
  </transition>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "assets/styles/main";
</style>
