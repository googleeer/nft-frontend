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
      .catch(() => router.push(ROUTES.COLLECTIONS.name))
      .finally(() => appStore.setPreloaderValue(false));

    const filteredData = () => {
      if (currentIndex.value === 0) {
        return perks.value;
      } else if (currentIndex.value === 1) {
        return perks.value.filter((item) => item.active);
      } else {
        return perks.value.filter((item) => !item.active);
      }
    };
    const localisingDesc = getLocalisingByKey<Perk>(locale);

    return {
      tab,
      currentIndex,
      perks,
      filteredData,
      isMobile,
      ROUTES,
      localisingDesc,
    };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column justify-center">
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
    <div class="perks flex justify-center" v-if="perks">
      <RouterLink
        :to="{
          name: ROUTES.PERK.name,
          params: { id: perk.id },
        }"
        class="perk flex direction-column"
        v-for="(perk, i) of filteredData()"
        :key="i"
      >
        <div class="perk__img">
          <Slots
            :activated="perk.active"
            :perk="perk"
            :slots="perk.slots.count"
          ></Slots>
        </div>
        <div class="perk__content">
          <h2 class="perk__content__name">{{ perk.name }}</h2>
          <p
            class="perk__content__desc"
            v-html="localisingDesc(perk, 'description')"
          ></p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  padding-bottom: 60px;
  margin: 0 auto;
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
  flex-wrap: wrap;
  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
}
.perk {
  position: relative;
  width: 100%;
  max-width: 290px;
  text-decoration: none;
  color: var(--color-white);
  margin: 50px 33px;

  @media screen and (max-width: 768px) {
    margin: 25px 10px;
  }

  &__img {
    height: 290px;
  }

  &:nth-child(even) {
    flex-direction: column-reverse;

    .perk__content {
      padding-top: 28px;
      padding-bottom: 37px;
      border-radius: 15px 15px 0px 0px;
      @media screen and (max-width: 400px) {
        padding-right: 25px;
      }

      &::before {
        top: auto;
        bottom: -145px;
      }
    }
  }

  &:nth-child(odd) {
    .perk__content {
      padding-top: 37px;
      padding-bottom: 28px;
    }
  }

  ::v-deep(.slots) {
    z-index: 1;
    height: 290px;

    .img {
      width: 150px;
      max-height: 150px;
    }
  }

  &__content {
    max-width: 280px;
    margin: 0 auto;
    z-index: 0;
    position: relative;
    height: 100%;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    padding-bottom: 10px;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    display: inline-block;
    padding-left: 34px;
    padding-right: 34px;

    &__name {
      position: relative;
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      display: inline-block;

      &::after {
        position: absolute;
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

      ::v-deep(u) {
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
      }

      @media screen and (max-width: 711px) {
        font-size: 16px;
        padding-top: 17px;
        padding-bottom: 6px;
      }
    }
  }

  &__content::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 145px;
    z-index: -1;
    top: -145px;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    background-size: 100%;
    left: 0;
  }
}
</style>
