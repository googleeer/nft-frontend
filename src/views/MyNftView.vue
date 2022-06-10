<script lang="ts">
import { defineComponent } from "vue";
import NftVisualInfo from "@/components/cta/NftVisualInfo.vue";
import data from "../../test-data.json";

export default defineComponent({
  name: "MyNftView",
  components: { NftVisualInfo },
  setup() {
    const count = 5;
    const nfts = data[1].mynft;
    return { count, nfts };
  },
});
</script>

<template>
  <div class="wrapper">
    <h1 class="page__title">Mt NFTs</h1>
    <p class="page__desc">{{ count }} NFT in your collection</p>
    <div class="nfts">
      <NftVisualInfo :nfts="nfts"></NftVisualInfo>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    @media screen and (max-width: 771px) {
      padding-left: 7.5px;
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
