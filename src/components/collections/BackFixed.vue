<script lang="ts">
import { defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "@/store/appState.store";

export default defineComponent({
  name: "BackFixed",
  props: {
    to: Object,
    text: Object,
    infoIsOpen: {
      type: Boolean,
      default: null,
    },
    arrow: {
      type: String,
      default: "left",
    },
  },
  components: {},
  setup(props, context) {
    const { t } = useI18n();
    const appStore = useAppStateStore();
    const { isMobile } = storeToRefs(appStore);
    const currentComponent = props.to ? "RouterLink" : "button";
    const isOpen = ref(false);
    const showInfo = () => {
      if (props.to) return;
      isOpen.value = true;
      context.emit("showInfo", isOpen.value);
    };
    return {
      ROUTES,
      t,
      isMobile,
      currentComponent,
      isOpen,
      showInfo,
    };
  },
});
</script>

<template>
  <component
    :is="currentComponent"
    class="back"
    :class="['back__' + arrow, { info__open: infoIsOpen }]"
    :to="to"
    @click="showInfo()"
  >
    <p class="back__text">
      <span
        class="back__arrow"
        :class="[
          {
            left: arrow === 'right' && infoIsOpen,
            right: arrow === 'right' && !infoIsOpen,
          },
          infoIsOpen === null && arrow,
        ]"
      ></span>
      <span v-if="infoIsOpen">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L15 15M1.00003 15L8.00003 8L15 1"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span v-else> {{ text.desktop }} </span>
    </p>
  </component>
  <!--  <div class="back" v-else>-->
  <!--    <span class="back__text">{{ text.mob }}</span>-->
  <!--  </div>-->
</template>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
  background: transparent;
}
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
  &__right {
    top: auto;
    bottom: 80px;
    left: auto;
    right: 90px;
  }
  &__text {
    position: relative;
    line-height: 22px;
    color: var(--color-white);
    font-family: "SFPro", sans-serif;
    font-weight: 400;
    .left {
      left: -32px;
    }
    .right {
      transform: rotate(180deg);
      left: 100px;
    }
  }
  &__arrow {
    content: "";
    width: 100%;
    height: 100%;
    max-width: 20px;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center left;
    background-image: url("~@/assets/images/left-arrow.svg");
    top: 0;
    bottom: 0;

    @media screen and (max-width: 768px) {
      left: -28px;
    }
  }
}
.info__open {
  z-index: var(--z-idx-main-menu-blur);
  top: 50px;
  bottom: auto;
  right: 20px;
  ::v-deep(.back__arrow) {
    background-image: none;
  }
}
</style>
