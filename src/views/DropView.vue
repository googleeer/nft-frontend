<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import DropPerks from "@/components/collections/Perks.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import data from "../../test-data.json";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "CollectionView",
  components: { MenuInfo, DropPerks, BackFixed },
  setup() {
    const { t } = useI18n();
    const currentCollectionId =
      +useRouter().currentRoute.value.params.collectionId;
    const collections = data[0].collections;
    const currentCollection = collections?.[currentCollectionId];
    const currentDrop = currentCollection?.drops[0];
    const properties = {
      artist: currentCollection?.artist,
      brand: currentCollection?.brand,
    };
    const drops = currentCollection?.drops;
    const appStore = useAppStateStore();
    const { isMobile } = storeToRefs(appStore);
    return {
      ROUTES,
      currentCollection,
      properties,
      drops,
      t,
      currentDrop,
      currentCollectionId,
      isMobile,
    };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1">
    <BackFixed
      :to="{
        name: ROUTES.COLLECTION.name,
        params: { id: currentCollectionId },
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
    ></BackFixed>
    <div class="collection__img--wrap">
      <img
        :src="require(`@/assets/images/${currentDrop['big-image']}`)"
        class="collection__img"
      />
    </div>

    <MenuInfo
      :properties="properties"
      :drops="drops"
      :item="currentDrop"
      :btn-text="'redeem'"
      :title-last-section="t('perk.perks')"
      :route="{
        name: ROUTES.MINT.name,
        params: { collectionId: currentCollection.id, id: 0 },
      }"
    >
      <DropPerks :perks="currentDrop.perks"></DropPerks>
    </MenuInfo>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  max-height: 100vh;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    max-width: none;
    max-height: none;
    .back {
      top: 94px;
      position: absolute;
      @media screen and (max-width: 768px) {
        transform: translateX(-36%);
      }
    }
  }
  &__img--wrap {
    width: 100%;
    position: relative;
    @media screen and (max-width: 768px) {
      display: none;
    }
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
