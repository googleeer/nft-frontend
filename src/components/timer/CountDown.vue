<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import moment from "moment-timezone";

export default defineComponent({
  name: "PerkView",
  props: { endDate: String },
  setup(props, context) {
    const timeObj = ref<Record<string, string>>({
      dd: "00",
      hh: "00",
      mm: "00",
      ss: "00",
    });
    const interval = ref(0);

    const endingDate = moment(props?.endDate).tz("America/Los_Angeles");

    const utcOffset = endingDate.utcOffset() * 60 * 1000;
    const formattedEndingDate = endingDate.format();

    const startInterval = () => {
      interval.value = setInterval(() => {
        const diff = moment(new Date().toUTCString()).diff(formattedEndingDate);

        const duration = moment.duration(diff).asMilliseconds();
        const durationWithTimezone = duration + utcOffset;
        const endTime = Math.abs(durationWithTimezone);
        const seconds = Math.floor((endTime / 1000) % 60);
        const minutes = Math.floor((endTime / 1000 / 60) % 60);
        const hours = Math.floor((endTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(endTime / (1000 * 60 * 60 * 24));
        timeObj.value.ss = seconds < 10 ? "0" + seconds : seconds.toString();
        timeObj.value.mm = minutes < 10 ? "0" + minutes : minutes.toString();
        timeObj.value.hh = hours < 10 ? "0" + hours : hours.toString();
        timeObj.value.dd = days < 10 ? "0" + days : days.toString();

        if (durationWithTimezone >= 0) {
          context.emit("auctionInactive", true);
          clearInterval(interval.value);
        }
      }, 1000);
    };

    onMounted(() => {
      startInterval();
    });
    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });

    return {
      timeObj,
    };
  },
});
</script>

<template>
  <div class="timer flex align-center direction-column">
    <div class="timer__title">Auction ending in</div>
    <div class="timer__time flex justify-between">
      <div class="timer__time--day flex direction-column">
        <p class="timer__time--count">{{ timeObj.dd }}</p>
        <p class="timer__time--title">Days</p>
      </div>
      <img class="dot" src="../../assets/images/dots.svg" />

      <div class="timer__time--hrs flex direction-column">
        <p class="timer__time--count">{{ timeObj.hh }}</p>
        <p class="timer__time--title">Hrs</p>
      </div>
      <img class="dot" src="../../assets/images/dots.svg" />
      <div class="timer__time--hrs flex direction-column">
        <p class="timer__time--count">
          {{ timeObj.mm }}
        </p>
        <p class="timer__time--title">Mins</p>
      </div>
      <img class="dot" src="../../assets/images/dots.svg" />
      <div class="timer__time--hrs flex direction-column">
        <p class="timer__time--count">
          {{ timeObj.ss }}
        </p>
        <p class="timer__time--title">Secs</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dot {
  height: 40px;
  width: 5px;
}
.timer {
  width: 100%;
  position: relative;
  max-width: 328px;
  margin: 75px 0 0px;
  background: radial-gradient(
    113.12% 113.12% at 50.52% 50.52%,
    #292929 0%,
    #000000 100%
  );
  border: 1px solid #212121;
  border-radius: 40px;
  &__title {
    width: 100%;
    max-width: 156px;
    position: absolute;
    top: -15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    padding: 8px 18px;
    background-image: url("~@/assets/images/bg-title.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    text-align: center;
    color: var(--color-black);
  }
  &__time {
    width: 100%;
    text-align: center;
    padding: 30px 57px 13px;

    &--count {
      font-size: 24px;
      line-height: 40px;
    }
    &--title {
      font-size: 12px;
      line-height: 24px;
      opacity: 0.65;
    }
    &--hrs {
    }
  }
}
</style>
