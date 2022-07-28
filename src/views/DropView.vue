<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import DropPerks from "@/components/collections/Perks.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import BackFixed from "@/components/collections/BackFixed.vue";
import { useAppStateStore } from "@/store/appState.store";
import { Drop } from "@/service/drop/drop.type";
import { getDropsByCollectionId } from "@/service/drop/drop.service";
import { storeToRefs } from "pinia";
import { getLocalisingByKey, LocalisingKey } from "@/utils/localise";
import { CollectionWithDrops } from "@/service/collections/collections.type";
import { useDropsStore } from "@/store/drop.store";
import SceneView from "@/components/scene/SceneView.vue";
import { formatImages } from "@/components/scene/sceneComponent.service";
import { SceneImages } from "@/service/commonTypes/commonTypes";
import SceneTextContent from "@/components/scene/SceneTextContent.vue";
export default defineComponent({
  name: "DropView",
  components: { SceneTextContent, SceneView, MenuInfo, DropPerks, BackFixed },
  emits: ["infoIsClose"],
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentDropId = computed(() => +route.params.id);
    const currentCollectionId = computed(() => +route.params.collectionId);
    const { t, locale } = useI18n();
    const localisingDesc =
      getLocalisingByKey<Pick<CollectionWithDrops, LocalisingKey>>(locale);
    const appState = useAppStateStore();
    const { isMobile } = storeToRefs(appState);

    const dropsStore = useDropsStore();
    const { drops, dropsButtons } = storeToRefs(dropsStore);
    if (!drops.value.length) {
      appState.setPreloaderValue(true);
      getDropsByCollectionId(currentCollectionId.value)
        .then(() => {
          !drop.value &&
            router.push({
              name: ROUTES.COLLECTION.name,
              params: { id: currentCollectionId.value },
            });
        })
        .catch(() =>
          router.push({
            name: ROUTES.COLLECTION.name,
            params: { id: currentCollectionId.value },
          }),
        )
        .finally(() => appState.setPreloaderValue(false));
    }

    onBeforeUnmount(() => dropsStore.setDrops([]));

    const drop = computed(() =>
      drops.value.find(({ id }) => id === currentDropId.value),
    );

    const properties = computed(() =>
      (["brand", "artist"] as (keyof Drop)[]).map((key) => ({
        title: t(`collection.${key}`),
        value: drop.value?.[key],
      })),
    );

    const infoIsOpen = ref(false);
    const showInfo = (isOpen: boolean) => {
      infoIsOpen.value = isOpen;
    };
    const closeInfo = () => {
      infoIsOpen.value = false;
    };

    const sceneImages = computed<SceneImages>(() => ({
      artistLogo: drop.value?.collection.artistLogo,
      brandLogo: drop.value?.collection.brandLogo,
      background: drop.value?.collection.background,
      cube: drops.value.length === 1 ? drop.value?.cube : undefined,
      canvas: drops.value.length === 1 ? drop.value?.canvas : undefined,
    }));

    const toActive = (id: number) => {
      router.push({
        name: ROUTES.DROP.name,
        params: {
          id,
          collectionId: currentCollectionId.value,
        },
      });
    };

    return {
      closeInfo,
      showInfo,
      infoIsOpen,
      ROUTES,
      t,
      currentCollectionId,
      currentDropId,
      isMobile,
      drop,
      drops,
      properties,
      dropsButtons,
      sceneImages,
      formatImages,
      toActive,
      localisingDesc,
    };
  },
});
</script>

<template>
  <div class="drop flex flex-grow-1" v-if="drop">
    <SceneView
      :images="formatImages(sceneImages)"
      :buttons="dropsButtons"
      :activeId="currentDropId"
      @toActive="toActive"
      sceneDirection="X"
      :allCanvas="
        drops.reduce(
          (acc, _drop) => ({
            ...acc,
            [_drop.id]: _drop.canvas?.url,
          }),
          {},
        )
      "
      :allCubes="
        drops.reduce(
          (acc, _drop) => ({
            ...acc,
            [_drop.id]: _drop.cube?.url,
          }),
          {},
        )
      "
    >
      <SceneTextContent
        button-text="drop.open"
        :route="{
          name: ROUTES.MINT.name,
          params: { id: drop.id, collectionId: currentCollectionId },
        }"
        :name="drop.name"
        :short-description="localisingDesc(drop, 'shortDescription')"
      />
      <BackFixed
        v-if="!infoIsOpen"
        :to="{
          name: ROUTES.COLLECTION.name,
          params: { id: currentCollectionId },
        }"
        :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
      ></BackFixed>
      <BackFixed
        :infoIsOpen="infoIsOpen"
        @showInfo="showInfo"
        :text="{ desktop: `${t('clickInfo')}`, mob: `${t('clickInfo')}` }"
        arrow="right"
      ></BackFixed>
    </SceneView>
    <transition name="fade" mode="in-out">
      <MenuInfo
        :infoIsOpen="infoIsOpen"
        @infoIsClose="infoIsOpen = false"
        v-click-outside:[300]="closeInfo"
        v-if="infoIsOpen"
        :properties="properties"
        :item="drop"
        :btn-text="'redeem'"
        :title-last-section="t('perk.perks')"
        :route="{
          name: ROUTES.COLLECTION.name,
          params: { id: currentCollectionId },
        }"
        :routeText="{
          desktop: `${t('desktopBack')}`,
          mob: `${t('mobileBack')}`,
        }"
      >
        <DropPerks :perks="drop.perks"></DropPerks>
      </MenuInfo>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.drop {
  max-height: 100vh;
  overflow: hidden;
}
</style>
