<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/form/BaseButton.vue";
import { ROUTES } from "@/constants/routes.constants";
import data from "../../test-data.json";
import DropPerks from "@/components/collections/Perks.vue";
import SucceedMint from "@/components/modal/SucceedMint.vue";
import { useRouter } from "vue-router";
import { useAppStateStore } from "@/store/appState.store";
export default defineComponent({
  name: "CollectionsView",
  components: { BaseButton, DropPerks, SucceedMint },
  setup() {
    const { t } = useI18n();
    const currentCollectionId = +useRouter().currentRoute.value.params.id;
    const collections = data[0].collections;
    const currentCollection = collections[currentCollectionId];
    const currentDrop = currentCollection.drops[0];

    const appStateStore = useAppStateStore();
    const changeModalState = (value: boolean) =>
      appStateStore.setIsShowModal(value);

    const handleModalClick = (type: string) => {
      if (type === "close") {
        changeModalState(false);
      }
    };
    return {
      t,
      ROUTES,
      collections,
      currentCollectionId,
      currentDrop,
      handleModalClick,
      changeModalState,
    };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column flex-grow-1">
    <div
      v-for="item of collections"
      :key="item.id"
      class="flex"
      :class="{ 'flex-grow-1': currentCollectionId === item.id }"
    >
      <div
        class="content flex align-end"
        v-if="currentCollectionId === item.id"
      >
        <img :src="require(`@/assets/images/mint.png`)" class="bg" />
        <div class="collection-content flex direction-column">
          <h1 class="collection-content-name">{{ t("drop.shipping") }}</h1>
          <p class="collection-content--perks">Perks</p>
          <DropPerks :perks="currentDrop.perks"></DropPerks>

          <BaseButton
            :button-text="t('drop.mint')"
            class="collection-content-btn"
            @click="changeModalState(true)"
          ></BaseButton>
          <SucceedMint @btnClick="handleModalClick"></SucceedMint>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .content {
    width: 100%;
    flex-grow: 1;
    position: relative;

    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
      opacity: 0.8;
    }
    .collection-content {
      width: 100%;
      padding-left: 59px;
      padding-bottom: 62px;
      z-index: var(--z-index-collections);
      @media screen and (max-width: 768px) {
        padding: 0 20px 44px;
      }
      @media screen and (max-width: 370px) {
        padding: 0px 5px 20px;
      }
      ::v-deep(.perks) {
        overflow-x: auto;
        padding-left: 0;
        padding-bottom: 65px;
        @media screen and (max-width: 768px) {
          padding-bottom: 15px;
          margin-bottom: 18px;
          //max-width: 240px;
        }
      }
      &-name {
        font-weight: 800;
        font-size: 82px;
        line-height: 110%;
        max-width: 350px;
        @media screen and (max-width: 768px) {
          padding-top: 19px;
          font-size: 42px;
          max-width: 180px;
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
        font-weight: 600;
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
      &--perks {
        padding-top: 27px;
        font-size: 18px;
        line-height: 130%;
      }
    }
  }
}
</style>
