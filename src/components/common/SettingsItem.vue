<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SettingsItem",
  props: {
    icon: String,
    text: String,
    withOutBorder: Boolean,
    borderRadius: String,
  },
  setup(props) {
    const { t } = useI18n();
    const border = computed(() => ({
      border__radius__none: props.borderRadius === "none",
      border__radius__top: props.borderRadius === "top",
      border__radius__bottom: props.borderRadius === "bottom",
    }));
    return { t, border };
  },
});
</script>

<template>
  <div class="item flex align-center" :class="[{ withOutBorder }, border]">
    <div>
      <img
        class="item__icon"
        :src="require(`@/assets/images/icons/${icon}`)"
        :alt="icon"
      />
    </div>
    <div class="item__content flex justify-between align-center">
      {{ t(text) }}
      <div class="item__slot">
        <slot></slot>
      </div>
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
  &__content {
    width: 100%;
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
.item:not(.withOutBorder) {
  border: 1px solid var(--color-eerie);
  border-radius: 34px;
  background: var(--color-nero);
}

.link {
  .border__radius__none {
    border-radius: 0;
    border: none;
  }

  .border__radius__top {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
  }

  .border__radius__bottom {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: none;
  }
}
</style>
