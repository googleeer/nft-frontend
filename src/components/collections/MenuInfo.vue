<script lang="ts">
import { defineComponent, ref } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import BaseButton from "@/components/form/BaseButton.vue";
import CollectionProperties from "@/components/collections/Properties.vue";

import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "@/store/appState.store";

export default defineComponent({
  name: "MenuInfo",
  props: {
    properties: Object,
    drops: Object,
    collection: Object,
    btnText: String,
  },
  components: { BaseButton, CollectionProperties },
  setup() {
    const { t } = useI18n();
    const appState = useAppStateStore();
    const { isMobile } = storeToRefs(appState);
    const readMoreActive = ref(false);
    return { ROUTES, t, isMobile, readMoreActive };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1 direction-column">
    <div class="collection__info flex align-center">
      <div class="collection__info--img" v-if="isMobile">
        <img src="../../assets/images/junkYard-mini.svg" />
      </div>
      <div>
        <div class="collection__info__content">
          <h1 class="collection__info__content__name">
            {{ collection.name }}
          </h1>
          <p class="collection__info__content__desc--short">
            {{ collection.shortDescription }}
          </p>
        </div>
      </div>
    </div>
    <div class="collection__author flex direction-column align-center">
      <div class="collection__author--desc">
        <span class="collection__author--desc__short" v-if="!readMoreActive"
          >{{ collection.description.slice(0, 162) }}
        </span>
        <span
          class="collection__author--desc__all"
          :class="{ active: readMoreActive }"
          v-if="readMoreActive"
        >
          {{ collection.description }}
        </span>
        <a
          class="collection__author--desc__link"
          @click="readMoreActive = true"
          v-if="!readMoreActive"
        >
          Read More
        </a>
        <a
          class="collection__author--desc__link"
          @click="readMoreActive = false"
          v-else
        >
          Collapse</a
        >
      </div>
      <div class="collection__author__prop--block flex justify-center">
        <CollectionProperties
          v-for="(brand, title) of properties"
          :key="title"
          :title="title"
          :value="brand"
        >
        </CollectionProperties>
      </div>
    </div>
    <div class="collection__drop flex direction-column flex-grow-1">
      <div class="collection__drop__content">
        <p class="collection__drop__content--title">{{ t("drop.drop") }}</p>
        <slot></slot>
      </div>
      <BaseButton
        :button-text="t(btnText)"
        class="collection__drop--btn"
        :to="{
          name: ROUTES.COLLECTION.name,
          params: { id: 0 },
        }"
      ></BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 100%;
  max-width: 523px;
  min-width: 523px;
  padding-top: 147px;
  @media screen and (max-width: 523px) {
    min-width: auto;
  }
  &__info {
    position: relative;
    z-index: 0;
    padding: 41px 0 37px 48px;
    @media screen and (max-width: 768px) {
      padding: 20px 20px;
    }
    &--img {
      padding-right: 16px;
      img {
        width: 92px;
        border-radius: 34px;
        height: 92px;
      }
    }
    &__content {
      color: var(--color-black);
      &__name {
        font-family: "WorkSans", sans-serif;
        font-weight: 700;
        font-size: 32px;
        padding-bottom: 9px;
        line-height: 38px;
        @media screen and (max-width: 768px) {
          font-weight: 800;
          font-size: 24px;
          line-height: 110%;
        }
      }
      &__desc--short {
        font-size: 20px;
        line-height: 110%;
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      background-image: url("~@/assets/images/drop-collection-bg.svg");
      inset: 0;
      z-index: -1;
      bottom: -50px;
      background-size: cover;
      border-radius: 34px;
    }
  }
  &__author {
    position: relative;
    background-color: var(--color-black);
    border-top-right-radius: 34px;
    border-top-left-radius: 34px;
    width: 100%;
    @media screen and (max-width: 768px) {
      padding: 0px 20px;
    }
    &--desc {
      margin: 33px 50px 36px 49px;
      font-family: "SFPro", sans-serif;
      max-width: 424px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      @media screen and (max-width: 768px) {
        margin: 18px 0;
      }
      &__short {
      }
      &__link {
        text-decoration: none;
        color: var(--color-white);
        font-weight: bold;
        font-size: 18px;
        padding-left: 5px;
        cursor: pointer;
        &:hover {
          color: #824708;
        }
      }
    }
    &__prop--block {
      width: 100%;
    }
  }
  &__drop {
    position: relative;
    padding-top: 26px;
    z-index: 0;
    margin-top: 36px;
    @media screen and (max-width: 768px) {
      margin-top: 27px;
    }
    &::after {
      content: "";
      position: absolute;
      background: radial-gradient(
        113.12% 113.12% at 50.52% 50.52%,
        #292929 0%,
        #000000 100%
      );
      inset: 0;
      z-index: -1;
      background-size: cover;
      border-top-right-radius: 34px;
      border-top-left-radius: 34px;
      flex-grow: 1;
    }
    &--btn {
      align-self: center;
      @media screen and (max-width: 336px) {
        min-width: 315px;
        ::v-deep(.button__background) {
          background-size: contain;
        }
      }
    }
    &--title {
      font-size: 18px;
    }
    &__content {
      padding-left: 36px;
      @media screen and (max-width: 768px) {
        padding-left: 26px;
      }

      &--title {
        font-size: 18px;
      }
    }
  }
}
</style>
