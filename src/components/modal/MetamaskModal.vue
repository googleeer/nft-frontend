<script lang="ts">
import { defineComponent } from "vue";
import PopupBtn from "@/components/popup/PopupBtn.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MetamaskModal",
  components: { PopupBtn },
  emits: ["btnClick"],
  setup() {
    const { t } = useI18n();
    const buttons = [
      {
        styleType: "simple",
        text: "Cancel",
        textColor: "white",
        type: "close",
      },
      {
        styleType: "default",
        text: "install",
        textColor: "black",
        type: "install",
      },
    ];
    return { t, buttons };
  },
});
</script>

<template>
  <teleport to="#modal">
    <img class="popup__img" :src="require(`@/assets/images/fox.svg`)" />
    <h2 class="popup__info">
      {{ t("settings.wallet.metamask.info") }}
    </h2>
    <div class="popup__btns flex justify-center">
      <PopupBtn
        @click="$emit('btnClick', btn.type)"
        :styleType="btn.styleType"
        :text="btn.text"
        :text-color="btn.textColor"
        v-for="(btn, i) of buttons"
        :key="i"
        class="popup__btns__btn"
      ></PopupBtn>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.popup {
  &__info {
    padding: 42px 10px 54px;
    width: 100%;
    max-width: 412px;
    text-align: center;
    line-height: 140%;
  }
  &__img {
    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: 88px;
    }
  }
  &__btns {
    width: 100%;

    :not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
