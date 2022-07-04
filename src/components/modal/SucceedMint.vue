<script lang="ts">
import { defineComponent } from "vue";
import PopupBtn from "@/components/popup/PopupBtn.vue";
import { useI18n } from "vue-i18n";
import { useAppStateStore } from "@/store/appState.store";

export default defineComponent({
  name: "SucceedMint",
  components: { PopupBtn },
  emits: ["btnClick"],
  setup(props, context) {
    const { t } = useI18n();
    const buttons = [
      {
        styleType: "default",
        text: `${t("ok")}`,
        textColor: "black",
        type: "install",
      },
    ];
    const closePopup = (btn: any) => {
      context.emit("btnClick", btn.type);
      const appStore = useAppStateStore();
      appStore.setIsShowModal(false);
    };
    return { t, buttons, closePopup };
  },
});
</script>

<template>
  <teleport to="#modal">
    <div class="popup__content flex direction-column flexCenter">
      <img
        class="popup__content__img"
        :src="require(`@/assets/images/smile_mint.svg`)"
      />
      <h2 class="popup__content__info">
        {{ t("drop.succeedMint") }}
      </h2>
      <p class="popup__content__desc">{{ t("drop.feelFree") }}</p>
      <div class="popup__content__btns flex justify-center">
        <PopupBtn
          @click="closePopup(btn)"
          :styleType="btn.styleType"
          :text="btn.text"
          :text-color="btn.textColor"
          v-for="(btn, i) of buttons"
          :key="i"
          class="popup__content__btns__btn"
        ></PopupBtn>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.popup {
  &__content {
    padding-top: 61px;
    padding-bottom: 77px;
    @media screen and (max-width: 768px) {
      padding-top: 53px;
      padding-bottom: 43px;
    }

    &__info {
      padding: 31px 10px 13px;
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
}
</style>
