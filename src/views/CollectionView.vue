<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import CollectionDrop from "@/components/collections/Drop.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import data from "../../test-data.json";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { useAppStateStore } from "@/store/appState.store";
import { CollectionWithDrops } from "@/service/collections/collections.type";
import { getCollection } from "@/service/collections/collection.service";
import router from "@/router";

export default defineComponent({
  name: "CollectionView",
  components: { MenuInfo, CollectionDrop, BackFixed },
  emits: ["showInfo"],
  setup() {
    const currentCollectionId = +useRouter().currentRoute.value.params.id;
    const appState = useAppStateStore();
    const collection = ref<CollectionWithDrops | null>(null);
    const currentDropId = ref(0);
    appState.setPreloaderValue(true);
    getCollection(currentCollectionId)
      .then((data) => {
        collection.value = data;
        currentDropId.value = data.drops[0].id;
      })
      .catch(() => {
        router.push(ROUTES.COLLECTIONS);
      })
      .finally(() => appState.setPreloaderValue(false));
    const { t } = useI18n();
    const collections = data[0].collections;
    const currentCollection = collections?.[currentCollectionId];
    const properties = computed(() =>
      (["brand", "artist"] as (keyof CollectionWithDrops)[]).map((key) => ({
        title: t(`collection.${key}`),
        value: collection.value?.[key],
      })),
    );
    const drops = currentCollection?.drops;
    const infoIsOpen = ref(false);
    const showInfo = (isOpen: boolean) => {
      infoIsOpen.value = isOpen;
    };
    const closeInfo = () => {
      infoIsOpen.value = false;
    };
    return {
      ROUTES,
      properties,
      drops,
      t,
      collection,
      currentDropId,
      showInfo,
      infoIsOpen,
      closeInfo,
    };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1">
    <BackFixed
      :to="{
        name: ROUTES.COLLECTIONS.name,
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
    ></BackFixed>
    <div class="collection__img--wrap">
      <img src="@/assets/images/big-drop.png" class="collection__img" />
    </div>
    <BackFixed
      :infoIsOpen="infoIsOpen"
      @showInfo="showInfo"
      :text="{ desktop: `${t('clickInfo')}`, mob: `${t('clickInfo')}` }"
      arrow="right"
    ></BackFixed>
    <transition name="fade" mode="in-out">
      <MenuInfo
        v-click-outside:[300]="closeInfo"
        v-if="infoIsOpen"
        :properties="properties"
        :drops="drops"
        :item="collection"
        :btn-text="'drop.open'"
        :title-last-section="t('drop.drop')"
        :route="{
          name: ROUTES.DROP.name,
          params: { collectionId: collection.id, id: currentDropId },
        }"
      >
        <div class="drops">
          <div v-for="drop of collection.drops" :key="drop.id">
            <CollectionDrop :drop="drop"></CollectionDrop>
          </div>
        </div>
      </MenuInfo>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.drops {
  display: flex;
  width: 100%;
  position: relative;
  overflow-x: auto;
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
  .drop {
    width: 100%;
    min-width: 100%;
  }
  .drop {
    width: 100%;
    min-width: 100%;
  }
}

.collection {
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
  //@media screen and (max-width: 768px) {
  //  max-width: none;
  //  max-height: none;
  //  .back {
  //    top: 93px;
  //    position: absolute;
  //  }
  //}
  &__img--wrap {
    width: 100%;
    position: relative;
    //@media screen and (max-width: 768px) {
    //  display: none;
    //}
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
