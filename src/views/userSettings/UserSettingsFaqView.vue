<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "UserSettingsFaq",
  setup() {
    const show = ref(false);
    const currentTitle = ref();
    const { t } = useI18n();
    function showCurrentItem(item: { title: string }) {
      if (currentTitle.value === item.title) {
        currentTitle.value = "";
      } else {
        currentTitle.value = item.title;
      }
    }
    const data = [
      {
        title: "General helpex",
        desc: "As a reminder, you are solely responsible for validating this information and determining what, if any, taxes apply to your NFT sales and/or creator earnings. ",
      },
      {
        title: "Contact Weedar Suppor",
        desc: "As a reminder, you are solely responsible for validating this information and determining what, if any, taxes apply to your NFT sales and/or creator earnings. ",
      },
      {
        title: "Help with a compromised account",
        desc: "As a reminder, you are solely responsible for validating this information and determining what, if any, taxes apply to your NFT sales and/or creator earnings. ",
      },
      {
        title: "Cancel all Ethereum listings and offers",
        desc: "As a reminder, you are solely responsible for validating this information and determining what, if any, taxes apply to your NFT sales and/or creator earnings. ",
      },
    ];
    return {
      show,
      data,
      currentTitle,
      showCurrentItem,
      t,
    };
  },
});
</script>

<template>
  <div class="wrapper padding-settings">
    <h1 class="title">{{ t("settings.title") }}</h1>
    <p class="desc">{{ t("settings.desc") }}</p>
    <div v-for="(item, key) of data" :key="key" class="faq">
      <div
        @click="showCurrentItem(item)"
        class="faq-item"
        :class="{ active: currentTitle === item.title }"
      >
        <div class="faq-item-title flex justify-between align-center">
          <p class="faq-item-title-text">
            {{ item.title }}
          </p>
          <div>
            <svg
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L9.25269 2.76297C7.85925 4.1689 7.16253 4.87187 6.31333 4.98011C6.10527 5.00663 5.89473 5.00663 5.68667 4.98011C4.83748 4.87187 4.14075 4.1689 2.74731 2.76297L1 1"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span class="faq-item-title-line"></span>
        </div>
        <transition name="desc">
          <p class="faq-item-desc" v-if="currentTitle === item.title">
            {{ item.desc }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desc-leave-active,
.desc-enter-active {
  transition: all 0.5s;
}
.desc-leave-to {
  opacity: 0;
}

//.desc-enter-active,
//.desc-leave-active {
//  transition: all 2s;
//}
////.desc-enter-to {
////  transform: translateX(10px);
////}
//.desc-leave-to {
//  //transform: translateX(10px);
//  opacity: 0;
//}
.title {
  font-weight: 600;
  font-size: 32px;
  line-height: 130%;
}
.desc {
  font-size: 20px;
  line-height: 150%;
  padding-top: 24px;
  padding-bottom: 45px;
}
.wrapper {
  @media screen and (max-width: 768px) {
    padding-left: 15px;
  }

  .faq {
    padding-bottom: 42px;
    &-item {
      position: relative;
      width: 100%;
      max-width: 720px;
      &-desc {
        padding-top: 9px;
        padding-bottom: 60px;
        line-height: 150%;
      }

      &-title {
        padding-bottom: 14px;

        &-text {
          font-weight: 800;
          font-size: 32px;
          line-height: 110%;
          padding-right: 15px;
        }

        &-line {
          width: 134px;
          height: 4px;
          position: absolute;
          bottom: 0;
          background: linear-gradient(
            307.82deg,
            #81ff81 -7.19%,
            #fbfef9 32.88%,
            #ff8bec 48.41%,
            #ffffff 75.25%,
            #3854ff 109.05%
          );
        }
      }
    }
  }
}
.active {
  ::v-deep(svg) {
    transform: rotate(180deg);
    transition: all 0.5s ease;
  }
}
</style>
