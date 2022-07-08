<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/form/BaseButton.vue";
import { ROUTES } from "@/constants/routes.constants";
import { useAppStateStore } from "@/store/appState.store";
import { getCollections } from "@/service/collections/collection.service";
import { Collection } from "@/service/collections/collections.type";
import { getLocalisingByKey } from "@/utils/localise";
import SceneView from "@/components/scene/SceneView.vue";
import { formatImages } from "@/components/scene/sceneComponent.service";
export default defineComponent({
  name: "CollectionsView",
  components: { SceneView, BaseButton },
  setup() {
    const appState = useAppStateStore();
    appState.setPreloaderValue(true);
    const currentCollectionId = ref<number>(0);

    const collections = ref<Collection[]>([]);
    getCollections()
      .then((data) => {
        collections.value = data;
        currentCollectionId.value = data[0].id;
      })
      .finally(() => appState.setPreloaderValue(false));
    const { t, locale } = useI18n();
    const localisingDesc = getLocalisingByKey<Collection>(locale);
    const isComingSoon = computed(
      () =>
        collections.value.find((item) => item.id === currentCollectionId.value)
          ?.isComingSoon === "true",
    );

    return {
      t,
      ROUTES,
      collections,
      currentCollectionId,
      localisingDesc,
      isComingSoon,
      formatImages,
    };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column flex-grow-1">
    <div class="blur" v-if="isComingSoon"></div>
    <div
      v-for="item of collections"
      :key="item.id"
      class="flex"
      :class="{ 'flex-grow-1': currentCollectionId === item.id }"
    >
      <div
        class="content flex align-end"
        v-if="item.id === currentCollectionId"
        :data-content="t('collections.swipe')"
      >
        <SceneView
          :test="currentCollectionId === 11"
          :images="formatImages(item)"
        ></SceneView>
        <div class="collection-content flex direction-column">
          <h1 class="collection-content-name">{{ item.name }}</h1>
          <p class="collection-content-desc">
            {{ localisingDesc(item, "shortDescription").value }}
          </p>
          <BaseButton
            :button-text="t('collection.open')"
            class="collection-content-btn"
            v-if="!isComingSoon"
            :to="{
              name: ROUTES.COLLECTION.name,
              params: { id: currentCollectionId },
            }"
          ></BaseButton>
          <div
            v-if="isComingSoon"
            class="collection-content-soon flex align-center"
          >
            <img
              src="../assets/images/time.svg"
              class="collection-content-soon--img"
            />
            <h2 class="collection-content-soon--text">
              {{ t("collection.soon") }}
            </h2>
          </div>
        </div>
        <div class="pagination__wrapper flex direction-column align-center">
          <button
            v-for="btn of collections"
            :key="btn"
            class="pagination__wrapper__btn"
            :class="{ active: btn.id === currentCollectionId }"
            @click="currentCollectionId = btn.id"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blur {
  position: fixed;
  inset: 0;
  left: 0px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(27.1828px);
}
.pagination__wrapper {
  width: 100%;
  max-width: 13px;
  position: absolute;
  z-index: 2;
  right: 53px;
  top: 50%;
  transform: translateY(-50%);
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
.wrapper {
  position: relative;

  .content {
    flex-grow: 1;
    position: relative;
    &::after {
      position: absolute;
      //content: attr(data-content);
      left: 50%;
      margin-left: -85px;
      bottom: 60px;
      z-index: 1;
      @media screen and (max-width: 1000px) {
        content: none;
      }
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
    .collection-content {
      width: 100%;
      padding-left: 59px;
      padding-bottom: 62px;
      z-index: 2;
      user-select: none;
      @media screen and (max-width: 768px) {
        padding: 0 20px 44px;
      }
      @media screen and (max-width: 370px) {
        padding: 0px 5px 20px;
      }
      &-name {
        padding-top: 28px;
        padding-bottom: 9px;
        font-weight: 800;
        font-size: 82px;
        line-height: 110%;
        @media screen and (max-width: 768px) {
          padding-top: 19px;
          font-size: 42px;
        }
      }
      &-desc {
        padding-bottom: 46px;
        font-size: 22px;
        @media screen and (max-width: 768px) {
          font-size: 16px;
          padding-bottom: 36px;
        }
      }
      &-btn {
        max-width: 335px;
        @media screen and (max-width: 350px) {
          min-width: 310px;
          max-width: 310px;
          ::v-deep(.button__background) {
            background-size: 100% 100%;
          }
        }
      }
      &-img {
        max-width: 104px;
        height: 104px;
        @media screen and (max-width: 768px) {
          max-width: 92px;
          height: 92px;
        }
      }
      &-soon {
        &--img {
          width: 58px;
          margin-right: 27px;
          @media screen and (max-width: 768px) {
            width: 38px;
          }
        }
        &--text {
          font-size: 46px;
          line-height: 110%;
          font-weight: 300;
          @media screen and (max-width: 768px) {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
