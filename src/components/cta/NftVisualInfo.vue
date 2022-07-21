<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { getLocalisingByKey } from "@/utils/localise";
import { Drop } from "@/service/drop/drop.type";
import Slots from "@/components/perks/Slots.vue";
export default defineComponent({
  name: "NftVisualInfo",
  components: { Slots },
  props: {
    title: String,
    desc: String,
    drop: Object,
    to: Object,
    preview: String,
    minted: Object,
    perks: Object,
  },
  setup() {
    const { t, locale } = useI18n();
    const countOfMaxWordDesc = 21;
    const isMoreThanMaxWordDesc = (desc: string) => {
      return desc.length > countOfMaxWordDesc ? "..." : "";
    };
    const localisingDesc = getLocalisingByKey<Drop>(locale);

    return {
      ROUTES,
      t,
      isMoreThanMaxWordDesc,
      countOfMaxWordDesc,
      localisingDesc,
    };
  },
});
</script>

<template>
  <RouterLink class="nft__link flex direction-column" :to="to">
    <div class="nft__link--wrap">
      <img
        class="nft__link__img"
        :src="preview || require('@/assets/images/mynft/1.png')"
      />
      <div v-if="minted.minted" class="minted flex align-center">
        <span class="nft__link--minted flex flexCenter">{{
          minted.minted
        }}</span>
        <span class="nft__link--text">{{ minted.text }}</span>
      </div>
      <div v-if="perks" class="nft__link--perks flex">
        <div
          class="nft__link--perks__wrap"
          v-for="(perk, index) of perks"
          :key="index"
        >
          <Slots :perk="perk" :slots="perk.slots.count"></Slots>
        </div>
      </div>
    </div>
    <div class="nft__link__content">
      <h2 class="nft__link__content__title" v-if="title">{{ title }}</h2>
      <p class="nft__link__content__desc" v-if="desc">
        {{ desc }}
      </p>
      <p v-else-if="drop">
        {{
          localisingDesc(drop, "shortDescription").slice(
            0,
            countOfMaxWordDesc,
          ) + isMoreThanMaxWordDesc(drop.shortDescription)
        }}
      </p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.minted {
  position: absolute;
  width: 100%;
  left: 23px;
  top: 23px;
  @media screen and (max-width: 771px) {
    left: 12px;
    top: 12px;
  }
}
.nft__link {
  text-decoration: none;
  color: var(--color-white);
  background-color: #141414;
  height: 100%;
  border-radius: 45px 45px 42px 42px;
  @media screen and (max-width: 771px) {
    border-radius: 24px;
  }
  &--wrap {
    position: relative;
  }
  &--perks {
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 10px;
    @media screen and (max-width: 771px) {
      height: 30px;
    }
    &__wrap {
      position: absolute;
      height: 55px;
      width: 55px;
      @media screen and (max-width: 771px) {
        width: 30px;
        height: 30px;
      }
      &:nth-child(1) {
        left: 20px;
        @media screen and (max-width: 771px) {
          left: 12px;
        }
      }
      &:nth-child(2) {
        left: 63px;
        @media screen and (max-width: 771px) {
          left: 35px;
        }
      }
      &:nth-child(3) {
        left: 106px;
        @media screen and (max-width: 771px) {
          left: 58px;
        }
      }
      &:nth-child(4) {
        left: 149px;
        @media screen and (max-width: 771px) {
          left: 81px;
        }
      }
      &:nth-child(5) {
        left: 192px;
        @media screen and (max-width: 771px) {
          left: 104px;
        }
      }
    }
    ::v-deep(.slots) {
      svg {
        width: 55px;
        height: 55px;
        @media screen and (max-width: 771px) {
          width: 30px;
          height: 30px;
        }
      }
      img {
        width: 25px;
        max-height: 25px;
        @media screen and (max-width: 771px) {
          max-height: 15px;
          max-width: 15px;
        }
      }
    }
  }
  &--text {
    padding-left: 14px;
    font-size: 18px;
    line-height: 18px;
    @media screen and (max-width: 771px) {
      font-size: 12px;
      line-height: 12px;
      padding-left: 6px;
    }
  }
  &--minted {
    pointer-events: none;
    width: 54px;
    height: 54px;
    background-image: url("~@/assets/images/nftCount.png");
    background-size: cover;
    z-index: 1;
    color: var(--color-black);
    padding-top: 5px;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    @media screen and (max-width: 771px) {
      width: 29px;
      height: 29px;
      font-size: 16px;
      left: 12px;
      bottom: -21px;
    }
  }
  &__img {
    width: 322px;
    height: 322px;
    border-radius: 42px;
    z-index: 1;
    opacity: 0.8;
    @media screen and (max-width: 771px) {
      max-width: 160px;
      height: 156px;
      border-radius: 20px;
    }
  }
  &__content {
    position: relative;
    padding-top: 33px;
    padding-bottom: 35px;
    padding-left: 26px;
    z-index: 0;
    @media screen and (max-width: 771px) {
      padding-top: 12px;
      padding-bottom: 17px;
      padding-left: 12px;
    }

    &__title {
      padding-bottom: 13px;
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      @media screen and (max-width: 771px) {
        font-weight: 800;
        font-size: 24px;
        line-height: 110%;
      }
    }
    &__desc {
      font-size: 20px;
      line-height: 110%;
      @media screen and (max-width: 771px) {
        font-size: 12px;
        line-height: 110%;
      }
    }
  }
}
</style>
