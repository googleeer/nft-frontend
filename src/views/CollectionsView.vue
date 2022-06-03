<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/form/BaseButton.vue";
import { ROUTES } from "@/constants/routes.constants";
import data from "../../test-data.json";
export default defineComponent({
  name: "CollectionsView",
  components: { BaseButton },
  setup() {
    const { t } = useI18n();
    const collections = data[0].collections;
    const currentCollectionId = ref(0);
    return { t, ROUTES, collections, currentCollectionId };
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
        <img :src="require(`@/assets/images/${item.gif}`)" class="bg" />
        <div class="collection-content flex direction-column">
          <img
            class="collection-content-img"
            :src="require(`@/assets/images/${item.logo}`)"
          />
          <h1 class="collection-content-name">{{ item.name }}</h1>
          <p class="collection-content-desc">{{ item.shortDescription }}</p>
          <BaseButton
            :button-text="'Open Collection'"
            class="collection-content-btn"
            :to="{
              name: ROUTES.COLLECTION.name,
              params: { id: currentCollectionId },
            }"
          ></BaseButton>
        </div>
        <div class="pagination__wrapper flex direction-column align-center">
          <button
            class="pagination__wrapper__prev"
            :class="{ active: currentCollectionId === 0 }"
            @click="currentCollectionId = 0"
          ></button>
          <button
            class="pagination__wrapper__next"
            :class="{ active: currentCollectionId === 1 }"
            @click="currentCollectionId = 1"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination__wrapper {
  width: 100%;
  max-width: 13px;
  position: absolute;
  z-index: var(--z-index-collections);
  right: 53px;
  top: 50%;
  button {
    outline: none;
    border: none;
    margin: 10px;
    padding: 4.5px;
  }
  .active {
    padding: 6.5px;
  }
  &__prev {
    background: white;
    border-radius: 100%;
  }
  &__next {
    border-radius: 100%;
    background: white;
  }
}
.wrapper {
  position: relative;

  .content {
    flex-grow: 1;
    position: relative;
    &::after {
      position: absolute;
      content: "Swip to next collection";
      left: 50%;
      margin-left: -85px;
      bottom: 60px;
      @media screen and (max-width: 1000px) {
        content: none;
      }
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
    }
  }
}
</style>
