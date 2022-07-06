<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import DropPerks from "@/components/collections/Perks.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { useAppStateStore } from "@/store/appState.store";
import { Drop } from "@/service/drop/drop.type";
import { getDrop } from "@/service/drop/drop.service";
import { storeToRefs } from "pinia";
import router from "@/router";
export default defineComponent({
  name: "CollectionView",
  components: { MenuInfo, DropPerks, BackFixed },
  setup: function () {
    const currentCollectionId =
      +useRouter().currentRoute.value.params.collectionId;
    const appState = useAppStateStore();
    const currentDropId = +useRouter().currentRoute.value.params.id;
    const currentDrop = ref<object>();
    const { t } = useI18n();
    const { isMobile } = storeToRefs(appState);
    const drop = ref<Drop | null>(null);
    appState.setPreloaderValue(true);
    getDrop(currentDropId)
      .then((data) => {
        drop.value = data;
      })
      .catch(() => {
        router.push({
          name: ROUTES.COLLECTION.name,
          params: { id: currentCollectionId },
        });
      });
    const properties = computed(() =>
      (["brand", "artist"] as (keyof Drop)[]).map((key) => ({
        title: t(`collection.${key}`),
        value: drop.value?.[key],
      })),
    );
    return {
      ROUTES,
      t,
      currentDrop,
      currentCollectionId,
      isMobile,
      drop,
      properties,
    };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1" v-if="drop">
    <BackFixed
      :to="{
        name: ROUTES.COLLECTION.name,
        params: { id: currentCollectionId },
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
    ></BackFixed>
    <div class="collection__img--wrap">
      <img src="@/assets/images/big-drop.png" class="collection__img" />
    </div>
    <MenuInfo
      :properties="properties"
      :item="drop"
      :btn-text="'redeem'"
      :title-last-section="t('perk.perks')"
      :route="{
        name: ROUTES.MINT.name,
        params: { collectionId: currentCollectionId, id: drop.id },
      }"
    >
      <DropPerks :perks="drop.perks"></DropPerks>
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
