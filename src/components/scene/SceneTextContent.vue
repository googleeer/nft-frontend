<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/form/BaseButton.vue";

export default defineComponent({
  name: "SceneTextContent",
  components: { BaseButton },
  props: {
    name: String,
    shortDescription: String,
    isComingSoon: {
      type: Boolean,
      required: false,
    },
    route: Object as PropType<{
      name: string;
      params: { id: number; collectionId?: number };
    }>,
    buttonText: String,
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<template>
  <div class="nftContent flex direction-column">
    <h1 class="nftContent-name">{{ name }}</h1>
    <p class="nftContent-desc">
      {{ shortDescription }}
    </p>
    <BaseButton
      :button-text="t(buttonText)"
      class="nftContent-btn"
      v-if="!isComingSoon"
      :to="route"
    ></BaseButton>
    <div v-if="isComingSoon" class="nftContent-soon flex align-center">
      <img src="../../assets/images/time.svg" class="nftContent-soon--img" />
      <h2 class="nftContent-soon--text">
        {{ t("collection.soon") }}
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nftContent {
  width: 100%;
  padding-left: 59px;
  padding-bottom: 62px;
  z-index: 2;
  position: relative;
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
</style>
