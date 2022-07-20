<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "SlotsSvg",
  props: {},
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<template>
  <div class="animation">
    <div :class="'confetti-' + i" v-for="i of 290" :key="i"></div>
    <div class="svg">
      <div :class="'line-' + i" v-for="i of 15" :key="i">
        <svg
          v-if="i % 2 === 0"
          class="q"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 31.86 19.69"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="4531.93"
              y1="-1076.14"
              x2="4547.71"
              y2="-1076.14"
              gradientTransform="translate(2421.05 4011.52) rotate(-107.67)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#f71873" />
              <stop offset="1" stop-color="#f8a629" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="4535.84"
              y1="-1084.68"
              x2="4542.03"
              y2="-1092.71"
              gradientTransform="translate(2421.05 4011.52) rotate(-107.67)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#f71873" />
              <stop offset="1" stop-color="#c6211b" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-3"
              x1="4533.53"
              y1="-1079.71"
              x2="4543.18"
              y2="-1081.83"
              xlink:href="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-4"
              x1="4536.65"
              y1="-1066.13"
              x2="4536.67"
              y2="-1066.13"
              gradientTransform="translate(2421.05 4011.52) rotate(-107.67)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#640008" />
              <stop offset="0.01" stop-color="#6d010a" />
              <stop offset="0.02" stop-color="#900411" />
              <stop offset="0.03" stop-color="#ae0617" />
              <stop offset="0.04" stop-color="#c4081b" />
              <stop offset="0.06" stop-color="#d4091e" />
              <stop offset="0.07" stop-color="#de0a20" />
              <stop offset="0.09" stop-color="#e10a21" />
              <stop offset="0.15" stop-color="#a30718" />
              <stop offset="0.23" stop-color="#52040c" />
              <stop offset="0.3" stop-color="#820613" />
              <stop offset="0.37" stop-color="#ab0819" />
              <stop offset="0.44" stop-color="#c9091d" />
              <stop offset="0.5" stop-color="#db0a20" />
              <stop offset="0.54" stop-color="#e10a21" />
              <stop offset="0.77" stop-color="#62040e" />
              <stop offset="0.77" stop-color="#66040f" />
              <stop offset="0.81" stop-color="#9a0716" />
              <stop offset="0.85" stop-color="#c1081c" />
              <stop offset="0.88" stop-color="#d80a20" />
              <stop offset="0.89" stop-color="#e10a21" />
              <stop offset="0.91" stop-color="#de0a20" />
              <stop offset="0.93" stop-color="#d3091e" />
              <stop offset="0.95" stop-color="#c1071b" />
              <stop offset="0.97" stop-color="#a80516" />
              <stop offset="0.99" stop-color="#88030f" />
              <stop offset="1" stop-color="#640008" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-5"
              x1="4532.52"
              y1="-1067.52"
              x2="4547.42"
              y2="-1071.02"
              xlink:href="#linear-gradient-2"
            />
          </defs>
          <title>Asset 21</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="BACKGROUND">
              <path
                class="cls-1"
                d="M28.4,1.16a4.49,4.49,0,0,0-.78,3.19c0,1.53.11,3.06.17,4.59s.13,3.05.13,4.58v.22c-.31-.54-.57-1.1-.84-1.66a68.69,68.69,0,0,0-3.37-6.2c-.3-.48-.61-1-.92-1.44a3.32,3.32,0,0,0-.92-1.11.86.86,0,0,0-.59-.07,11.67,11.67,0,0,0-2.09.62,4.71,4.71,0,0,0-1.36.64,1.2,1.2,0,0,0-.32.62,30.28,30.28,0,0,0-.82,6.36c-.08,1.34-.13,2.67-.24,4,0,.35-.06.71-.1,1.06a14.34,14.34,0,0,1-1.52-2.48,11.52,11.52,0,0,0-1.78-2.67,1.61,1.61,0,0,0-1.14-.55,4.87,4.87,0,0,0-1.46.35c-.46.14-.91.3-1.35.47a4.1,4.1,0,0,0-.87.42,1.36,1.36,0,0,0-.41,1.08c-.05.6-.06,1.2-.05,1.81s.11,1.48.2,2.21c-.49-.43-1-.89-1.48-1.3a4.5,4.5,0,0,0-3-1.11,8.56,8.56,0,0,0-2.21.62,10,10,0,0,0-1,.43s-.37.2-.14.19c1.44-.12,2.64.82,3.69,1.74a15.8,15.8,0,0,0,1.79,1.48,2.52,2.52,0,0,0,2,.39.88.88,0,0,0,.37-.08,14.42,14.42,0,0,0,2.66-.92,1.93,1.93,0,0,0,.9-.66c.39-.63.06-1.55,0-2.24,0-.11,0-.21,0-.32.27.5.53,1,.83,1.47A6.41,6.41,0,0,0,14.16,19a2.32,2.32,0,0,0,1.21.42A5.43,5.43,0,0,0,16.84,19a8.53,8.53,0,0,0,2.22-.89,1.51,1.51,0,0,0,.57-1c.11-.54.17-1.09.23-1.64.12-1.06.19-2.14.25-3.21.08-1.6.15-3.2.31-4.79.47.77.92,1.54,1.35,2.32.58,1,1.12,2.1,1.63,3.17a27.6,27.6,0,0,0,1.39,2.64,5.83,5.83,0,0,0,2,2,.94.94,0,0,0,.66.08,12,12,0,0,0,2.1-.62c.67-.25,1.43-.44,1.69-1.19a6.18,6.18,0,0,0,.15-1.49c0-.6,0-1.2.05-1.8,0-1.16,0-2.32-.07-3.48-.06-1.66-.15-3.33-.21-5,0-1.31-.23-3,.67-4C32-.06,31.66,0,31.61,0a7.78,7.78,0,0,0-1.08.28c-.46.14-.91.3-1.35.47A2.27,2.27,0,0,0,28.4,1.16Z"
              />
              <path
                class="cls-2"
                d="M10.55,18.64l.12-.06A3.88,3.88,0,0,1,8,17.2c-.49-.43-1-.89-1.48-1.3a4.5,4.5,0,0,0-3-1.11,8.56,8.56,0,0,0-2.21.62,10,10,0,0,0-1,.43s-.37.2-.14.19c1.44-.12,2.64.82,3.69,1.74a15.8,15.8,0,0,0,1.79,1.48,2.52,2.52,0,0,0,2,.39.88.88,0,0,0,.37-.08A14.42,14.42,0,0,0,10.55,18.64Z"
              />
              <path
                class="cls-3"
                d="M16.45,15.5c0,.35-.06.71-.1,1.06a14.34,14.34,0,0,1-1.52-2.48,11.52,11.52,0,0,0-1.78-2.67,1.61,1.61,0,0,0-1.14-.55,4.87,4.87,0,0,0-1.46.35c-.46.14-.91.3-1.35.47a6.71,6.71,0,0,0-.68.3c1.32.31,2.79,3.11,2.79,3.11l.2.47c0-.05,0-.09,0-.14.27.5.53,1,.83,1.47A6.41,6.41,0,0,0,14.16,19a2.32,2.32,0,0,0,1.21.42S16.22,19.33,16.45,15.5Z"
              />
              <path class="cls-4" d="M27.91,12.66h0v0Z" />
              <path
                class="cls-5"
                d="M27.89,13.7c-.29-.53-.55-1.08-.81-1.62a68.69,68.69,0,0,0-3.37-6.2c-.3-.48-.61-1-.92-1.44a3.32,3.32,0,0,0-.92-1.11.86.86,0,0,0-.59-.07,11.67,11.67,0,0,0-2.09.62,4.71,4.71,0,0,0-1.36.64h0l.3,0s1,.16,2.31,3c.47.77.92,1.54,1.35,2.32.58,1,1.12,2.1,1.63,3.17a27.6,27.6,0,0,0,1.39,2.64,5.83,5.83,0,0,0,2,2,.74.74,0,0,0,.35.1C27.26,17.72,27.77,17.44,27.89,13.7Z"
              />
            </g>
          </g>
        </svg>
        <svg
          v-else
          class="m"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 93.18 110"
        >
          <defs>
            <linearGradient
              id="linear-gradient-6"
              x1="-44.39"
              y1="1326.38"
              x2="-5.18"
              y2="1326.38"
              gradientTransform="translate(692.95 -1103.47) rotate(28.19)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#f71873" />
              <stop offset="1" stop-color="#c6211b" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-7"
              x1="-12.15"
              y1="1254.04"
              x2="-8.27"
              y2="1280.15"
              gradientTransform="translate(692.95 -1103.47) rotate(28.19)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#f44274" />
              <stop offset="1" stop-color="#e51f9a" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-8"
              x1="-39.62"
              y1="1348.05"
              x2="-32.04"
              y2="1394.1"
              xlink:href="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-9"
              x1="-32.58"
              y1="1292.48"
              x2="-10.87"
              y2="1323.71"
              xlink:href="#linear-gradient-2"
            />
          </defs>
          <title>Asset 23</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="BACKGROUND">
              <path
                class="cls-6"
                d="M63.53,47.23c-2.69-4.51-5.63-9.08-7.47-14a11.17,11.17,0,0,1-.51-6.78A11.58,11.58,0,0,1,59.08,21a15.27,15.27,0,0,1,2.36-1.79l1.6-.35c1.27-.26,2.56-.49,3.84-.72,6.51-1.17,13.15-3,18.88-6.41,3.67-2.17,7-5.66,7.4-10.11a8.69,8.69,0,0,0,0-1.53c0-.29-4.19,1.17-4.4,1.26a31.18,31.18,0,0,0-3,1.27c-.07,0-1.17.49-1.15.75.39,4.36-2.38,8.23-5.91,10.53l-.22.14-1.15.26c-2.44.52-5.32,1.62-7.77,2.13-3.6.74-6.71,1.15-10.11,2.54a32.82,32.82,0,0,0-7.84,4.29C48,26.05,46,30.26,47,34.84A30.9,30.9,0,0,0,50,41.71c1.3,2.51,2.69,5,4.16,7.38,2,3.27,5,7.85,2.13,11.53l0,.05c-2.41.16-4.86,0-7.28-.05-5.16-.16-10.33-.39-15.46.35a45.94,45.94,0,0,0-9.75,2.69c-3.07,1.19-6.33,2.52-8.71,4.89-3.62,3.6-4.43,9.1-4.49,14-.07,5.12.53,10.31-.92,15.31A20.3,20.3,0,0,1,1,109.24c-.16.11-.33.2-.5.3.07,0-.91.49-.32.46a8.57,8.57,0,0,0,2.05-.52A30,30,0,0,0,8,107.09a22.11,22.11,0,0,0,9.55-10.87c2-4.8,1.58-10,1.5-15.12s.28-10.52,3.48-14.62a11,11,0,0,1,2.07-2,41.28,41.28,0,0,1,5.66-.58c5.17-.25,10.34.19,15.51.2a27.36,27.36,0,0,0,7.32-.92A49.88,49.88,0,0,0,60,60.64a15.09,15.09,0,0,0,3.92-2.29C67.5,55.23,65.54,50.6,63.53,47.23Z"
              />
              <path
                class="cls-7"
                d="M79.08,13.6c-.45.49-.88,1-1.36,1.46-.16.16-.34.31-.51.46a44.08,44.08,0,0,0,8.55-3.84c3.67-2.17,7-5.66,7.4-10.11a8.69,8.69,0,0,0,0-1.53c0-.29-4.19,1.17-4.4,1.26a31.18,31.18,0,0,0-3,1.27c-.07,0-1.17.49-1.15.75C85,7.53,82.43,11.27,79.08,13.6Z"
              />
              <path
                class="cls-8"
                d="M19.06,81.1c-.07-5,.28-10.52,3.48-14.62a11,11,0,0,1,2.07-2l.19,0a14.67,14.67,0,0,1,2.28-1.94c-1.12.35-2.23.75-3.34,1.17-3.07,1.19-6.33,2.52-8.71,4.89-3.62,3.6-4.43,9.1-4.49,14-.07,5.12.53,10.31-.92,15.31A20.3,20.3,0,0,1,1,109.24c-.16.11-.33.2-.5.3.07,0-.91.49-.32.46a8.57,8.57,0,0,0,2.05-.52A30,30,0,0,0,8,107.09a22.11,22.11,0,0,0,9.55-10.87C19.51,91.42,19.14,86.17,19.06,81.1Z"
              />
              <path
                class="cls-9"
                d="M63.53,47.23c-2.69-4.51-5.63-9.08-7.47-14a11.17,11.17,0,0,1-.51-6.78A11.58,11.58,0,0,1,59.08,21,14.77,14.77,0,0,1,61,19.45a9.79,9.79,0,0,0-3.28.21,28.91,28.91,0,0,0-6.11,3.55C48,26.05,46,30.26,47,34.84A30.9,30.9,0,0,0,50,41.71c1.3,2.51,2.69,5,4.16,7.38C56,52.18,58.8,56.44,56.69,60a2,2,0,0,1,.48,1.81c.95-.37,1.89-.77,2.82-1.17a15.09,15.09,0,0,0,3.92-2.29C67.5,55.23,65.54,50.6,63.53,47.23Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.svg {
  position: fixed;
  inset: 0;
  z-index: 3;
  .m,
  .q {
    position: absolute;
    width: 110px;
  }
  [class|="line"] {
    width: 170px;
    position: absolute;
  }

  $colors: (#d13447, #ffbf00, #263672);
  @for $i from 1 through 15 {
    $l: random(100);
    .line-#{$i} {
      top: 110%;
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dr-#{$i}
        unquote(4.5 + random() + "s")
        unquote(random() + "s")
        infinite;
    }

    @keyframes dr-#{$i} {
      from {
        left: unquote(random() * (80 - 20) + 20+"%");
        transform: rotate(10deg);
      }
      100% {
        left: unquote($l + random(15) + "%");
        top: -10%;
      }
    }
  }
}
.cls-6 {
  fill: url(#linear-gradient-6);
}

.cls-7 {
  fill: url(#linear-gradient-7);
}

.cls-8 {
  fill: url(#linear-gradient-8);
}

.cls-9 {
  fill: url(#linear-gradient-9);
}

.cls-1 {
  fill: url(#linear-gradient);
}
.cls-2 {
  fill: url(#linear-gradient-2);
}
.cls-3 {
  fill: url(#linear-gradient-3);
}
.cls-4 {
  fill: url(#linear-gradient-4);
}
.cls-5 {
  fill: url(#linear-gradient-5);
}

.animation {
  position: fixed;
  inset: 0;
  z-index: 3;
  [class|="confetti"] {
    position: absolute;
  }

  $colors: (#d13447, #ffbf00, #263672);

  @for $i from 1 through 290 {
    $w: random(40);
    $l: random(100);
    .confetti-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background-color: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: drop-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
    }

    @keyframes drop-#{$i} {
      from {
        opacity: 1;
        transform: rotate(#{random(4)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");

        opacity: 0.3;
      }
    }
  }
}
</style>
