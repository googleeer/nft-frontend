<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/form/BaseButton.vue";
import { ROUTES } from "@/constants/routes.constants";
import data from "../../test-data.json";
import DropPerks from "@/components/collections/Perks.vue";
import SucceedMint from "@/components/modal/SucceedMint.vue";
import { useRouter } from "vue-router";
import { useAppStateStore } from "@/store/appState.store";
import BackFixed from "@/components/collections/BackFixed.vue";
import { storeToRefs } from "pinia";
import { getMint, postMint } from "@/service/mint/mint.service";
import router from "@/router";
import { Mint } from "@/service/mint/mint.type";
export default defineComponent({
  name: "CollectionsView",
  components: { BackFixed, BaseButton, DropPerks, SucceedMint },
  setup() {
    const { t } = useI18n();
    const currentCollectionId =
      +useRouter().currentRoute.value.params.collectionId;
    const currentDropId = +useRouter().currentRoute.value.params.id;
    const appState = useAppStateStore();
    const mint = ref<Mint>();
    appState.setPreloaderValue(true);

    getMint(currentDropId)
      .then((data) => {
        mint.value = data;
      })
      .catch(() =>
        router.push({ name: ROUTES.DROP.name, params: { id: currentDropId } }),
      )
      .finally(() => {
        appState.setPreloaderValue(false);
      });

    const collections = data[0].collections;
    const currentCollection = collections?.[currentCollectionId];
    const currentDrop = currentCollection?.drops[0];

    const appStateStore = useAppStateStore();
    const changeModalState = (value: boolean) =>
      appStateStore.setIsShowModal(value);

    const handleModalClick = (type: string) => {
      if (type === "close") {
        changeModalState(false);
      }
    };
    const visibleBtn = ref(true);
    const loadedMint = ref(false);
    const { isMobile } = storeToRefs(appState);
    const activate = () => {
      loadedMint.value = true;
      postMint(currentDropId);
      appState.setIsShowModal(true);
      visibleBtn.value = false;
      loadedMint.value = false;
    };
    return {
      t,
      ROUTES,
      collections,
      currentCollectionId,
      currentDrop,
      handleModalClick,
      changeModalState,
      currentCollection,
      isMobile,
      mint,
      currentDropId,
      postMint,
      activate,
      visibleBtn,
      loadedMint,
    };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column flex-grow-1" v-if="mint">
    <BackFixed
      :to="{
        name: ROUTES.DROP.name,
        params: { collectionId: currentCollectionId, id: currentDropId },
      }"
      :text="{ desktop: `${t('desktopBack')}`, mob: `${t('mobileBack')}` }"
      :class="{ isMob: isMobile }"
    ></BackFixed>
    <div class="flex flex-grow-1">
      <div class="content flex align-end">
        <img :src="require(`@/assets/images/mint.png`)" class="bg" />
        <div class="collection-content flex direction-column">
          <h1 class="collection-content-name">{{ mint.drop.name }}</h1>
          <p class="collection-content&#45;&#45;perks">Perks</p>
          <DropPerks :perks="mint.userPerks"></DropPerks>
          <BaseButton
            v-if="mint.mintCount && visibleBtn"
            :disabled="loadedMint"
            :button-text="{
              key: 'drop.mint',
              params: { count: `${mint.mintCount}` },
            }"
            class="collection-content-btn"
            @click="activate()"
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
  .back:not(.isMob) {
    @media screen and (max-height: 800px) {
      left: auto;
      right: 95px;
      transform: none;
    }
  }

  .isMob {
    @media screen and (max-height: 600px) {
      left: auto;
      right: 5px;
      transform: none;
    }
  }

  .content {
    width: 100%;
    flex-grow: 1;
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
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }
    .collection-content {
      width: 100%;
      padding-left: 59px;
      padding-bottom: 62px;
      z-index: var(--z-index-collections);
      @media screen and (max-width: 768px) {
        padding: 0 0px 44px;
      }
      @media screen and (max-width: 370px) {
        padding: 0px 0px 20px;
      }
      ::v-deep(.perks) {
        overflow-x: auto;
        padding-left: 0;
        padding-bottom: 65px;
        @media screen and (max-width: 768px) {
          padding-bottom: 15px;
          margin-bottom: 18px;
          padding-left: 20px;
        }
      }
      &-name {
        font-weight: 800;
        font-size: 82px;
        line-height: 110%;
        max-width: 600px;
        @media screen and (max-width: 768px) {
          padding-top: 19px;
          font-size: 42px;
          max-width: 300px;
          padding-left: 20px;
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
        @media screen and (max-width: 768px) {
          margin-left: 20px;
        }
        @media screen and (max-width: 370px) {
          margin-left: 5px;
        }
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
        @media screen and (max-width: 768px) {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
