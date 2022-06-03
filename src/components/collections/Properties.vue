<script lang="ts">
export default {
  name: "CollectionProperties",
  props: { title: String, value: String },
};
</script>

<template>
  <div class="property--wrap">
    <p class="property__title">{{ $props.title }}</p>
    <p class="property__value">{{ $props.value }}</p>
  </div>
</template>

<style lang="scss" scoped>
.property {
  &__value {
    font-size: 18px;
    line-height: 110%;
  }
  &__title {
    color: #808080;
    padding-bottom: 7px;
    font-size: 14px;
    line-height: 110%;
    &:first-letter {
      text-transform: capitalize;
    }
  }
  &--wrap {
    width: 100%;
    padding: 20px 44px;
    max-width: 205px;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    border: 1px solid #212121;
    border-radius: 24px;
    text-align: center;
    @media screen and (max-width: 523px) {
      padding: 28px 22px;
    }
    &:not(:first-child) {
      margin-left: 18px;
    }
  }
}
</style>
