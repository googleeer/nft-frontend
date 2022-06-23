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
          width="34"
          height="25"
          viewBox="0 0 34 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="burger__menu"
        >
          <path
            d="M7.25333 0.453333C6.50223 0.453333 5.89333 1.06223 5.89333 1.81333C5.89333 2.56444 6.50223 3.17333 7.25333 3.17333H32.64C33.3911 3.17333 34 2.56444 34 1.81333C34 1.06223 33.3911 0.453333 32.64 0.453333H7.25333Z"
            fill="white"
          />
          <path
            d="M7.25333 11.3333C6.50223 11.3333 5.89333 11.9422 5.89333 12.6933C5.89333 13.4444 6.50223 14.0533 7.25333 14.0533H32.64C33.3911 14.0533 34 13.4444 34 12.6933C34 11.9422 33.3911 11.3333 32.64 11.3333H7.25333Z"
            fill="white"
          />
          <path
            d="M7.25333 22.2133C6.50223 22.2133 5.89333 22.8222 5.89333 23.5733C5.89333 24.3244 6.50223 24.9333 7.25333 24.9333H32.64C33.3911 24.9333 34 24.3244 34 23.5733C34 22.8222 33.3911 22.2133 32.64 22.2133H7.25333Z"
            fill="white"
          />
          <path
            d="M3.62667 12.6933C3.62667 13.6948 2.81481 14.5067 1.81333 14.5067C0.811857 14.5067 0 13.6948 0 12.6933C0 11.6919 0.811857 10.88 1.81333 10.88C2.81481 10.88 3.62667 11.6919 3.62667 12.6933Z"
            fill="white"
          />
          <path
            d="M3.62667 1.81333C3.62667 2.81481 2.81481 3.62667 1.81333 3.62667C0.811857 3.62667 0 2.81481 0 1.81333C0 0.811857 0.811857 0 1.81333 0C2.81481 0 3.62667 0.811857 3.62667 1.81333Z"
            fill="white"
          />
          <path
            d="M3.62667 23.5733C3.62667 24.5748 2.81481 25.3867 1.81333 25.3867C0.811857 25.3867 0 24.5748 0 23.5733C0 22.5719 0.811857 21.76 1.81333 21.76C2.81481 21.76 3.62667 22.5719 3.62667 23.5733Z"
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
  width: 34px;
  height: 26px;

  @media screen and (max-width: 768px) {
    left: 20px;
    top: 43px;
    &__menu {
      width: 24px;
      height: 18px;
    }
  }
}
.active {
  left: 25px;
}
</style>
