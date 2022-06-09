<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseBurger",
  props: {
    isOpen: Boolean,
  },
  emits: ["update:isOpen"],
  setup() {
    return {};
  },
});
</script>

<template>
  <button
    class="burger flex align-center justify-center"
    :class="{ active: isOpen }"
    @click="$emit('update:isOpen', !isOpen)"
  >
    <transition name="fade" mode="out-in">
      <span>
        <svg
          v-if="!isOpen"
          width="19"
          height="14"
          viewBox="0 0 19 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 0.25C3.58579 0.25 3.25 0.585786 3.25 1C3.25 1.41421 3.58579 1.75 4 1.75H18C18.4142 1.75 18.75 1.41421 18.75 1C18.75 0.585786 18.4142 0.25 18 0.25H4Z"
            fill="white"
          />
          <path
            d="M4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75H18C18.4142 7.75 18.75 7.41421 18.75 7C18.75 6.58579 18.4142 6.25 18 6.25H4Z"
            fill="white"
          />
          <path
            d="M4 12.25C3.58579 12.25 3.25 12.5858 3.25 13C3.25 13.4142 3.58579 13.75 4 13.75H18C18.4142 13.75 18.75 13.4142 18.75 13C18.75 12.5858 18.4142 12.25 18 12.25H4Z"
            fill="white"
          />
          <path
            d="M2 7C2 7.55228 1.55228 8 1 8C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6C1.55228 6 2 6.44772 2 7Z"
            fill="white"
          />
          <path
            d="M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1Z"
            fill="white"
          />
          <path
            d="M2 13C2 13.5523 1.55228 14 1 14C0.447715 14 0 13.5523 0 13C0 12.4477 0.447715 12 1 12C1.55228 12 2 12.4477 2 13Z"
            fill="white"
          />
        </svg>
        <svg
          v-else
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
    </transition>
  </button>
</template>

<style lang="scss" scoped>
.burger {
  position: fixed;
  left: 58px;
  top: 50px;
  z-index: var(--z-idx-header-items);
  background-color: transparent;
  border: none;
  width: 24px;
  height: 24px;

  @media screen and (max-width: 768px) {
    left: 20px;
    top: 43px;
  }
}
.active {
  left: 25px;
}
</style>
