<template>
  <div class="wrapper flex flexCenter" @click.stop.self="closeModal('close')">
    <div :id="modalTeleport" class="popup flex flexCenter direction-column">
      <span class="popup__cancel" @click.self="closeModal('close')"></span>
    </div>
  </div>

  <MetamaskModal :btns="btns" @closeModal="closeModal"></MetamaskModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MetamaskModal from "@/components/modal/MetamaskModal.vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "BasePopup",
  components: { MetamaskModal },
  setup() {
    const appStateStore = useAppStateStore();
    const btns = [
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
    const closeModal = (type: string) => {
      if (type === "close" || !type) {
        appStateStore.setIsShowModal(false);
      }
    };
    const appStore = useAppStateStore();
    const { modalTeleport } = storeToRefs(appStore);
    return { closeModal, modalTeleport, btns };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(27.1828px);

  transition: all 3s ease;
}
.popup {
  position: relative;
  width: 100%;
  max-width: 840px;
  height: 508px;
  margin: 0 24px;
  background: radial-gradient(
    113.12% 113.12% at 50.52% 50.52%,
    #292929 0%,
    #000000 100%
  );
  border: 1px solid #212121;
  border-radius: 24px;
}
.popup__cancel {
  content: "";
  position: absolute;
  top: 28.25px;
  right: 28.25px;
  width: 16px;
  height: 16px;
  background-image: url("~@/assets/images/cancel.svg");
  background-repeat: no-repeat;
  background-size: contain;
  &:hover {
    cursor: pointer;
    border-radius: 100%;
  }
}
</style>
