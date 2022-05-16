<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SettingsItem",
  props: {
    icon: String,
    text: String,
    withOutBorder: Boolean,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<template>
  <div class="item flex align-center" :class="{ withOutBorder }">
    <img
      class="item__icon"
      :src="require(`@/assets/images/icons/${icon}.png`)"
      :alt="icon"
    />
    {{ t(text) }}
    <div class="item__slot">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  padding: 15px 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: var(--color-white);
  user-select: none;

  &:not(.withOutBorder) {
    border: 1px solid var(--color-eerie);
    border-radius: 34px;
    background: var(--color-nero);
  }

  &__icon {
    width: 56px;
    height: 56px;
    object-fit: cover;
    margin-right: 20px;
  }

  &__slot {
    margin-left: auto;
  }
}
</style>
