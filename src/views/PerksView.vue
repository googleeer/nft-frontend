<script lang="ts">
import { defineComponent, ref } from "vue";
import data from "../../test-data.json";
import { useAppStateStore } from "@/store/appState.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "PerksView",
  setup() {
    const appStore = useAppStateStore();
    const { isMobile } = storeToRefs(appStore);
    const currentIndex = ref(0);
    const tab = ["all", "active", "inactive"];
    const perks = data[2].myperks;
    const filteredData = () => {
      if (currentIndex.value === 0) {
        return perks;
      } else if (currentIndex.value === 1) {
        return perks?.filter((item) => item.id === 1);
      } else {
        return perks?.filter((item) => item.id == 2);
      }
    };
    return { tab, currentIndex, perks, filteredData, isMobile };
  },
});
</script>

<template>
  <div class="wrapper flex direction-column justify-center align-center">
    <ul class="filter flex">
      <li
        class="filter__item"
        v-for="(rule, index) of tab"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      >
        {{ rule }}
      </li>
    </ul>
    <div
      class="perks flex justify-center"
      :class="{ 'align-center': !isMobile }"
    >
      <div class="perk" v-for="(perk, i) of filteredData()" :key="i">
        <div class="perk__img">
          <img class="perk__img__icon" src="@/assets/images/perks/heart.png" />
        </div>
        <div class="perk__content">
          <h2 class="perk__content__name">{{ perk.name }}</h2>
          <p class="perk__content__desc">{{ perk.desc }}</p>
          <p class="perk__content__action">{{ perk.youGet }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  padding-bottom: 60px;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
  &__item {
    font-family: CoreSansC, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    &:first-letter {
      text-transform: uppercase;
    }
    &:not(:last-child) {
      margin-right: 36px;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -18px;
        width: 1px;
        height: 11px;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    &:not(.active) {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}

.wrapper {
  padding-top: 120px;
  width: 100%;
  max-width: 1361px;
  margin: 0 auto;
}
.perks {
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
}
.perk {
  box-sizing: content-box;
  width: 290px;
  height: calc(376px - 182px);
  position: relative;
  z-index: 0;
  margin: 50px 15px;
  @media screen and (max-width: 1280px) {
    margin: 50px 33px;
  }
  @media screen and (max-width: 711px) {
    width: 100%;
    height: 157px;
    box-sizing: border-box;
    @media screen and (max-width: 711px) {
      display: flex;
      justify-content: flex-end;
      max-width: 375px;
    }
    .perk__img {
      width: 100%;
      max-width: 157px;
      height: auto;
      &__icon {
        width: 100%;
        max-width: 157px;
      }
    }
  }
  &__content {
    width: 100%;
    max-width: 240px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 34px;
    @media screen and (max-width: 711px) {
      display: inline-block;
      //padding-top: 19px;
      //padding-bottom: 18px;
      //padding-right: 28px;
      max-width: 180px;
      padding-left: 0;
    }
    &__name {
      position: relative;
      font-weight: 800;
      font-size: 32px;
      line-height: 110%;
      @media screen and (max-width: 768px) {
        display: inline;
      }
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        max-width: 145px;
        height: 2px;
        background: linear-gradient(
          307.82deg,
          #81ff81 -7.19%,
          #fbfef9 32.88%,
          #ff8bec 48.41%,
          #ffffff 75.25%,
          #3854ff 109.05%
        );
        bottom: -6px;
        left: 0;
      }
    }
    &__desc {
      font-weight: 500;
      padding-top: 27px;
      font-size: 20px;
      line-height: 18px;
      font-family: Avenir, sans-serif;
      padding-bottom: 10px;
      @media screen and (max-width: 711px) {
        font-size: 16px;
        padding-top: 17px;
        padding-bottom: 6px;
      }
    }
    &__action {
      font-weight: 800;
      font-size: 20px;
      line-height: 120%;
      background: linear-gradient(
        307.82deg,
        #81ff81 -7.19%,
        #fbfef9 32.88%,
        #ff8bec 48.41%,
        #ffffff 75.25%,
        #3854ff 109.05%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      @media screen and (max-width: 711px) {
        font-size: 18px;
      }
      @media screen and (max-width: 400px) {
        font-size: 16px;
      }
    }
  }
  &:after {
    content: "";
    border-radius: 15px;
    background: radial-gradient(
      113.12% 113.12% at 50.52% 50.52%,
      #292929 0%,
      #000000 100%
    );
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
  }

  &:nth-child(odd) {
    padding-top: 290px;
    @media screen and (max-width: 711px) {
      margin: 7px 0 7px 10px;
      padding: 23px 28px 23px 0px;
    }
    @media screen and (max-width: 711px) {
      .perk__content {
        margin: 0 0 0 175px;
      }
    }
    .perk__content__name {
      padding-top: 28px;
      @media screen and (max-width: 711px) {
        font-size: 24px;
      }
    }
    &:after {
      top: 145px;
      bottom: 0;
      @media screen and (max-width: 711px) {
        left: 80px;
        top: 0;
      }
    }

    .perk__img {
      top: 0;
      @media screen and (max-width: 711px) {
        bottom: 0;
        top: auto;
      }
    }
  }

  &:nth-child(even) {
    padding-bottom: 290px;
    @media screen and (max-width: 711px) {
      display: flex;
      justify-content: flex-start;
      margin: 7px 10px 7px 0;
      padding: 33px 0 33px 28px;
    }
    .perk__content__name {
      padding-top: 34px;
      @media screen and (max-width: 711px) {
        font-size: 24px;
      }
    }
    @media screen and (max-width: 711px) {
      .perk__content {
        margin-right: 165px;
        //padding-top: 19px;
        //padding-bottom: 18px;
        //padding-left: 28px;
      }
    }
    &:after {
      top: 0;
      bottom: 145px;
      @media screen and (max-width: 711px) {
        right: 80px;
        bottom: 0;
      }
    }

    .perk__img {
      bottom: 0;
      @media screen and (max-width: 768px) {
        right: 0;
        left: auto;
      }
    }
  }

  &__content {
    //padding: 10px;
  }

  &__img {
    width: 290px;
    height: 290px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }
}

//.wrapper {
//  padding-left: 43px;
//  padding-top: 120px;
//  width: 100%;
//  max-width: 1361px;
//  margin: 0 auto;
//}
//.perk {
//  width: 100%;
//  max-width: 290px;
//  height: calc(376px - 145px);
//  display: flex;
//  flex-direction: column;
//  position: relative;
//  margin: 50px 0px;
//  border-radius: 32px;
//  justify-content: flex-end;
//  z-index: 1;
//  padding-bottom: 290px;
//  &:after {
//    content: "";
//    border-radius: 15px;
//    background: radial-gradient(
//      113.12% 113.12% at 50.52% 50.52%,
//      #292929 0%,
//      #000000 100%
//    );
//    position: absolute;
//    z-index: -1;
//    left: 0;
//    right: 0;
//  }
//
//  &__img {
//  }
//  &__content {
//    width: 100%;
//    max-width: 240px;
//    position: relative;
//    display: flex;
//    flex-direction: column;
//    padding-left: 34px;
//    padding-bottom: 28px;
//    &__name {
//      position: relative;
//      font-weight: 800;
//      font-size: 32px;
//      line-height: 110%;
//      padding-top: 27px;
//      //&::after {
//      //  position: absolute;
//      //  content: "";
//      //  width: 100%;
//      //  max-width: 145px;
//      //  height: 2px;
//      //  background: linear-gradient(
//      //    307.82deg,
//      //    #81ff81 -7.19%,
//      //    #fbfef9 32.88%,
//      //    #ff8bec 48.41%,
//      //    #ffffff 75.25%,
//      //    #3854ff 109.05%
//      //  );
//      //  bottom: -6px;
//      //  left: 0;
//      //}
//    }
//    &__desc {
//      font-weight: 500;
//      padding-top: 27px;
//      font-size: 20px;
//      line-height: 18px;
//      font-family: Avenir, sans-serif;
//      padding-bottom: 10px;
//    }
//    &__action {
//      font-weight: 800;
//      font-size: 20px;
//      line-height: 120%;
//      background: linear-gradient(
//        307.82deg,
//        #81ff81 -7.19%,
//        #fbfef9 32.88%,
//        #ff8bec 48.41%,
//        #ffffff 75.25%,
//        #3854ff 109.05%
//      );
//      -webkit-background-clip: text;
//      -webkit-text-fill-color: transparent;
//    }
//  }
//}
//.perks {
//  width: 100%;
//  margin-top: 100px;
//  display: flex;
//  justify-content: space-between;
//  @media screen and (max-width: 1360px) {
//    flex-wrap: wrap;
//  }
//  .perk:nth-child(2n) {
//    //margin-top: -160px;
//    justify-content: flex-start;
//    padding-bottom: 0;
//    .perk__content {
//      order: 1;
//    }
//    .perk__img {
//      order: 2;
//      bottom: -106px;
//      top: auto;
//    }
//  }
//}

//.wrapper {
//  //padding-left: 43px;
//  padding-top: 120px;
//  width: 100%;
//  max-width: 1361px;
//  margin: 0 auto;
//  @media screen and (max-width: 771px) {
//    padding-top: 93px;
//    padding-left: 15.5px;
//  }
//  @media screen and (max-width: 768px) {
//    margin: auto;
//    align-items: flex-start;
//    //align-items: flex-start;
//  }
//}
//.perks {
//  flex-wrap: wrap;
//  //@media screen and (max-width: 768px) {
//  //  flex-direction: column;
//  //  .perk {
//  //    display: flex;
//  //    flex-direction: row;
//  //  }
//  //  .perk__img:before {
//  //    left: 145px;
//  //    right: -194px;
//  //    top: 0;
//  //    bottom: 0;
//  //  }
//  //}
//}
//.perk {
//  width: 100%;
//  position: relative;
//  max-width: 290px;
//  padding-bottom: 208px;
//  margin: 50px 25px;
//  border-radius: 32px;
//  background: radial-gradient(
//    113.12% 113.12% at 50.52% 50.52%,
//    #292929 0%,
//    #000000 100%
//  );
//  &__img {
//    position: absolute;
//    top: 0px;
//
//    //&::before {
//    //  content: "";
//    //  position: absolute;
//    //  background: radial-gradient(
//    //    113.12% 113.12% at 50.52% 50.52%,
//    //    #292929 0%,
//    //    #000000 100%
//    //  );
//    //  inset: 0;
//    //  z-index: -1;
//    //  top: 145px;
//    //
//    //  bottom: -194px;
//    //  background-size: cover;
//    //  border-radius: 34px;
//    //}
//  }
//  &__content {
//    width: 100%;
//    max-width: 220px;
//    position: relative;
//    display: flex;
//    flex-direction: column;
//    padding-left: 34px;
//    padding-bottom: 28px;
//    &__name {
//      position: relative;
//      font-weight: 800;
//      font-size: 32px;
//      line-height: 110%;
//      padding-top: 27px;
//      &::after {
//        position: absolute;
//        content: "";
//        width: 100%;
//        max-width: 145px;
//        height: 2px;
//        background: linear-gradient(
//          307.82deg,
//          #81ff81 -7.19%,
//          #fbfef9 32.88%,
//          #ff8bec 48.41%,
//          #ffffff 75.25%,
//          #3854ff 109.05%
//        );
//        bottom: -6px;
//        left: 0;
//      }
//    }
//    &__desc {
//      font-weight: 500;
//      padding-top: 27px;
//      font-size: 20px;
//      line-height: 18px;
//      font-family: Avenir, sans-serif;
//      padding-bottom: 10px;
//    }
//    &__action {
//      font-weight: 800;
//      font-size: 20px;
//      line-height: 120%;
//      background: linear-gradient(
//        307.82deg,
//        #81ff81 -7.19%,
//        #fbfef9 32.88%,
//        #ff8bec 48.41%,
//        #ffffff 75.25%,
//        #3854ff 109.05%
//      );
//      -webkit-background-clip: text;
//      -webkit-text-fill-color: transparent;
//    }
//  }
//}
//.perk:nth-child(2n) {
//  display: flex;
//  flex-direction: column;
//  padding-bottom: 208px;
//  .perk__img {
//    order: 2;
//    bottom: -106px;
//    top: auto;
//    &::before {
//      top: -170px;
//      bottom: 145px;
//    }
//  }
//  .perk__content {
//    order: 1;
//    &__desc {
//      order: 2;
//      font-weight: 800;
//      font-size: 20px;
//      line-height: 120%;
//      background: linear-gradient(
//        307.82deg,
//        #81ff81 -7.19%,
//        #fbfef9 32.88%,
//        #ff8bec 48.41%,
//        #ffffff 75.25%,
//        #3854ff 109.05%
//      );
//      -webkit-background-clip: text;
//      -webkit-text-fill-color: transparent;
//      padding: 0;
//    }
//    &__action {
//      order: 1;
//      font-weight: 500;
//      padding-top: 27px;
//      font-size: 20px;
//      line-height: 18px;
//      font-family: Avenir, sans-serif;
//      padding-bottom: 10px;
//      background: none;
//      -webkit-text-fill-color: white;
//    }
//  }
//}
//.perks {
//  @media screen and (max-width: 768px) {
//    width: 100%;
//    flex-direction: column;
//    align-items: flex-start;
//    .perk {
//      display: flex;
//      flex-direction: row;
//    }
//    .perk__img:before {
//      left: 145px;
//      right: -194px;
//      top: 0;
//      bottom: 0;
//    }
//    .perk {
//      margin-left: 0;
//    }
//    .perk:nth-child(2n) {
//      display: flex;
//      flex-direction: row;
//      margin-left: auto;
//      .perk__img {
//        order: 2;
//        &::before {
//          top: 0px;
//          bottom: 0px;
//          right: 145px;
//          left: -194px;
//        }
//      }
//      .perk__content {
//        order: 1;
//        &__desc {
//          order: 2;
//          font-weight: 800;
//          font-size: 20px;
//          line-height: 120%;
//          background: linear-gradient(
//            307.82deg,
//            #81ff81 -7.19%,
//            #fbfef9 32.88%,
//            #ff8bec 48.41%,
//            #ffffff 75.25%,
//            #3854ff 109.05%
//          );
//          -webkit-background-clip: text;
//          -webkit-text-fill-color: transparent;
//          padding: 0;
//        }
//        &__action {
//          order: 1;
//          font-weight: 500;
//          padding-top: 27px;
//          font-size: 20px;
//          line-height: 18px;
//          font-family: Avenir, sans-serif;
//          padding-bottom: 10px;
//          background: none;
//          -webkit-text-fill-color: white;
//        }
//      }
//    }
//  }
//}
</style>
