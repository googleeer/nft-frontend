<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { useAppStateStore } from "@/store/appState.store";
import { Drop } from "@/service/drop/drop.type";
import { getDrop } from "@/service/drop/drop.service";
import { storeToRefs } from "pinia";
import router from "@/router";
import CollectionProperties from "@/components/collections/Properties.vue";
import { getLocalisingByKey } from "@/utils/localise";
export default defineComponent({
  name: "MyNftView",
  components: { CollectionProperties, BackFixed },
  setup() {
    const currentCollectionId =
      +useRouter().currentRoute.value.params.collectionId;
    const appState = useAppStateStore();
    const currentDropId = +useRouter().currentRoute.value.params.id;
    const currentDrop = ref<object>();
    const readMoreActive = ref(false);

    const { t, locale } = useI18n();
    const { isMobile } = storeToRefs(appState);
    const drop = ref<Drop | null>(null);

    appState.setPreloaderValue(true);
    getDrop(currentDropId)
      .then((data) => {
        drop.value = data;
        console.log(data);
      })
      .catch(() => {
        router.push({
          name: ROUTES.MY_NFTS.name,
        });
      })
      .finally(() => appState.setPreloaderValue(false));
    const properties = computed(() =>
      (["artist", "brand"] as (keyof Drop)[]).map((key) => ({
        title: t(`collection.${key}`),
        value: drop.value?.[key],
      })),
    );

    const someFun = getLocalisingByKey<object>(locale);

    return {
      ROUTES,
      t,
      currentDrop,
      currentCollectionId,
      isMobile,
      drop,
      properties,
      readMoreActive,
      someFun,
    };
  },
});
</script>

<template>
  <div class="nft flex flex-grow-1" v-if="drop">
    <BackFixed
      :to="{
        name: ROUTES.MY_NFTS.name,
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
    ></BackFixed>
    <div class="nft__img--wrap">
      <img src="@/assets/images/big-drop.png" class="nft__img" />
      <h1 v-if="isMobile" class="nft__name">{{ drop.name }}</h1>
    </div>
    <div class="nft__menu flex flex-grow-1 direction-column">
      <h1 v-if="!isMobile" class="nft__menu__name">{{ drop.name }}</h1>
      <div class="nft__menu__author--desc">
        <span class="nft__menu__author--desc__short" v-if="!readMoreActive">
          {{ someFun(drop, "description").value.slice(0, 162) }}
        </span>
        <span
          class="nft__menu__author--desc__all"
          :class="{ active: readMoreActive }"
          v-if="readMoreActive"
        >
          {{ someFun(drop, "description").value }}
        </span>
        <span
          class="nft__menu__author--desc__more"
          @click="readMoreActive = true"
          v-if="!readMoreActive"
        >
          Read More
        </span>
        <span
          class="nft__menu__author--desc__more"
          @click="readMoreActive = false"
          v-else
        >
          Collapse</span
        >
      </div>
      <div class="nft__menu__author__prop--block flex justify-center">
        <CollectionProperties
          v-for="(property, index) of properties"
          :key="index"
          :title="property.title"
          :value="property.value"
        >
        </CollectionProperties>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nft__menu {
  width: 100%;
  max-width: 523px;
  min-width: 523px;
  padding-top: 139px;
  padding-left: 53px;
  padding-right: 46px;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 523px) {
    min-width: auto;
  }
  &__name {
    font-weight: 800;
    font-size: 82px;
    line-height: 110%;
  }
  &__author--desc {
    font-size: 16px;
    line-height: 22px;
    padding: 50px 0 36px 0;
    font-family: "SFPro", sans-serif;

    @media screen and (max-width: 768px) {
      padding: 0px 0 36px 0;
    }
  }
}
.nft {
  max-height: 100vh;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-width: none;
    max-height: none;
    padding-top: 136px;
    align-items: center;

    .back {
      top: 94px;
      position: absolute;
      @media screen and (max-width: 768px) {
        transform: translateX(-36%);
      }
    }
  }
  @media screen and (max-width: 523px) {
    min-width: auto;
  }
  &__name {
    width: 100%;
    max-width: 180px;
    font-weight: 800;
    font-size: 42px;
    line-height: 110%;
    position: absolute;
    bottom: 28px;
    left: 20px;
    z-index: 1;
  }
  &__img--wrap {
    width: 100%;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.51) 100%
      );
      opacity: 0.55;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    object-fit: cover;
  }
}
</style>
