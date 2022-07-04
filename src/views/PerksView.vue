<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { ROUTES } from "@/constants/routes.constants";
import { Perk } from "@/service/perk/perk.type";
import { getPerks } from "@/service/perk/perk.service";
import router from "@/router";
import { getLocalisingByKey } from "@/utils/localise";
import { useI18n } from "vue-i18n";
import Slots from "@/components/perks/Slots.vue";
export default defineComponent({
  name: "PerksView",
  components: { Slots },
  setup() {
    const appStore = useAppStateStore();
    const { locale } = useI18n();
    const { isMobile } = storeToRefs(appStore);
    const currentIndex = ref(0);
    const tab = ["all", "active", "inactive"];
    const perks = ref<Perk[]>([]);
    appStore.setPreloaderValue(true);
    getPerks()
      .then((data) => {
        perks.value = data;
        console.log(data);
      })
      .catch(() => router.push(ROUTES.HOME))
      .finally(() => appStore.setPreloaderValue(false));
    const staticData = {
      19: {
        img: "perkBg.svg",
        youGet: "by back price $5 (not $3)",
      },
      20: {
        img: "perkBg.svg",
        youGet: "company owner",
      },
    };
    const filteredData = () => {
      if (currentIndex.value === 0) {
        return perks.value;
      } else if (currentIndex.value === 1) {
        return perks.value.filter((item) => item.active);
      } else {
        return perks.value.filter((item) => !item.active);
      }
    };
    const someFun = getLocalisingByKey<Perk>(locale);

    return {
      tab,
      currentIndex,
      perks,
      filteredData,
      isMobile,
      ROUTES,
      staticData,
      someFun,
    };
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
      v-if="perks"
    >
      <RouterLink
        :to="{
          name: ROUTES.PERK.name,
          params: { id: perk.id },
        }"
        class="perk"
        v-for="(perk, i) of filteredData()"
        :key="i"
      >
        <div class="perk__img">
          <Slots :slots="perk.slots"></Slots>
        </div>
        <div class="perk__content">
          <h2 class="perk__content__name">{{ perk.name }}</h2>
          <p class="perk__content__desc">
            {{ someFun(perk, "description").value }}
          </p>
          <p class="perk__content__action">{{ staticData[perk.id].youGet }}</p>
        </div>
      </RouterLink>
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
  //justify-content: space-between;
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
  text-decoration: none;
  color: var(--color-white);
  z-index: 0;
  margin: 50px 33px;

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
        ::v-deep(path) {
          stroke-opacity: 1;
        }
      }
    }
  }
  &__content {
    width: 100%;
    max-width: 240px;
    position: relative;
    display: inline-block;
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
        //max-width: 145px;
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
    @media screen and (max-width: 374px) {
      padding: 23px 10px 23px 0px;
    }
    @media screen and (max-width: 711px) {
      .perk__content {
        margin: 0 0 0 165px;
      }
    }
    .perk__content__name {
      padding-top: 28px;
      display: inline-block;
      @media screen and (max-width: 711px) {
        padding-top: 0;
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
    @media screen and (max-width: 374px) {
      padding: 33px 0 33px 10px;
    }
    .perk__content__name {
      padding-top: 34px;
      display: inline-block;
      @media screen and (max-width: 711px) {
        padding-top: 0;
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
