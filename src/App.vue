<script lang="ts">
import { defineComponent, computed, Component } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";
import BasePopup from "@/components/popup/BasePopup.vue";
export default defineComponent({
  name: "App",
  components: {
    BasePopup,
    BaseLayout,
  },
  setup() {
    const appStateStore = useAppStateStore();
    const route = useRoute();
    const { preloader } = storeToRefs(appStateStore);

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    appStateStore.setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e: MediaQueryListEvent) =>
      appStateStore.setIsMobile(e.matches),
    );

    const layouts: Record<string, Component> = {
      base: BaseLayout,
    };
    const layout = computed<Component | null>(() =>
      route.meta.layout ? layouts[route.meta.layout] : null,
    );
    return {
      preloader,
      layout,
      route,
    };
  },
});
</script>

<template>
  <!--  <transition name="fade">-->
  <!--    <div v-if="preloader">-->
  <!--      <h1>This is loader ;)</h1>-->
  <!--    </div>-->
  <!--  </transition>-->
  <BasePopup />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component v-if="layout" :is="layout">
        <component :is="Component" />
      </component>
      <component v-else :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "assets/styles/main";
</style>
