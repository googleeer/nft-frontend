<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "@/store/appState.store";

export default defineComponent({
  name: "BackFixed",
  props: {
    to: Object,
    text: Object,
  },
  components: {},
  setup() {
    const { t } = useI18n();
    const appStore = useAppStateStore();
    const { isMobile } = storeToRefs(appStore);

    return {
      ROUTES,
      t,
      isMobile,
    };
  },
});
</script>

<template>
  <router-link class="back" v-if="!isMobile" :to="to">
    <p class="back__text">{{ text.desktop }}</p>
  </router-link>
  <div class="back" v-else>
    <span class="back__text">{{ text.mob }}</span>
  </div>
</template>

<style lang="scss" scoped>
.back {
  position: fixed;
  top: 117px;
  left: 95px;
  z-index: 2;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
  &__text {
    position: relative;
    line-height: 22px;
    color: var(--color-white);
    font-family: "SFPro", sans-serif;
    font-weight: 400;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: url("~@/assets/images/left-arrow.svg");
      background-repeat: no-repeat;
      left: -34px;
      top: 0;
      bottom: 0;
      background-position: center left;
    }
  }
}
</style>
