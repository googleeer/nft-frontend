<script lang="ts">
import { defineComponent } from "vue";
import PopupBtn from "@/components/popup/PopupBtn.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SucceedMint",
  components: { PopupBtn },
  emits: ["btnClick"],
  setup() {
    const { t } = useI18n();
    const buttons = [
      {
        styleType: "default",
        text: `${t("ok")}`,
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
    <img class="popup__img" :src="require(`@/assets/images/smile_mint.png`)" />
    <h2 class="popup__info">
      {{ t("drop.succeedMint") }}
    </h2>
    <p class="popup__desc">{{ t("drop.feelFree") }}</p>
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
    padding: 39px 10px 15px;
    width: 100%;
    text-align: center;
    font-weight: 800;
    font-size: 36px;
    line-height: 110%;
    @media screen and (max-width: 768px) {
      font-size: 24px;
      padding-bottom: 13px;
    }
  }
  &__desc {
    padding-bottom: 37px;
    font-size: 18px;
    line-height: 110%;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      padding-bottom: 47px;
    }
  }
  &__img {
    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: 109px;
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
