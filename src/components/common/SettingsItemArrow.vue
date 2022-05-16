<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsItemArrow",
  setup() {
    return {};
  },
});
</script>

<template>
  <span class="arrow flex flexCenter">
    <svg
      class="arrow__svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0677 5.63455L17.4331 11L12.0677 16.3654"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.49682 11L17.2827 11"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.arrow {
  background: rgba(0, 0, 0, 0.5);
  border: 1.8px solid #191919;
  backdrop-filter: blur(27.1828px);
  border-radius: 32px;
  width: 56px;
  height: 40px;

  &__svg {
    transition: all 0.3s ease;
  }
}
</style>
