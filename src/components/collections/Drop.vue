<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { Drop } from "@/service/drop/drop.type";

export default defineComponent({
  name: "CollectionDrop",
  props: { drop: Object as PropType<Drop>, collectionId: Number },
  setup() {
    return {
      ROUTES,
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
    <img
      class="drop__img"
      :src="drop.dropPreview?.url || require('@/assets/images/drop.png')"
    />
    <p class="drop__content--name">{{ drop.name }}</p>
  </router-link>
</template>

<style lang="scss" scoped>
.drop {
  display: flex;
  align-self: flex-start;
  text-decoration: none;
  &:not(:last-child) {
    margin-right: 20px;
  }
  &__img {
    width: 148px;
    height: 148px;
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
