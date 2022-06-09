<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollectionDrop",
  props: { drop: Object },
});
</script>

<template>
  <div class="drop">
    <img class="drop__img" :src="require(`@/assets/images/${drop.img}`)" />
    <div class="drop__content">
      <p class="drop__content--name">{{ drop.name }}</p>
      <p class="drop__content--desc">{{ drop.shortDescription }}</p>
    </div>
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
    width: 92px;
  }
  &__content {
    padding-left: 16px;

    &--name {
      max-width: 156px;
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
