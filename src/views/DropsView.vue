<script lang="ts">
import { defineComponent, ref } from "vue";
import NftVisualInfo from "@/components/cta/NftVisualInfo.vue";
import { useI18n } from "vue-i18n";
import { getDrops } from "@/service/drop/drop.service";
import { Drop } from "@/service/drop/drop.type";
import router from "@/router";
import { ROUTES } from "@/constants/routes.constants";
import { useAppStateStore } from "@/store/appState.store";

export default defineComponent({
  name: "DropsView",
  components: { NftVisualInfo },
  setup() {
    const { t } = useI18n();
    const count = 5;
    const drops = ref<Drop[]>([]);
    const appState = useAppStateStore();
    appState.setPreloaderValue(true);
    getDrops()
      .then((data) => {
        drops.value = data;
      })
      .catch(() => {
        router.push({ name: ROUTES.COLLECTIONS.name });
      })
      .finally(() => appState.setPreloaderValue(false));

    return { count, drops, t, ROUTES };
  },
});
</script>

<template>
  <div class="wrapper">
    <h1 class="page__title">{{ t("drop.drops") }}</h1>
    <div class="nfts">
      <div class="nft" v-for="drop of drops" :key="drop.id">
        <NftVisualInfo
          :title="drop.name"
          :desc="drop.collection.name"
          :to="{
            name: ROUTES.DROP.name,
            params: { id: drop.id, collectionId: drop.collection.id },
          }"
        ></NftVisualInfo>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nft {
  width: 100%;
  max-width: 322px;
  margin: 0 17px;
  padding-bottom: 56px;
  @media screen and (max-width: 771px) {
    max-width: 160px;
    margin: 0 7.5px;
    padding-bottom: 29px;
  }
}
.wrapper {
  width: 100%;
  padding-left: 43px;
  padding-top: 105px;
  @media screen and (max-width: 771px) {
    padding-top: 93px;
    padding-left: 15.5px;
  }
}
.page {
  &__title {
    font-weight: 600;
    font-size: 48px;
    line-height: 130%;
    padding-left: 17px;
    @media screen and (max-width: 771px) {
      font-size: 32px;
      padding-left: 7.5px;
    }
    @media screen and (max-width: 372px) {
      text-align: center;
    }
  }
  &__desc {
    font-size: 20px;
    line-height: 150%;
    padding-left: 17px;
    padding-top: 15px;
    @media screen and (max-width: 771px) {
      padding-left: 7.5px;
      padding-top: 14px;
    }
    @media screen and (max-width: 372px) {
      text-align: center;
    }
  }
}
.nfts {
  width: 100%;
  max-width: 1426px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;

  @media screen and (max-width: 372px) {
    justify-content: center;
  }
}
</style>
