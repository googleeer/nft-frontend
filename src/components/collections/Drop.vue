<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { Drop } from "@/service/drop/drop.type";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CollectionDrop",
  props: {
    drop: Object as PropType<Drop>,
    collectionId: Number,
    minted: Object,
  },
  setup() {
    const { t } = useI18n();
    return {
      ROUTES,
      t,
    };
  },
});
</script>

<template>
  <router-link
    :to="{
      name: ROUTES.DROP.name,
      params: { id: drop.id, collectionId },
    }"
    class="drop flex direction-column"
  >
    <div v-if="minted.minted" class="minted flex align-center">
      <span class="nft__link--minted flex flexCenter">{{ minted.minted }}</span>
      <span class="nft__link--text">{{ minted.text }}</span>
    </div>
    <img
      class="drop__img"
      :src="drop.cube?.url || require('@/assets/images/drop.png')"
    />
    <p class="drop__content--name">{{ drop.name }}</p>
  </router-link>
</template>

<style lang="scss" scoped>
.minted {
  position: absolute;
  width: 100%;
  left: 12px;
  top: 12px;
}
.nft__link--minted {
  pointer-events: none;
  width: 29px;
  height: 29px;
  background-image: url("~@/assets/images/nftCount.png");
  background-size: cover;
  z-index: 1;
  color: var(--color-black);
  padding-top: 5px;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  @media screen and (max-width: 771px) {
    width: 29px;
    height: 29px;
    font-size: 16px;
    left: 12px;
    bottom: -21px;
  }
}
.nft__link--text {
  padding-left: 6px;
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  color: var(--color-white);
  z-index: 1;
  @media screen and (max-width: 768px) {
    max-width: 53px;
  }
}
.drop {
  position: relative;
  display: flex;
  align-self: flex-start;
  text-decoration: none;
  text-align: center;
  overflow: hidden;
  min-width: 148px;

  &:not(:last-child) {
    margin-right: 20px;
  }
  &__img {
    width: 148px;
    height: 148px;
    border-radius: 24px;
    opacity: 0.8;
    transform: scale(1.5) translateY(15px);
  }
  &__content {
    padding-left: 16px;

    &--name {
      color: var(--color-white);
      padding-top: 17px;
      max-width: 165px;
      font-weight: 500;
      font-size: 18px;
      line-height: 110%;
    }
  }
}
</style>
