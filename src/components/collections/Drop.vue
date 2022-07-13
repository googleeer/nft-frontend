<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollectionDrop",
  props: { drop: Object },
});
</script>

<template>
  <div class="drop flex direction-column">
    <img class="drop__img" src="@/assets/images/drop.png" />
    <p class="drop__content--name">{{ drop.name }}</p>
    <p class="drop__content--desc">{{ drop.shortDescription }}</p>
  </div>
</template>

<style lang="scss" scoped>
.drop {
  display: flex;
  padding-top: 23px;
  padding-bottom: 61px;
  align-self: flex-start;
  padding-left: 36px;
  @media screen and (max-width: 768px) {
    padding-top: 11px;
    padding-bottom: 27px;
    padding-left: 26px;
  }
  &__img {
    width: 148px;
    height: 148px;
  }
  &__content {
    padding-left: 16px;

    &--name {
      padding-top: 17px;
      max-width: 165px;
      font-weight: 800;
      font-size: 24px;
      line-height: 110%;
    }

    &--desc {
      padding-top: 6px;
      line-height: 110%;
    }
  }
}
</style>
