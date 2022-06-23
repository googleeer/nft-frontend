<script lang="ts">
import { defineComponent } from "vue";
import { maska } from "maska";

export default defineComponent({
  name: "PhoneInput",
  directives: { maska },
  props: {
    modelValue: {
      type: String,
      default: () => "",
    },
    errorText: String,
  },
  emits: ["update:modelValue", "update:errorText"],
  setup(props, context) {
    const validate = (value = props.modelValue) => {
      const { length } = value
        .split("")
        .filter((_) => _.trim())
        .join("");
      if (length == 0) {
        context.emit("update:errorText", "Please  provide phone number");
      } else if (length <= 7 || length >= 14) {
        context.emit("update:errorText", "Phone number is incorrect!");
      } else {
        context.emit("update:errorText", "");
      }
    };

    const onInput = (value: string) => {
      props.errorText && validate(value);
      context.emit("update:modelValue", value);
    };

    return { validate, onInput };
  },
});
</script>

<template>
  <label class="input--wrap">
    <input
      class="input"
      :class="{ error: errorText.length }"
      type="text"
      :value="modelValue"
      @input="onInput($event.target.value)"
      @change="validate()"
      inputmode="numeric"
    />
    <span class="input__code">+</span>
    <transition name="fade">
      <span class="input__error" v-if="errorText.length">
        {{ errorText }}
      </span>
    </transition>
  </label>
</template>

<style lang="scss" scoped>
.input {
  border: 1px solid var(--color-eerie);
  box-sizing: border-box;
  border-radius: 40px;
  min-width: 335px;
  padding: 23px 0 23px 65px;
  transition: all 0.3s ease;
  font-size: 18px;
  line-height: 18px;
  color: var(--color-white);
  background: radial-gradient(
    113.12% 113.12% at 50.52% 50.52%,
    #292929 0%,
    #000000 100%
  );

  &.error {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 241, 252, 0.25) 0%,
      rgba(255, 186, 243, 0.25) 100%
    );
    border: 1px solid var(--color-error);
    color: var(--color-error);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border: 1px solid var(--color-white);
  }

  &__error {
    position: absolute;
    left: 0;
    top: calc(100% + 7px);
    right: 0;
    color: var(--color-error);
    font-size: 14px;
    line-height: 150%;
  }

  &__code {
    position: absolute;
    z-index: 1;
    left: 1px;
    top: 2px;
    bottom: 1px;
    font-size: 18px;
    line-height: 18px;
    color: var(--color-white);
    width: 48px;
    padding: 26px 0 20px 24px;
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      height: 24px;
      width: 1px;
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-50%);
    }
  }

  &--wrap {
    position: relative;
    display: inline-block;
  }
}
</style>
