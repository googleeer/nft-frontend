<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "BaseButton",
  props: {
    buttonText: [Object, String] as PropType<
      string | { key: string; params: Record<string, string> }
    >,
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
    to: [String, Object, undefined] as PropType<
      string | undefined | { name: string }
    >,
  },
  setup(props) {
    const { t } = useI18n();
    console.log(props.buttonText);
    const currentComponent = props.to ? "RouterLink" : "button";
    const text = computed(() => {
      return typeof props.buttonText === "object"
        ? t(props.buttonText.key, props.buttonText.params)
        : props.buttonText;
    });
    const currentAttribute = computed(() =>
      props.to
        ? {
            to: props.to,
          }
        : {
            disabled: props.disabled,
          },
    );
    return { currentComponent, currentAttribute, t, text };
  },
});
</script>

<template>
  <component class="button" v-bind="currentAttribute" :is="currentComponent">
    {{ text }}
    <span class="button__background"></span>
    <span class="button__arrow flex align-center justify-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.528 6.46731C16.2338 6.17573 15.7589 6.17784 15.4673 6.47204C15.1757 6.76624 15.1778 7.24111 15.472 7.53269L17.235 9.28C17.9505 9.98914 18.4413 10.4772 18.7734 10.8907C18.8813 11.0251 18.9655 11.1434 19.0309 11.25L4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L19.0309 12.75C18.9655 12.8566 18.8813 12.9749 18.7734 13.1093C18.4413 13.5228 17.9505 14.0109 17.235 14.72L15.472 16.4673C15.1778 16.7589 15.1757 17.2338 15.4673 17.528C15.7589 17.8222 16.2338 17.8243 16.528 17.5327L18.3227 15.7539C18.9987 15.084 19.5511 14.5364 19.9429 14.0485C20.3504 13.5412 20.6453 13.0263 20.7241 12.4082C20.7414 12.2726 20.75 12.1363 20.75 12C20.75 11.8637 20.7414 11.7274 20.7241 11.5918C20.6453 10.9737 20.3504 10.4588 19.9429 9.95146C19.5511 9.46358 18.9987 8.91604 18.3227 8.24609L16.528 6.46731Z"
          fill="white"
        />
      </svg>
    </span>
  </component>
</template>

<style lang="scss" scoped>
.button {
  position: relative;
  z-index: 0;
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  text-align: center;
  color: var(--color-black);
  padding: 23px 0 23px;
  border-radius: 40px;
  min-width: 335px;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-family: CoreSansC, sans-serif;
  text-decoration: none;
  &[disabled] {
    pointer-events: none;
    .button__background {
      filter: brightness(0.6);
    }
  }

  &:hover {
    box-shadow: 1px 1px 11px white;
  }

  &__background {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("~@/assets/images/buttonBg.svg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__arrow {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
    bottom: 8px;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    border: 1px solid var(--color-eerie);
  }
}
</style>
