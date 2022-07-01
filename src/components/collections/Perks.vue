<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropPerks",
  props: { perks: Object },
});
</script>

<template>
  <div class="perks">
    <div class="perks__perk" v-for="perk of perks" :key="perk.id">
      <img class="drop__img" src="@/assets/images/brilliant.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.perks {
  display: flex;
  margin-top: 27px;
  overflow-x: auto;
  padding-bottom: 15px;
  margin-bottom: 15px;
  padding-left: 36px;
  @media screen and (max-width: 768px) {
    padding-left: 26px;
  }
  &__perk:not(:first-child) {
    margin-left: 12px;
  }
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444444;
    border-radius: 10px;
  }
  .drop__img {
    width: 90px;
  }
}
.drop {
  display: flex;
  padding-top: 23px;
  padding-bottom: 61px;
  align-self: flex-start;
  @media screen and (max-width: 768px) {
    padding-top: 11px;
    padding-bottom: 41px;
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
