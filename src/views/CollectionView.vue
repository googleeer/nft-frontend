<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import CollectionDrop from "@/components/collections/Drop.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { getCollections } from "@/service/collections/collection.service";
import { useCollectionsStore } from "@/store/collections.store";
import { storeToRefs } from "pinia";
import SceneView from "@/components/scene/SceneView.vue";
import { getLocalisingByKey, LocalisingKey } from "@/utils/localise";
import { CollectionWithDrops } from "@/service/collections/collections.type";
import { formatImages } from "@/components/scene/sceneComponent.service";
import SceneTextContent from "@/components/scene/SceneTextContent.vue";
import { useAppStateStore } from "@/store/appState.store";
export default defineComponent({
  name: "CollectionView",
  components: {
    SceneTextContent,
    SceneView,
    BackFixed,
    MenuInfo,
    CollectionDrop,
  },
  emits: ["showInfo"],
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentCollectionId = +route.params.id;
    const { t, locale } = useI18n();
    const localisingDesc =
      getLocalisingByKey<Pick<CollectionWithDrops, LocalisingKey>>(locale);
    const sceneIsLoaded = ref(false);

    const collectionStore = useCollectionsStore();
    const { collectionsButtons, collections } = storeToRefs(collectionStore);
    if (!collections.value.length) {
      const appState = useAppStateStore();
      appState.setPreloaderValue(true);
      getCollections()
        .catch(() => {
          router.push(ROUTES.COLLECTIONS);
        })
        .finally(() => appState.setPreloaderValue(false));
    }
    const collection = computed(() =>
      collections.value.find(({ id }) => id === currentCollectionId),
    );
    const toActive = (id: number) =>
      router.push({
        name: ROUTES.COLLECTION.name,
        params: {
          id,
        },
      });

    const infoIsOpen = ref(false);
    const showInfo = (isOpen: boolean) => {
      infoIsOpen.value = isOpen;
    };
    const closeInfo = () => {
      infoIsOpen.value = false;
    };
    const properties = computed(() =>
      (["brand", "artist"] as (keyof CollectionWithDrops)[]).map((key) => ({
        title: t(`collection.${key}`),
        value: collection.value?.[key],
      })),
    );
    return {
      currentCollectionId,
      ROUTES,
      t,
      collectionsButtons,
      collection,
      localisingDesc,
      formatImages,
      toActive,
      showInfo,
      infoIsOpen,
      closeInfo,
      properties,
      sceneIsLoaded,
    };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1" v-if="collection">
    <SceneView
      :images="formatImages(collection)"
      :buttons="collectionsButtons"
      :activeId="currentCollectionId"
      @toActive="toActive"
      :blur="collection.isComingSoon"
      sceneDirection="Y"
      @loaded="sceneIsLoaded = true"
    >
      <SceneTextContent
        button-text="collection.open"
        :route="{
          name: ROUTES.DROP.name,
          params: { collectionId: collection.id, id: collection.drops[0]?.id },
        }"
        :is-coming-soon="collection.isComingSoon"
        :name="collection.name"
        :short-description="localisingDesc(collection, 'shortDescription')"
      />
    </SceneView>
    <BackFixed
      v-show="sceneIsLoaded"
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
        :item="collection"
        :btn-text="'drop.open'"
        :title-last-section="t('drop.drop')"
      >
        <div class="drops">
          <template v-for="drop of collection.drops" :key="drop.id">
            <CollectionDrop
              :collectionId="collection.id"
              :drop="drop"
            ></CollectionDrop>
          </template>
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
  padding-top: 23px;
  padding-bottom: 46px;
  max-width: calc(100% - 72px);
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding-top: 11px;
    padding-bottom: 27px;
    max-width: calc(100% - 52px);
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
