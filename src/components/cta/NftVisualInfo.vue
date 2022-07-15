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
    drop: Object,
    to: Object,
    preview: String,
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
    <img
      class="nft__link__img"
      :src="preview || require('@/assets/images/mynft/1.png')"
    />
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
.nft__link {
  text-decoration: none;
  color: var(--color-white);
  background-color: #141414;
  height: 100%;
  border-radius: 45px 45px 42px 42px;

  &__img {
    width: 322px;
    height: 322px;
    border-radius: 42px;
    z-index: 1;
    @media screen and (max-width: 771px) {
      max-width: 160px;
      height: 156px;
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
