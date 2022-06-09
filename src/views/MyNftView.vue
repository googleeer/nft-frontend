<script lang="ts">
import { defineComponent } from "vue";
import NftVisualInfo from "@/components/cta/NftVisualInfo.vue";
import data from "../../test-data.json";

export default defineComponent({
  name: "MyNftView",
  components: { NftVisualInfo },
  setup() {
    const count = 5;
    const datas = data;
    console.log(datas);
    return { count };
  },
});
</script>

<template>
  <div class="wrapper">
    <h1 class="page__title">Mt NFTs</h1>
    <p class="page__desc">{{ count }} NFT in your collection</p>
    <NftVisualInfo></NftVisualInfo>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding-left: 59px;
  padding-top: 105px;
}
.page {
  &__title {
    font-weight: 600;
    font-size: 48px;
    line-height: 130%;
  }
}
</style>
