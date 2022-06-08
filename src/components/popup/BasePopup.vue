<script lang="ts">
import { defineComponent } from "vue";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "BasePopup",
  setup() {
    const appStateStore = useAppStateStore();
    const closeModal = () => appStateStore.setIsShowModal(false);
    const appStore = useAppStateStore();
    const { showModal } = storeToRefs(appStore);
    return { closeModal, showModal };
  },
});
</script>

<template>
  <transition name="fade">
    <div
      v-show="showModal"
      class="wrapper flex flexCenter"
      @click.stop.self="closeModal()"
    >
      <div id="modal" class="popup flex flexCenter direction-column">
        <span class="popup__cancel" @click.self="closeModal()"></span>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-modal);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(27.1828px);
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
  border: 1px solid var(--color-eerie);
  border-radius: 24px;
  @media screen and (max-width: 768px) {
    height: 404px;
  }
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
