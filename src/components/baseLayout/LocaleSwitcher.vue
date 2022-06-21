<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LocaleSwitcher",

  setup() {
    const { locale } = useI18n();
    const locales = {
      en: "Eng",
      es: "Es",
    };
    const isOpen = ref(false);
    const localesArray = Object.entries(locales);
    const currentLocale = computed(() =>
      localesArray.find((item) => item[0] === locale.value),
    );
    const getLocaleList = computed(() =>
      localesArray.filter((item) => item[0] !== locale.value),
    );
    const closeLocaleList = () => {
      isOpen.value = false;
    };
    console.log(getLocaleList.value);
    return {
      locale,
      locales,
      currentLocale,
      isOpen,
      getLocaleList,
      closeLocaleList,
    };
  },
});
</script>

<template>
  <div class="current__locale flex align-center" @click.stop="isOpen = !isOpen">
    <span class="current__locale__text">{{ locales[locale] }}</span
    ><svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ active: isOpen }"
    >
      <path
        d="M17 10L15.2527 11.763C13.8592 13.1689 13.1625 13.8719 12.3133 13.9801C12.1053 14.0066 11.8947 14.0066 11.6867 13.9801C10.8375 13.8719 10.1408 13.1689 8.74731 11.763L7 10"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
    <transition name="fade">
      <ul
        class="locale__list flex direction-column align-center"
        v-if="isOpen"
        v-click-outside:[300]="closeLocaleList"
      >
        <li
          class="locale__list__locale"
          :class="{ active: key === locale }"
          v-for="(value, key) in getLocaleList"
          :key="key"
          @click="locale = value[0]"
        >
          <span class="locale__list__item">
            {{ value[1] }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
  <!--  <ul class="locales flex align-center">-->
  <!--    <li-->
  <!--      class="locale"-->
  <!--      :class="{ active: key === locale }"-->
  <!--      v-for="(value, key) in locales"-->
  <!--      :key="key"-->
  <!--      @click="locale = key"-->
  <!--    >-->
  <!--      {{ value }}-->
  <!--    </li>-->
  <!--  </ul>-->
</template>

<style lang="scss" scoped>
.current__locale {
  position: relative;
  font-family: Avenir, sans-serif;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 70px;
    position: fixed;
    z-index: var(--z-idx-header-items);
    right: 25px;
    top: 39px;
  }
  svg {
    width: 100%;
    transition: all 0.3s ease;
  }
  &__text {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    padding-right: 11px;
  }
}
.current__locale:hover {
  cursor: pointer;
}
.locale__list {
  width: 100%;
  min-width: 100px;
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  border-radius: 18px;
  padding: 20px 0;
  background: radial-gradient(
    113.12% 113.12% at 50.52% 50.52%,
    #292929 0%,
    #000000 100%
  );
  @media screen and (max-width: 768px) {
    top: calc(100% + 20px);
  }
  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
  &__locale {
    position: relative;
    margin: 3px 0;
    padding: 8px 5px;
    text-align: center;
    display: inline-block;
    &::after {
      position: absolute;
      top: 40px;
      content: "";
      width: 100%;
      height: 2px;
      background: linear-gradient(
        307.82deg,
        #81ff81 -7.19%,
        #fbfef9 32.88%,
        #ff8bec 48.41%,
        #ffffff 75.25%,
        #3854ff 109.05%
      );
      left: 0;
    }
  }
  &__item {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
  }
}
.active {
  transform: rotate(180deg);
}
</style>
