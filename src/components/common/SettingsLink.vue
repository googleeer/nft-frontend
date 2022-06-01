<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import SettingsItem from "@/components/common/SettingsItem.vue";
import SettingsItemArrow from "@/components/common/SettingsItemArrow.vue";

export default defineComponent({
  name: "SettingsLink",
  components: { SettingsItemArrow, SettingsItem },
  props: {
    to: [String, Object, undefined] as PropType<
      string | undefined | { name: string }
    >,
    icon: String,
    text: String,
    withOutBorder: Boolean,
    borderRadius: String,
  },
  setup(props) {
    const border = computed(() => ({
      border__radius__none: props.borderRadius === "none",
      border__radius__top: props.borderRadius === "top",
      border__radius__bottom: props.borderRadius === "bottom",
    }));
    const currentComponent = props.to ? "RouterLink" : "button";

    return { border, currentComponent };
  },
});
</script>

<template>
  <component class="link" :is="currentComponent" :to="to">
    <SettingsItem
      :icon="icon"
      :text="text"
      :with-out-border="withOutBorder"
      :border-radius="borderRadius"
    >
      <SettingsItemArrow />
    </SettingsItem>
  </component>
</template>

<style lang="scss" scoped>
.link {
  width: 100%;
  padding: 0;
  display: block;
  text-decoration: none;
  border: none;
  background: transparent;
  outline: none;
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
