<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { ROUTES } from "@/constants/routes.constants";
import BaseButton from "@/components/form/BaseButton.vue";
import data from "../../test-data.json";
import { useRouter } from "vue-router";
import { Perk } from "@/service/collections/collections.type";
import { getPerk } from "@/service/collections/collection.service";
import router from "@/router";
import { getLocalisingByKey } from "@/utils/localise";
import { useI18n } from "vue-i18n";
import CountDown from "@/components/timer/CountDown.vue";
export default defineComponent({
  name: "PerkView",
  components: { BaseButton, CountDown },
  emits: ["auctionInactive"],
  setup() {
    const appStore = useAppStateStore();
    const { locale } = useI18n();
    const { isMobile } = storeToRefs(appStore);
    const inactiveTimer = ref(false);
    const currentIndex = ref(0);
    const tab = ["all", "active", "inactive"];
    const currentPerkId = +useRouter().currentRoute.value.params.id;
    const perk = ref<Perk | null>(null);
    appStore.setPreloaderValue(true);
    const auctionInactive = () => {
      inactiveTimer.value = true;
    };
    getPerk(currentPerkId)
      .then((data) => {
        perk.value = data;
        console.log(data);
      })
      .catch(() => router.push({ name: ROUTES.PERKS.name }))
      .finally(() => appStore.setPreloaderValue(false));
    const perks = data[2].myperks;
    const staticData = {
      19: {
        img: "heart.png",
        youGet: "by back price $5 (not $3)",
      },
      20: {
        img: "brilliant.png",
        youGet: "company owner",
      },
    };
    const nftsData = perks?.filter((item) => item.id === currentPerkId)[0];
    const countOfActiveNft = nftsData?.nfts.filter(
      (item) => item.active,
    ).length;
    const someFun = getLocalisingByKey<Perk>(locale);
    return {
      tab,
      currentIndex,
      isMobile,
      ROUTES,
      nftsData,
      countOfActiveNft,
      perk,
      staticData,
      someFun,
      inactiveTimer,
      auctionInactive,
    };
  },
});
</script>

