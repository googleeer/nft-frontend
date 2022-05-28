<script lang="ts">
import { defineComponent } from "vue";
import SettingsItem from "@/components/common/SettingsItem.vue";
import SettingsItemArrow from "@/components/common/SettingsItemArrow.vue";

export default defineComponent({
  name: "SettingsLink",
  components: { SettingsItemArrow, SettingsItem },
  props: {
    to: String,
    icon: String,
    text: String,
    withOutBorder: Boolean,
    borderRadius: String,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <RouterLink :to="to" class="link">
    <SettingsItem
      :icon="icon"
      :text="text"
      :with-out-border="withOutBorder"
      :border-radius="borderRadius"
    >
      <SettingsItemArrow />
    </SettingsItem>
  </RouterLink>
</template>

<style lang="scss" scoped>
.link {
  display: block;
  text-decoration: none;

  &.exact-active {
    ::v-deep(.item) {
      background: transparent;
    }
    ::v-deep(.arrow__svg) {
      transform: rotate(-90deg);
    }
  }

  &__arrow {
    background: rgba(0, 0, 0, 0.5);
    border: 1.8px solid #191919;
    backdrop-filter: blur(27.1828px);
    border-radius: 32px;
    width: 56px;
    height: 40px;
    &__svg {
      transition: all 0.3s ease;
    }
  }
}
</style>
