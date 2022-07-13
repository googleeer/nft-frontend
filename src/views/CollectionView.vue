<script lang="ts">
import { computed, defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { getCollections } from "@/service/collections/collection.service";
import { useCollectionsStore } from "@/store/collections.store";
import { storeToRefs } from "pinia";
import SceneView from "@/components/scene/SceneView.vue";
import { getLocalisingByKey, LocalisingKey } from "@/utils/localise";
import { Collection } from "@/service/collections/collections.type";
import { formatImages } from "@/components/scene/sceneComponent.service";
import SceneTextContent from "@/components/scene/SceneTextContent.vue";
export default defineComponent({
  name: "CollectionView",
  components: { SceneTextContent, SceneView, BackFixed },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentCollectionId = +route.params.id;
    const { t, locale } = useI18n();
    const localisingDesc =
      getLocalisingByKey<Pick<Collection, LocalisingKey>>(locale);

    const collectionStore = useCollectionsStore();
    const { collectionsButtons, collections } = storeToRefs(collectionStore);
    if (!collections.value.length) {
      getCollections().catch(() => {
        router.push(ROUTES.COLLECTIONS);
      });
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
    return {
      currentCollectionId,
      ROUTES,
      t,
      collectionsButtons,
      collection,
      localisingDesc,
      formatImages,
      toActive,
    };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1" v-if="collection">
    <BackFixed
      :to="{
        name: ROUTES.COLLECTIONS.name,
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
    ></BackFixed>
    <SceneView
      :images="formatImages(collection)"
      :buttons="collectionsButtons"
      :activeId="currentCollectionId"
      @toActive="toActive"
      :blur="collection.isComingSoon"
    >
      <SceneTextContent
        button-text="collection.open"
        :route="{
          name: ROUTES.COLLECTION.name,
          params: { id: collection.id },
        }"
        :is-coming-soon="collection.isComingSoon"
        :name="collection.name"
        :short-description="localisingDesc(collection, 'shortDescription')"
      />
    </SceneView>
  </div>
</template>

<style lang="scss" scoped>
.drops {
  display: flex;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  .pagination__wrapper {
    width: 100%;
    max-width: 13px;
    position: absolute;
    z-index: 2;
    bottom: 25px;
    right: 50%;
    transform: translateX(-50%);
    //right: 53px;
    //top: 50%;
    //transform: translateY(-50%);
    button {
      outline: none;
      border: none;
      margin: 10px;
      padding: 4.5px;
    }
    .active {
      padding: 6.5px;
    }
    &__btn {
      background: white;
      border-radius: 100%;
    }
  }
  //&::-webkit-scrollbar {
  //  height: 12px;
  //}
  //
  //&::-webkit-scrollbar-track {
  //  background: #f1f1f1;
  //  border-radius: 10px;
  //}
  //
  //&::-webkit-scrollbar-thumb {
  //  background: #444444;
  //  border-radius: 10px;
  //}
  .drop {
    width: 100%;
    min-width: 100%;
  }
}

.collection {
  position: relative;
  @media screen and (max-width: 768px) {
    max-width: none;
    max-height: none;
    .back {
      top: 93px;
      position: absolute;
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
