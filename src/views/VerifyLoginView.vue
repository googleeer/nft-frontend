<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { getCodeByPhone, verifyCodeByPhone } from "@/service/auth/auth.service";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default defineComponent({
  name: "VerifyLoginView",
  components: { AuthLayout },
  setup() {
    const router = useRouter();
    const appState = useAppStateStore();
    const { verifiedPhone } = storeToRefs(appState);

    const inputRef = ref<HTMLInputElement | null>(null);
    const codeValue = ref("");
    const isLoaded = ref(false);
    const error = ref("");

    const endTimerDate = ref(0);
    const timer = ref(0);
    const intervalId = ref<null | ReturnType<typeof setTimeout>>(null);
    const mounted = ref(false);
    if (!verifiedPhone.value) {
      router.push("/login");
    }

    const focusInput = () => (inputRef.value as HTMLInputElement).focus();
    const startTimer = () => {
      const now = new Date().getTime();
      endTimerDate.value = now + 30000;
      intervalId.value = setInterval(() => {
        const now = new Date().getTime();
        timer.value = Math.round((endTimerDate.value - now) / 1000);
        if (!timer.value && intervalId.value) clearInterval(intervalId.value);
      }, 1000);
    };
    onMounted(() => {
      startTimer();
      setTimeout(() => (mounted.value = true), 1000);
      focusInput();
    });
    onBeforeUnmount(() => {
      intervalId.value && clearInterval(intervalId.value);
    });

    const resend = async () => {
      try {
        await getCodeByPhone(verifiedPhone.value);
        startTimer();
      } catch (e) {
        console.log(e);
      }
    };

    const onInput = (ev: any) => {
      const target: HTMLInputElement = ev.target;
      target.selectionStart = target.selectionEnd = target.value.length;
    };

    const getChart = (idx: number) => codeValue.value[idx - 1];
    const getCaret = (idx: number) => {
      if (idx === 1 && !codeValue.value) return true;
      if (idx === 6 && getChart(idx)) return true;
      return codeValue.value[idx - 2] && !getChart(idx);
    };

    watch(codeValue, async (value) => {
      error.value = "";
      if (value.length === 6) {
        isLoaded.value = true;
        try {
          await verifyCodeByPhone(verifiedPhone.value, codeValue.value);
          await router.push("/");
        } catch (e) {
          error.value = (e as any).response.data;
        } finally {
          isLoaded.value = false;
        }
      }
    });

    return {
      verifiedPhone,
      codeValue,
      isLoaded,
      inputRef,
      error,
      timer,
      mounted,
      resend,
      onInput,
      getChart,
      getCaret,
    };
  },
});
</script>

<template>
  <AuthLayout title="Verification">
    <template #text>
      <p class="text">We sent you an SMS code</p>
      <p class="number--wrap">
        On number <span class="number">{{ verifiedPhone }}</span>
      </p>
    </template>
    <template #form>
      <div class="flex direction-column">
        <div class="input--wrap">
          <input
            class="input"
            type="text"
            maxlength="6"
            v-model.trim="codeValue"
            @input="onInput"
            ref="inputRef"
            :readonly="isLoaded"
          />
          <ul class="input__fake--wrap flex align-center">
            <li
              v-for="index in 6"
              :key="index"
              class="input__fake flex align-center justify-center"
              :class="{
                active: getChart(index),
                'has-caret': getCaret(index),
                error: error.length,
              }"
            >
              {{ getChart(index) }}
              <span class="caret" v-if="getCaret(index)"></span>
            </li>
          </ul>
          <transition name="fade">
            <div v-if="error" class="input__error">
              {{ error }}
            </div>
          </transition>
        </div>
        <transition name="fade">
          <div class="timer__wrap" v-if="mounted">
            <p class="timer__text">
              {{
                timer ? "We sent code again" : "Didn't you receive code here?"
              }}
            </p>
            <transition name="fade" mode="out-in">
              <p class="timer__active" key="active" v-if="timer">
                Resend 00:{{ timer >= 10 ? timer : `0${timer}` }}
              </p>
              <p v-else key="button" @click="resend" class="timer__button">
                Resend New Code
              </p>
            </transition>
          </div>
        </transition>
      </div>
    </template>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.timer {
  &__button,
  &__active {
    font-size: 18px;
    line-height: 18px;
    text-align: center;
  }

  &__button {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }

  &__text {
    font-family: SFPro, sans-serif;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: var(--color-gray);
    margin-bottom: 21px;
  }
}

.input {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  opacity: 0;
  font-size: 1px;

  &:focus {
    + .input__fake--wrap {
      .caret {
        opacity: 1;
      }
    }
  }

  &__fake {
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    border: 1px solid #212121;
    border-radius: 100%;
    width: 49px;
    height: 49px;
    margin-right: 4px;
    position: relative;
    transition: all 0.3s ease;
    cursor: text;
    font-size: 18px;
    line-height: 25px;

    &:nth-child(3) {
      margin-right: 19px;
    }

    &.error {
      border: 1px solid #f282ab;
      background: radial-gradient(
        113.12% 113.12% at 50.52% 50.52%,
        rgba(242, 130, 171, 0.25) 0%,
        rgba(242, 130, 171, 0.25) 100%
      );
    }

    &.active:not(.error) {
      border-color: white;
    }

    &:last-child.active {
      .caret {
        left: auto;
        width: 10px;
        right: 10px;
      }
    }

    .caret {
      opacity: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 1px;
      background-color: white;
      bottom: 14px;
    }
  }

  &__error {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 7px);
    font-size: 14px;
    line-height: 150%;
    color: #f282ab;
  }

  &--wrap {
    position: relative;
    margin-bottom: 65px;
  }
}

.text {
  font-size: 20px;
  line-height: 150%;
  margin-bottom: 10px;
}

.number {
  font-family: CoreSansC, sans-serif;
  color: white;
  line-height: 21px;

  &--wrap {
    font-size: 16px;
    line-height: 21px;
    color: var(--color-gray);
    font-family: SFPro, sans-serif;
    margin-bottom: 33px;
  }
}
</style>
