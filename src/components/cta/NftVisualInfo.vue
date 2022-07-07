<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { getLocalisingByKey } from "@/utils/localise";
import { Drop } from "@/service/drop/drop.type";
export default defineComponent({
  name: "NftVisualInfo",
  components: {},
  props: {
    nfts: Array,
  },
  setup() {
    const { t, locale } = useI18n();
    const countOfMaxWordDesc = 21;
    const isMoreThanMaxWordDesc = (desc: string) => {
      return desc.length > countOfMaxWordDesc ? "..." : "";
    };
    const someFun = getLocalisingByKey<Drop>(locale);

    return { ROUTES, t, isMoreThanMaxWordDesc, countOfMaxWordDesc, someFun };
  },
});
</script>

<template>
  <div class="nft" v-for="nft of nfts" :key="nft.id">
    <RouterLink
      class="nft__link flex direction-column"
      :to="{
        name: ROUTES.MY_NFT.name,
        params: { id: nft.drop.id },
      }"
    >
      <img class="nft__img" src="@/assets/images/mynft/1.png" />

      <div class="nft__content">
        <h2 class="nft__content__title">{{ nft.drop.name }}</h2>
        <p class="nft__content__desc">
          {{
            someFun(nft.drop, "shortDescription").value.slice(
              0,
              countOfMaxWordDesc,
            ) + isMoreThanMaxWordDesc(nft.drop.shortDescription)
          }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.nft {
  width: 100%;
  max-width: 322px;
  margin: 0 17px;
  padding-bottom: 56px;
  @media screen and (max-width: 771px) {
    max-width: 160px;
    margin: 0 7.5px;
    padding-bottom: 29px;
  }
  &__link {
    text-decoration: none;
    color: var(--color-white);
  }
  &__img {
    width: 322px;
    border-radius: 42px;
    z-index: 1;
    @media screen and (max-width: 771px) {
      max-width: 160px;
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
    &::before {
      content: "";
      width: 100%;
      position: absolute;
      background: #141414;
      inset: 0;
      z-index: -1;
      top: -70px;
      background-size: cover;
      border-radius: 34px;
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
