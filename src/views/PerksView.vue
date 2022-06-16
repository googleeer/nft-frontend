<script lang="ts">
import { defineComponent, ref } from "vue";
import data from "../../test-data.json";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "PerksView",
  setup() {
    const appStore = useAppStateStore();
    const { isMobile } = storeToRefs(appStore);
    const currentIndex = ref(0);
    const tab = ["all", "active", "inactive"];
    const perks = data[2].myperks;
    const filteredData = () => {
      if (currentIndex.value === 0) {
        return perks;
      } else if (currentIndex.value === 1) {
        return perks?.filter((item) => item.id === 1);
      } else {
        return perks?.filter((item) => item.id == 2);
      }
    };
    return { tab, currentIndex, perks, filteredData, isMobile };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column justify-center align-center">
    <ul class="filter flex">
      <li
        class="filter__item"
        v-for="(rule, index) of tab"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      >
        {{ rule }}
      </li>
    </ul>
    <div
      class="perks flex justify-center"
      :class="{ 'align-center': !isMobile }"
    >
      <div class="perk" v-for="(perk, i) of filteredData()" :key="i">
        <div class="perk__img">
          <img class="perk__img__icon" src="@/assets/images/perks/heart.png" />
        </div>
        <div class="perk__content">
          <h2 class="perk__content__name">{{ perk.name }}</h2>
          <p class="perk__content__desc">{{ perk.desc }}</p>
          <p class="perk__content__action">{{ perk.youGet }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  padding-bottom: 60px;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
  &__item {
    font-family: CoreSansC, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    &:first-letter {
      text-transform: uppercase;
    }
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
}

.wrapper {
  padding-top: 120px;
  width: 100%;
  max-width: 1361px;
  margin: 0 auto;
}
.perks {
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
}
.perk {
  box-sizing: content-box;
  width: 290px;
  height: calc(376px - 182px);
  position: relative;
  z-index: 0;
  margin: 50px 15px;
  @media screen and (max-width: 1280px) {
    margin: 50px 33px;
  }
  @media screen and (max-width: 711px) {
    width: 100%;
    height: 157px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    max-width: 375px;
    .perk__img {
      width: 100%;
      max-width: 157px;
      height: auto;
      &__icon {
        width: 100%;
        max-width: 157px;
      }
    }
  }
  &__content {
    width: 100%;
    max-width: 240px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 34px;
    @media screen and (max-width: 711px) {
      display: inline-block;
      max-width: 180px;
      padding-left: 0;
    }
    &__name {
      position: relative;
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      @media screen and (max-width: 768px) {
        display: inline;
      }
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        max-width: 145px;
        height: 2px;
        background: linear-gradient(
          307.82deg,
          #81ff81 -7.19%,
          #fbfef9 32.88%,
          #ff8bec 48.41%,
          #ffffff 75.25%,
          #3854ff 109.05%
        );
        bottom: -6px;
        left: 0;
      }
    }
    &__desc {
      font-weight: 500;
      padding-top: 27px;
      font-size: 20px;
      line-height: 18px;
      font-family: Avenir, sans-serif;
      padding-bottom: 10px;
      @media screen and (max-width: 711px) {
        font-size: 16px;
        padding-top: 17px;
        padding-bottom: 6px;
      }
    }
    &__action {
      font-weight: 800;
      font-size: 20px;
      line-height: 120%;
      background: linear-gradient(
        307.82deg,
        #81ff81 -7.19%,
        #fbfef9 32.88%,
        #ff8bec 48.41%,
        #ffffff 75.25%,
        #3854ff 109.05%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      @media screen and (max-width: 711px) {
        font-size: 18px;
      }
      @media screen and (max-width: 400px) {
        font-size: 16px;
      }
    }
  }
  &:after {
    content: "";
    border-radius: 15px;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
  }

  &:nth-child(odd) {
    padding-top: 290px;
    @media screen and (max-width: 711px) {
      margin: 7px 0 7px 10px;
      padding: 23px 28px 23px 0px;
    }
    @media screen and (max-width: 711px) {
      .perk__content {
        margin: 0 0 0 175px;
      }
    }
    .perk__content__name {
      padding-top: 28px;
      @media screen and (max-width: 711px) {
        font-size: 24px;
      }
    }
    &:after {
      top: 145px;
      bottom: 0;
      @media screen and (max-width: 711px) {
        left: 80px;
        top: 0;
      }
    }

    .perk__img {
      top: 0;
      @media screen and (max-width: 711px) {
        bottom: 0;
        top: auto;
      }
    }
  }

  &:nth-child(even) {
    padding-bottom: 290px;
    @media screen and (max-width: 711px) {
      display: flex;
      justify-content: flex-start;
      margin: 7px 10px 7px 0;
      padding: 33px 0 33px 28px;
    }
    .perk__content__name {
      padding-top: 34px;
      @media screen and (max-width: 711px) {
        font-size: 24px;
      }
    }
    @media screen and (max-width: 711px) {
      .perk__content {
        margin-right: 165px;
      }
    }
    &:after {
      top: 0;
      bottom: 145px;
      @media screen and (max-width: 711px) {
        right: 80px;
        bottom: 0;
      }
    }

    .perk__img {
      bottom: 0;
      @media screen and (max-width: 711px) {
        right: 0;
        left: auto;
      }
    }
  }

  &__img {
    width: 290px;
    height: 290px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
