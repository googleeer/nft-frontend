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
    title: String,
    desc: String,
    shortDescItem: Object,
    to: Object,
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
    <img class="nft__link__img" src="@/assets/images/mynft/1.png" />
    <div class="nft__link__content">
      <h2 class="nft__link__content__title" v-if="title">{{ title }}</h2>
      <p class="nft__link__content__desc" v-if="desc">
        {{ desc }}
      </p>
      <p v-else-if="shortDescItem">
        {{
          localisingDesc(shortDescItem, "shortDescription").value.slice(
            0,
            countOfMaxWordDesc,
          ) + isMoreThanMaxWordDesc(shortDescItem.shortDescription)
        }}
      </p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
//.nft {
//  width: 100%;
//  max-width: 322px;
//  margin: 0 17px;
//  padding-bottom: 56px;
//  @media screen and (max-width: 771px) {
//    max-width: 160px;
//    margin: 0 7.5px;
//    padding-bottom: 29px;
//  }
.nft__link {
  text-decoration: none;
  color: var(--color-white);

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
