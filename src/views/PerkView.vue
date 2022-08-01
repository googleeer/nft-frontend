<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { ROUTES } from "@/constants/routes.constants";
import BaseButton from "@/components/form/BaseButton.vue";
import data from "../../test-data.json";
import { useRouter } from "vue-router";
import { Perk, PerkWithDrops } from "@/service/perk/perk.type";
import { getPerk, putActivate } from "@/service/perk/perk.service";
import router from "@/router";
import { getLocalisingByKey } from "@/utils/localise";
import { useI18n } from "vue-i18n";
import CountDown from "@/components/timer/CountDown.vue";
import SlotsBig from "@/components/perks/SlotsBig.vue";
import AnimationActive from "@/components/perks/AnimationActive.vue";
export default defineComponent({
  name: "PerkView",
  components: { BaseButton, CountDown, SlotsBig, AnimationActive },
  emits: ["auctionInactive"],
  setup() {
    const needCountOfDrops = 5;
    const appStore = useAppStateStore();
    const { locale, t } = useI18n();
    const { isMobile } = storeToRefs(appStore);
    const inactiveTimer = ref(false);
    const currentIndex = ref(0);
    const tab = ["all", "active", "inactive"];
    const currentPerkId = +useRouter().currentRoute.value.params.id;
    const perk = ref<PerkWithDrops | null>(null);
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
    const btnText = computed(() =>
      perk.value?.active
        ? "Active"
        : perk.value?.slots.count === 5
        ? "Activate"
        : "Unavailable",
    ); // transated
    const loadedPerk = ref(false);
    const activatePerk = async (id: number) => {
      loadedPerk.value = true;
      if (perk.value?.slots.count !== 5 || perk.value.active) return;
      await putActivate(id);
      perk.value = await getPerk(currentPerkId);
      loadedPerk.value = false;
    };
    const nftsData = perks?.filter((item) => item.id === currentPerkId)[0];
    const countOfActiveNft = computed(() => {
      if (perk.value) {
        const dropLength = perk.value?.drops?.length;
        const canBeUsed = perk.value?.drops?.filter(
          (item) => item.canBeUsed,
        )?.length;
        return dropLength - canBeUsed
          ? t("perk.count", {
              need: dropLength - canBeUsed,
              length: dropLength,
            })
          : t("perk.success");
      }
      return "";
    });
    const localisingDesc = getLocalisingByKey<Perk>(locale);
    return {
      t,
      needCountOfDrops,
      tab,
      currentIndex,
      isMobile,
      ROUTES,
      nftsData,
      countOfActiveNft,
      perk,
      localisingDesc,
      inactiveTimer,
      auctionInactive,
      btnText,
      activatePerk,
      loadedPerk,
    };
  },
});
</script>

