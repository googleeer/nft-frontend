<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "UserSettingsReferral",
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<template>
  <div class="wrapper">
    <div v-html="t('description')" class="referral"></div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  .referral {
    width: 100%;
    max-width: 743px;

    ::v-deep(p) {
      font-weight: 400;
      font-size: 16px;
      padding: 12px 0;
      line-height: 150%;
      color: var(--color-white);
      @media screen and (max-width: 768px) {
        font-size: 20px;
        padding-bottom: 7px;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
    ::v-deep(h1) {
      font-size: 32px;
      font-weight: 600;
      line-height: 130%;
      padding-bottom: 12px;
      @media screen and (max-width: 768px) {
        padding-bottom: 7px;
      }
    }
  }
}
</style>
