<script lang="ts">
import { defineComponent } from "vue";
import SettingsItem from "@/components/common/SettingsItem.vue";

export default defineComponent({
  name: "SettingsCheckbox",
  components: { SettingsItem },
  props: {
    icon: String,
    text: String,
    modelValue: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    return {};
  },
});
</script>

<template>
  <label class="checkbox--wrap pointer">
    <input
      class="checkbox"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <SettingsItem :icon="icon" :text="text">
      <span class="checkbox__fake">
        <img
          :class="{ active: modelValue }"
          class="checkbox__fake__img"
          src="../../assets/images/checkbox.png"
          alt="checkbox"
        />
      </span>
    </SettingsItem>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  display: none;
  &--wrap {
    display: block;

    ::v-deep(.checkbox__fake) {
      background: rgba(0, 0, 0, 0.5);
      border: 1.8px solid #191919;
      backdrop-filter: blur(27.1828px);
      border-radius: 32px;
      width: 56px;
      height: 40px;
      display: block;
      position: relative;
    }

    ::v-deep(.checkbox__fake__img) {
      position: absolute;
      right: 8px;
      top: 7px;
      transition: all 0.3s ease;

      &.active {
        transform: translateX(-14px);
        opacity: 0.45;
      }
    }
  }
}
</style>