<template>
  <div class="wrapper" v-if="perk">
    <div class="perk flex align-center justify-between">
      <div class="flex direction-column perk__left">
        <h1 class="perk__name">{{ perk.name }}</h1>
        <CountDown
          v-if="perk.endingDate && !inactiveTimer"
          @auctionInactive="auctionInactive()"
          :end-date="perk.endingDate"
          class="desktop"
        />
      </div>
      <div class="perk__content flex direction-column align-center">
        <img class="perk__content__img" src="@/assets/images/heart-big.png" />
        <div class="perk__content__info flex direction-column align-center">
          <p class="perk__content__info__get">
            {{ someFun(perk, "description").value }}
          </p>
          <p class="perk__content__info__condition">
            {{ staticData[perk.id].youGet }}
          </p>
          <span class="perk__content__info__btn">
            <BaseButton
              type="submit"
              :disabled="true"
              button-text="Inactivate"
            ></BaseButton>
          </span>
        </div>
      </div>
      <div class="perk__nfts flex direction-column">
        <h2 class="perk__nfts__title">
          Need {{ nftsData.nfts.length - countOfActiveNft }} out of
          {{ nftsData.nfts.length }} NFTs
        </h2>
        <div class="perk__nfts__need flex">
          <div
            class="perk__nfts__need--block flex"
            v-for="nft of nftsData.nfts"
            :key="nft.id"
            :class="{ active: nft.active }"
          >
            <img
              class="perk__nfts__need--img"
              :src="require(`@/assets/images/perks/${nft.img}`)"
            />
          </div>
        </div>
      </div>
      <CountDown :end-date="perk.endingDate" class="mob" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 1475px;
  margin: 0 auto;
  padding: 120px 60px 0;
  box-sizing: border-box;
  @media screen and (max-width: 1346px) {
    padding: 120px 0 0;
    .desktop {
      display: none;
    }
  }
  @media screen and (min-width: 1347px) {
    .mob {
      display: none;
    }
  }
  .mob {
    margin-top: 48px;
  }
}
.perk {
  &__left {
    height: 100%;
    max-height: 100px;
  }
  &__timer {
    width: 100%;
    position: relative;
    max-width: 328px;
    margin: 75px auto 0px;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    border: 1px solid #212121;
    border-radius: 40px;
    &__title {
      width: 100%;
      max-width: 156px;
      position: absolute;
      top: -15px;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      padding: 8px 18px;
      background-image: url("~@/assets/images/bg-title.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      text-align: center;
      color: var(--color-black);
    }
    &__time {
      width: 100%;
      text-align: center;
      padding: 30px 57px 13px;

      &--count {
        font-size: 24px;
        line-height: 40px;
      }
      &--title {
        font-size: 12px;
        line-height: 24px;
        opacity: 0.65;
      }
      &--hrs {
      }
    }
  }
  @media screen and (max-width: 1346px) {
    flex-direction: column;
  }
  &__name {
    width: 100%;
    max-width: 400px;
    display: inline;
    position: relative;
    font-weight: 600;
    font-size: 74px;
    line-height: 130%;
    white-space: nowrap;
    @media screen and (max-width: 1346px) {
      padding-bottom: 40px;
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      max-width: max-content;
    }
    &::after {
      position: absolute;
      top: 114px;
      content: "";
      width: 100%;
      height: 6px;
      background: linear-gradient(
        307.82deg,
        #81ff81 -7.19%,
        #fbfef9 32.88%,
        #ff8bec 48.41%,
        #ffffff 75.25%,
        #3854ff 109.05%
      );
      left: 0;
      @media screen and (max-width: 1346px) {
        top: 35px;
        height: 4px;
      }
    }
  }
  &__content {
    position: relative;
    width: 100%;
    max-width: 530px;
    min-width: 530px;
    box-sizing: content-box;
    @media screen and (max-width: 1346px) {
      max-width: 374px;
      min-width: 374px;
      text-align: center;
      &__img {
        max-width: 266px;
      }
      @media screen and (max-width: 374px) {
        max-width: 320px;
        min-width: 320px;
      }
    }
    &__info {
      width: 100%;
      background: radial-gradient(
        113.12% 113.12% at 50.52% 50.52%,
        #292929 0%,
        #000000 100%
      );
      border: 1px solid #212121;
      border-radius: 32px;
      @media screen and (max-width: 1346px) {
        max-width: 374px;
      }
      &__get {
        padding-top: 40px;
        padding-bottom: 13.5px;
        font-weight: 400;
        font-size: 26px;
        line-height: 18px;
        @media screen and (max-width: 1346px) {
          font-size: 22px;
        }
      }
      &__condition {
        font-weight: 400;
        font-size: 38px;
        line-height: 110%;
        background: linear-gradient(
          307.82deg,
          #81ff81 -7.19%,
          #fbfef9 32.88%,
          #ff8bec 48.41%,
          #ffffff 75.25%,
          #3854ff 109.05%
        );
        padding-bottom: 53px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        @media screen and (max-width: 1346px) {
          padding-bottom: 35px;
          font-size: 28px;
        }
      }
      &__btn {
        position: absolute;
        bottom: -32px;
        @media screen and (max-width: 1346px) {
          bottom: -45px;
        }
        @media screen and (max-width: 374px) {
          .button {
            min-width: 310px;
            max-width: 310px;

            ::v-deep(.button__background) {
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  &__nfts {
    width: 100%;
    max-width: 348px;
    @media screen and (max-width: 1346px) {
      max-width: 480px;
      padding-top: 86px;
    }
    &__title {
      padding-left: 12px;
      padding-bottom: 30px;
      font-size: 20px;
      line-height: 130%;
    }
    &__need {
      display: flex;
      flex-wrap: wrap;
      max-width: 375px;

      @media screen and (max-width: 1346px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        width: 100%;
        max-width: none;
        justify-content: flex-start;
      }
      &::-webkit-scrollbar {
        height: 12px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #444444;
        border-radius: 10px;
      }
      .active {
        position: relative;

        &::before {
          position: absolute;
          content: "";
          background-image: url("~@/assets/images/done.png");
          bottom: -18px;
          right: calc(50% - 18px);
          width: 100%;
          max-width: 36px;
          height: 36px;
        }
      }
      &--block {
        padding: 0 8px;
        margin-bottom: 35px;
        &:not(.active) {
          opacity: 0.64;
        }
      }
    }
  }
}
</style>
