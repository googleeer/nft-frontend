<script lang="ts">
import { defineComponent, PropType } from "vue";
import Slots from "@/components/perks/Slots.vue";
import { Perk } from "@/service/perk/perk.type";
export default defineComponent({
  name: "DropPerks",
  components: { Slots },
  props: {
    perks: {
      type: Object as PropType<Perk[]>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="perks">
    <div class="perks__perk" v-for="perk of perks" :key="perk.id">
      <Slots
        :slots="
          perk.slots.openingNewSlot && perk.slots.count < 5
            ? perk.slots.count + 1
            : perk.slots.count
        "
        :isNew="perk.slots.openingNewSlot"
      ></Slots>
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
    width: 5px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 5px #dddddd;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #9e9e9e;
    background: linear-gradient(
      89.99deg,
      #fcfff9 9.64%,
      #e9eef7 44.04%,
      #d5e7f0 61.4%,
      #c1d8ef 95.53%
    );
    border-radius: 2px;
  }
  .drop__img {
    width: 90px;
  }
  &__perk {
    ::v-deep(.slots) > svg {
      width: 90px;
      height: 90px;
    }
    ::v-deep(.slots) > img {
      width: 54px;
    }
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
