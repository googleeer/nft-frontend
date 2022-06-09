<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NftVisualInfo",
  components: {},
  setup() {
    const { t } = useI18n();
    return { ROUTES, t };
  },
});
</script>

<template>
  <div class="nft"></div>
</template>

<style lang="scss" scoped></style>
