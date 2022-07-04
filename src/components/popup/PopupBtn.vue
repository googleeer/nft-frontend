<template>
  <button class="button" href="#" :style="{ color: textColor }">
    {{ text }} <span class="button__bg" :class="styleType"></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PopupBtn",
  props: ["styleType", "text", "textColor"],
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
.button {
  position: relative;
  text-align: center;
  min-width: 138px;
  border: none;
  z-index: 0;
  background: transparent;
  padding: 23px 0;
  font-weight: 500;
  font-family: CoreSansC, sans-serif;
  font-size: 18px;
  &__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 37px;
  }
}
.default {
  background-image: url("~@/assets/images/simpleBtnBg.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.simple {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #1f1f1f;
  backdrop-filter: blur(27.1828px);
}
</style>
