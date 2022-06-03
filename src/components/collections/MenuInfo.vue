<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import BaseButton from "@/components/form/BaseButton.vue";
import CollectionProperties from "@/components/collections/Properties.vue";

import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MenuInfo",
  props: { properties: Object, drops: Object, collection: Object },
  components: { BaseButton, CollectionProperties },
  setup() {
    const { t } = useI18n();
    return { ROUTES, t };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1">
    <div class="collection__menu flex direction-column">
      <div class="collection__menu__collection flex align-center">
        <div class="collection__menu__collection__mob--ico">
          <img src="../../assets/images/junkYard-mini.svg" />
        </div>
        <div class="collection__menu__collection__content">
          <h1 class="collection__menu__collection__content__name">
            {{ collection.name }}
          </h1>
          <p class="collection__menu__collection__content__desc--short">
            {{ collection.shortDescription }}
          </p>
        </div>
      </div>
      <div class="collection__menu__author">
        <span class="collection__menu__author--bg"></span>
        <p class="collection__menu__author--desc">
          {{ collection.description }}
        </p>
        <div class="flex justify-center">
          <CollectionProperties
            v-for="(brand, title) of properties"
            :key="title"
            :title="title"
            :value="brand"
          >
          </CollectionProperties>
        </div>
      </div>
      <div class="collection__menu__drop flex direction-column align-center">
        <span class="collection__menu__drop--bg"></span>
        <p class="collection__menu__drop--title">{{ t("drop.drop") }}</p>
        <slot></slot>
        <BaseButton
          :button-text="'Open Collection'"
          class="collection__menu__drop--btn"
          :to="{
            name: ROUTES.COLLECTION.name,
            params: { id: 0 },
          }"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  &__menu {
    width: 100%;
    max-width: 523px;
    min-width: 523px;
    padding-top: 147px;
    background-color: var(--color-black);
    @media screen and (max-width: 523px) {
      min-width: 100%;
    }
    &__collection__mob--ico {
      img {
        max-width: 93px;
        border-radius: 40%;
      }
    }
    &__drop {
      position: relative;
      padding-left: 49px;
      flex-grow: 1;
      padding-top: 26px;
      z-index: 0;
      @media screen and (max-width: 523px) {
        padding-left: 20px;
        padding-right: 20px;
      }

      &--bg {
        position: absolute;
        inset: 0;
        border-top-left-radius: 34px;
        border-top-right-radius: 34px;
        z-index: -1;
        background: radial-gradient(
          113.12% 113.12% at 50.52% 50.52%,
          #292929 0%,
          #000000 100%
        );
        background-repeat: no-repeat;
        background-size: cover;
      }

      &--title {
        font-size: 18px;
        align-self: flex-start;
      }

      &--btn {
        position: absolute;
        top: 200px;
        @media screen and (max-width: 350px) {
          min-width: 310px;
          max-width: 310px;
          ::v-deep(.button__background) {
            background-size: 100% 100%;
          }
        }
      }
    }
    &__collection {
      background-image: url("~@/assets/images/drop-collection-bg.svg");
      background-repeat: no-repeat;
      padding: 41px 15px 69px 48px;
      border-radius: 34px;
      @media screen and (max-width: 523px) {
        padding: 20px 20px 53px;
      }

      &__content {
        padding-left: 20px;
        &__name {
          font-weight: 700;
          font-size: 32px;
          line-height: 38px;
          color: var(--color-black);
          padding-bottom: 9px;
          font-family: "Work Sans";
          @media screen and (max-width: 523px) {
            font-size: 24px;
          }
        }

        &__desc--short {
          font-size: 20px;
          line-height: 110%;
          color: var(--color-black);
          @media screen and (max-width: 523px) {
            font-size: 16px;
          }
        }
      }
    }
    &__author {
      position: relative;
      z-index: 0;
      padding: 33px 50px 36px 43px;
      @media screen and (max-width: 523px) {
        padding: 18px 20px 27px 20px;
      }
      &--bg {
        position: absolute;
        inset: 0;
        top: -33px;
        border-radius: 34px;
        z-index: -1;
        background-color: var(--color-black);
        background-repeat: no-repeat;
        background-size: cover;
      }
      &--desc {
        line-height: 22px;
        color: var(--color-white);
        padding-bottom: 36px;
      }
    }
  }
}
</style>
