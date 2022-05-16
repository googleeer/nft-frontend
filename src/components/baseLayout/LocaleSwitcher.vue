<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LocaleSwitcher",
  setup() {
    const { locale } = useI18n();
    const locales = {
      en: "Eng",
      es: "Es",
    };
    return { locale, locales };
  },
});
</script>

<template>
  <ul class="locales flex align-center">
    <li
      class="locale"
      :class="{ active: key === locale }"
      v-for="(value, key) in locales"
      :key="key"
      @click="locale = key"
    >
      {{ value }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.locales {
  @media screen and (max-width: 768px) {
    position: fixed;
    right: 25px;
    top: 39px;
    z-index: var(--z-idx-header-items);
  }
}
.locale {
  font-family: Avenir, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  &:not(:last-child) {
    margin-right: 36px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -18px;
      width: 1px;
      height: 11px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &:not(.active) {
    cursor: pointer;
    opacity: 0.6;
  }
}
</style>