<template>
  <div class="wrapper" v-if="perk">
    <AnimationActive v-if="perk.active"></AnimationActive>
    <div class="perk flex align-center justify-between">
      <div
        class="flex direction-column perk__left"
        :class="{ timer__active: perk.endingDate && !inactiveTimer }"
      >
        <h1 class="perk__name">{{ perk.name }}</h1>
        <CountDown
          v-if="perk.endingDate && !inactiveTimer"
          @auctionInactive="auctionInactive()"
          :end-date="perk.endingDate"
          class="desktop"
        />
      </div>
      <div class="perk__content flex direction-column align-center">
        <SlotsBig
          :perk="perk"
          :slots="perk.slots.count"
          :activated="perk.active"
        ></SlotsBig>
        <div class="perk__content__info flex direction-column align-center">
          <p
            class="perk__content__info__get"
            v-html="localisingDesc(perk, 'description')"
          ></p>
          <span class="perk__content__info__btn">
            <BaseButton
              type="submit"
              :disabled="perk.slots.count !== 5 || loadedPerk"
              :button-text="btnText"
              @click="activatePerk(perk.id)"
              :class="{ disabled: perk.active }"
            >
              <svg
                v-if="perk.active"
                class="done"
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1L11.6093 7.46881C9.47319 10.0322 8.40512 11.3139 7 11.3139C5.59488 11.3139 4.52681 10.0322 2.39067 7.46881L1 5.8"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </BaseButton>
          </span>
        </div>
      </div>
      <div class="perk__nfts flex direction-column">
        <h2 class="perk__nfts__title desk-none">
          {{ countOfActiveNft }}
        </h2>
        <div class="perk__nfts__need flex">
          <h2 class="perk__nfts__title mob-none">
            {{ countOfActiveNft }}
          </h2>
          <router-link
            v-for="nft of perk.drops"
            :key="nft.id"
            :to="{
              name: ROUTES.DROP.name,
              params: { id: nft.id, collectionId: nft.collection.id },
            }"
            class="perk__nfts__need--link"
          >
            <div
              class="perk__nfts__need--block flex"
              :class="[
                {
                  active:
                    (!nft.hasMint && nft.canBeUsed) || perk.slots.count === 5,
                },
                { hasMint: nft.hasMint && perk.slots.count !== 5 },
              ]"
            >
              <div class="overflow">
                <img
                  class="perk__nfts__need--img"
                  :src="
                    nft.cube?.url || require('../assets/images/perks/nft1.png')
                  "
                />
              </div>
              <span
                class="perk__nfts__need--mint flex flexCenter"
                v-if="nft.hasMint && perk.slots.count !== 5"
                >{{ t("perk.mint") }}
              </span>
            </div>
          </router-link>

          <div
            class="perk__nfts__need--plug"
            v-for="drop of needCountOfDrops - perk.drops.length"
            :key="drop.id"
            :class="{ none: perk.drops.length === needCountOfDrops }"
          >
            <img
              class="perk__nfts__need--img"
              :src="require('../assets/images/noDrop.png')"
            />
          </div>
        </div>
      </div>
      <CountDown
        v-if="perk.endingDate && !inactiveTimer"
        :end-date="perk.endingDate"
        class="mob"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overflow {
  overflow: hidden;
}
.none {
  display: none;
}
.disabled {
  pointer-events: none;
}
.done {
  position: absolute;
  right: 34px;
}
.wrapper {
  width: 100%;
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
  .timer__active {
    margin-top: auto;
  }
  &__left {
    width: calc((100% - 530px) / 2);
    min-width: min-content;
    display: inline-block;
    margin-right: 20px;
    @media screen and (max-width: 1346px) {
      text-align: center;
      margin-bottom: 40px;
      margin-left: 20px;
      width: 100%;
    }
  }
  &__timer {
    width: 100%;
    position: relative;
    max-width: 328px;
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
      @media screen and (max-width: 768px) {
        font-size: 18px;
      }
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
    position: relative;
    font-weight: 600;
    font-size: 74px;
    line-height: 130%;
    display: inline;
    @media screen and (max-width: 1346px) {
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      max-width: max-content;
    }
    &::after {
      position: absolute;
      bottom: -18px;
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
        bottom: -10px;
        height: 4px;
      }
    }
  }
  &__content {
    position: relative;
    width: 40%;
    max-width: 530px;
    min-width: 530px;
    box-sizing: content-box;
    @media screen and (max-width: 1346px) {
      max-width: 374px;
      min-width: 374px;
      text-align: center;
      ::v-deep(svg) {
        max-width: 266px;
        max-height: 266px;
      }
      ::v-deep(.img) {
        max-width: 130px;
        max-height: 130px;
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
        padding-bottom: 53px;
        padding-top: 40px;
        margin: 0 20px;
        text-align: center;
        font-weight: 400;
        font-size: 26px;
        line-height: 18px;
        ::v-deep(u) {
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
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          @media screen and (max-width: 1346px) {
            padding-bottom: 35px;
            font-size: 28px;
          }
        }
        @media screen and (max-width: 1346px) {
          font-size: 22px;
        }
      }

      &__btn {
        position: absolute;
        z-index: 3;
        bottom: -32px;
        @media screen and (max-width: 1346px) {
          bottom: -30px;
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
    width: calc((100% - 530px) / 2);
    margin-left: 20px;
    @media screen and (max-width: 1346px) {
      max-width: 480px;
      padding-top: 86px;
      width: 100%;
    }
    @media screen and (max-width: 768px) {
      max-width: 300px;
    }
    @media screen and (max-width: 1346px) {
      .mob-none {
        display: none;
      }
    }
    @media screen and (min-width: 1347px) {
      .desk-none {
        display: none;
      }
    }
    &__title {
      width: 100%;
      padding-left: 8px;
      padding-bottom: 30px;
      font-size: 20px;
      line-height: 130%;
    }
    &__need {
      display: flex;
      flex-wrap: wrap;
      margin-left: auto;
      max-width: 375px;

      &--img {
        width: 100px;
        border-radius: 24px;
        transform: scale(1.5) translateY(-5px);
        @media screen and (max-width: 768px) {
          max-width: 74px;
        }
      }

      @media screen and (max-width: 1346px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        width: 100%;
        max-width: none;
        justify-content: flex-start;
      }
      &::-webkit-scrollbar {
        width: 5px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        box-shadow: inset 0 0 5px #dddddd;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #9e9e9e;
        background: linear-gradient(
          89.99deg,
          #fcfff9 9.64%,
          #e9eef7 44.04%,
          #d5e7f0 61.4%,
          #c1d8ef 95.53%
        );
        border-radius: 2px;
      }
      .hasMint {
        position: relative;
        &::before {
          position: absolute;
          content: "";
          background-image: url("~@/assets/images/bgMint.png");
          background-repeat: no-repeat;
          background-size: contain;
          bottom: -18px;
          right: calc(50% - 41px);
          width: 100%;
          max-width: 82px;
          height: 36px;
          @media screen and (max-width: 768px) {
            max-width: 74px;
            right: calc(50% - 37px);
          }
        }
        .perk__nfts__need--mint {
          position: absolute;
          bottom: -20px;
          right: calc(50% - 41px);
          width: 100%;
          max-width: 82px;
          height: 36px;
          color: var(--color-black);
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
          @media screen and (max-width: 768px) {
            max-width: 74px;
            right: calc(50% - 37px);
          }
        }
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
          background-size: contain;
          background-repeat: no-repeat;
          @media screen and (max-width: 768px) {
            max-width: 24px;
            width: calc(50% - 12px);
            right: calc(50% - 12px);
          }
        }
      }
      &--link,
      &--plug {
        margin-bottom: 35px;
        margin-left: 8px;
        margin-right: 8px;
        z-index: 3;
      }
      &--plug {
        @media screen and (max-width: 768px) {
          max-width: 74px;
        }
      }
    }
  }
}

div ::v-deep(.layout__header) {
  background-color: red;
}
</style>
