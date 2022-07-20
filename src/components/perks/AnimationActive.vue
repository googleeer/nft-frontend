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
    <div>
      <!--      <svg fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <rect x="1%" y="0" width="60" height="40" />-->
      <!--        <rect x="5%" y="0" width="60" height="40" />-->
      <!--        <rect x="10%" y="0" width="50" height="43" />-->
      <!--        <rect x="15%" y="0" width="50" height="43" />-->
      <!--        <rect x="20%" y="0" width="60" height="40" />-->
      <!--        <rect x="25%" y="0" width="50" height="43" />-->
      <!--        <rect x="30%" y="0" width="60" height="40" />-->
      <!--        <rect x="35%" y="0" width="50" height="43" />-->
      <!--        <rect x="40%" y="0" width="50" height="43" />-->
      <!--        <rect x="45%" y="0" width="60" height="40" />-->
      <!--        <rect x="50%" y="0" width="60" height="40" />-->
      <!--        <rect x="55%" y="0" width="50" height="43" />-->
      <!--        <rect x="60%" y="0" width="60" height="40" />-->
      <!--        <rect x="65%" y="0" width="60" height="40" />-->
      <!--        <rect x="70%" y="0" width="60" height="40" />-->
      <!--        <rect x="75%" y="0" width="60" height="40" />-->
      <!--        <rect x="80%" y="0" width="60" height="40" />-->
      <!--        <rect x="85%" y="0" width="60" height="40" />-->
      <!--        <rect x="90%" y="0" width="60" height="40" />-->
      <!--        <rect x="95%" y="0" width="60" height="40" />-->
      <!--        <rect x="100%" y="0" width="60" height="40" />-->
      <!--      </svg>-->
    </div>
  </div>
  <div class="test">
    <div :class="'confetti-' + i" v-for="i of 290" :key="i"></div>
    <div class="qwe">
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
.qwe {
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

.test {
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

.animation {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 3;
  svg {
    height: 100vh;
    width: 100%;
    .main {
      width: 100%;
      transition: transform 2s ease, opacity 4s ease;
      transform: translateY(110%);
      opacity: 1;
      .group1 {
        transition: all 1.5s ease;
      }
    }
    &:hover {
      .main {
        //opacity: 0;
        .group1 {
          width: 100%;
          //transform: translate(-30%, -30%);
        }
        transform: translateY(0%);
        //.g7 {
        //  transform: translate(-10%, -30%);
        //}
        //.g56 {
        //  transform: translate(-10%, -30%);
        //}
        //.g36 {
        //  transform: translate(-30%, -30%);
        //}
        //.st97 {
        //  transform: translate(-28%, -24%);
        //}
        //.g35 {
        //  transform: translate(-30%, -35%);
        //}
        //.g157 {
        //  transform: translate(-30%, -10%);
        //}
        //.g156 {
        //  transform: translate(-30%, -11%);
        //}
        //.g155 {
        //  transform: translate(-30%, -12%);
        //}
        //.g154 {
        //  transform: translate(-13%, -13%);
        //}
        //.g153 {
        //  transform: translate(-14%, -14%);
        //}
        //.g158 {
        //  transform: translate(-15%, -15%);
        //}
        //.g43 {
        //  width: 100%;
        //  transform: translate(-20%, -30%);
        //}
      }
      .g192 {
        transform: translate(-30%, -35%);
      }
    }
  }
}
.animation {
  .st0 {
    fill: url(#SVGID_1_);
  }
  .st1 {
    fill: url(#SVGID_2_);
  }
  .st2 {
    fill: url(#SVGID_3_);
  }
  .st3 {
    fill: url(#SVGID_4_);
  }
  .st4 {
    fill: url(#SVGID_5_);
  }
  .st5 {
    fill: url(#SVGID_6_);
  }
  .st6 {
    fill: url(#SVGID_7_);
  }
  .st7 {
    fill: url(#SVGID_8_);
  }
  .st8 {
    fill: url(#SVGID_9_);
  }
  .st9 {
    fill: url(#SVGID_10_);
  }
  .st10 {
    fill: url(#SVGID_11_);
  }
  .st11 {
    fill: url(#SVGID_12_);
  }
  .st12 {
    fill: url(#SVGID_13_);
  }
  .st13 {
    fill: url(#SVGID_14_);
  }
  .st14 {
    fill: url(#SVGID_15_);
  }
  .st15 {
    fill: url(#SVGID_16_);
  }
  .st16 {
    fill: url(#SVGID_17_);
  }
  .st17 {
    fill: url(#SVGID_18_);
  }
  .st18 {
    fill: url(#SVGID_19_);
  }
  .st19 {
    fill: url(#SVGID_20_);
  }
  .st20 {
    fill: url(#SVGID_21_);
  }
  .st21 {
    fill: url(#SVGID_22_);
  }
  .st22 {
    fill: url(#SVGID_23_);
  }
  .st23 {
    fill: url(#SVGID_24_);
  }
  .st24 {
    fill: url(#SVGID_25_);
  }
  .st25 {
    fill: url(#SVGID_26_);
  }
  .st26 {
    fill: url(#SVGID_27_);
  }
  .st27 {
    fill: url(#SVGID_28_);
  }
  .st28 {
    fill: url(#SVGID_29_);
  }
  .st29 {
    fill: url(#SVGID_30_);
  }
  .st30 {
    fill: url(#SVGID_31_);
  }
  .st31 {
    fill: url(#SVGID_32_);
  }
  .st32 {
    fill: url(#SVGID_33_);
  }
  .st33 {
    fill: url(#SVGID_34_);
  }
  .st34 {
    fill: url(#SVGID_35_);
  }
  .st35 {
    fill: url(#SVGID_36_);
  }
  .st36 {
    fill: url(#SVGID_37_);
  }
  .st37 {
    fill: url(#SVGID_38_);
  }
  .st38 {
    fill: url(#SVGID_39_);
  }
  .st39 {
    fill: url(#SVGID_40_);
  }
  .st40 {
    fill: url(#SVGID_41_);
  }
  .st41 {
    fill: url(#SVGID_42_);
  }
  .st42 {
    fill: url(#SVGID_43_);
  }
  .st43 {
    fill: url(#SVGID_44_);
  }
  .st44 {
    fill: url(#SVGID_45_);
  }
  .st45 {
    fill: url(#SVGID_46_);
  }
  .st46 {
    fill: url(#SVGID_47_);
  }
  .st47 {
    fill: url(#SVGID_48_);
  }
  .st48 {
    fill: url(#SVGID_49_);
  }
  .st49 {
    fill: url(#SVGID_50_);
  }
  .st50 {
    fill: url(#SVGID_51_);
  }
  .st51 {
    fill: url(#SVGID_52_);
  }
  .st52 {
    fill: url(#SVGID_53_);
  }
  .st53 {
    fill: url(#SVGID_54_);
  }
  .st54 {
    fill: url(#SVGID_55_);
  }
  .st55 {
    fill: url(#SVGID_56_);
  }
  .st56 {
    fill: url(#SVGID_57_);
  }
  .st57 {
    fill: url(#SVGID_58_);
  }
  .st58 {
    fill: url(#SVGID_59_);
  }
  .st59 {
    fill: url(#SVGID_60_);
  }
  .st60 {
    fill: url(#SVGID_61_);
  }
  .st61 {
    fill: url(#SVGID_62_);
  }
  .st62 {
    fill: url(#SVGID_63_);
  }
  .st63 {
    fill: url(#SVGID_64_);
  }
  .st64 {
    fill: url(#SVGID_65_);
  }
  .st65 {
    fill: url(#SVGID_66_);
  }
  .st66 {
    fill: url(#SVGID_67_);
  }
  .st67 {
    fill: url(#SVGID_68_);
  }
  .st68 {
    fill: url(#SVGID_69_);
  }
  .st69 {
    fill: url(#SVGID_70_);
  }
  .st70 {
    fill: url(#SVGID_71_);
  }
  .st71 {
    fill: url(#SVGID_72_);
  }
  .st72 {
    fill: url(#SVGID_73_);
  }
  .st73 {
    fill: url(#SVGID_74_);
  }
  .st74 {
    fill: url(#SVGID_75_);
  }
  .st75 {
    fill: url(#SVGID_76_);
  }
  .st76 {
    fill: url(#SVGID_77_);
  }
  .st77 {
    fill: url(#SVGID_78_);
  }
  .st78 {
    fill: url(#SVGID_79_);
  }
  .st79 {
    fill: url(#SVGID_80_);
  }
  .st80 {
    fill: url(#SVGID_81_);
  }
  .st81 {
    fill: url(#SVGID_82_);
  }
  .st82 {
    fill: url(#SVGID_83_);
  }
  .st83 {
    fill: url(#SVGID_84_);
  }
  .st84 {
    fill: url(#SVGID_85_);
  }
  .st85 {
    fill: url(#SVGID_86_);
  }
  .st86 {
    fill: url(#SVGID_87_);
  }
  .st87 {
    fill: url(#SVGID_88_);
  }
  .st88 {
    fill: url(#SVGID_89_);
  }
  .st89 {
    fill: url(#SVGID_90_);
  }
  .st90 {
    fill: url(#SVGID_91_);
  }
  .st91 {
    fill: url(#SVGID_92_);
  }
  .st92 {
    fill: url(#SVGID_93_);
  }
  .st93 {
    fill: url(#SVGID_94_);
  }
  .st94 {
    fill: url(#SVGID_95_);
  }
  .st95 {
    fill: url(#SVGID_96_);
  }
  .st96 {
    fill: url(#SVGID_97_);
  }
  .st97 {
    fill: url(#SVGID_98_);
  }
  .st98 {
    fill: url(#SVGID_99_);
  }
  .st99 {
    fill: url(#SVGID_100_);
  }
  .st100 {
    fill: url(#SVGID_101_);
  }
  .st101 {
    fill: url(#SVGID_102_);
  }
  .st102 {
    fill: url(#SVGID_103_);
  }
  .st103 {
    fill: url(#SVGID_104_);
  }
  .st104 {
    fill: url(#SVGID_105_);
  }
  .st105 {
    fill: url(#SVGID_106_);
  }
  .st106 {
    fill: url(#SVGID_107_);
  }
  .st107 {
    fill: url(#SVGID_108_);
  }
  .st108 {
    fill: url(#SVGID_109_);
  }
  .st109 {
    fill: url(#SVGID_110_);
  }
  .st110 {
    fill: url(#SVGID_111_);
  }
  .st111 {
    fill: url(#SVGID_112_);
  }
  .st112 {
    fill: url(#SVGID_113_);
  }
  .st113 {
    fill: url(#SVGID_114_);
  }
  .st114 {
    fill: url(#SVGID_115_);
  }
  .st115 {
    fill: url(#SVGID_116_);
  }
  .st116 {
    fill: url(#SVGID_117_);
  }
  .st117 {
    fill: url(#SVGID_118_);
  }
  .st118 {
    fill: url(#SVGID_119_);
  }
  .st119 {
    fill: url(#SVGID_120_);
  }
  .st120 {
    fill: url(#SVGID_121_);
  }
  .st121 {
    fill: url(#SVGID_122_);
  }
  .st122 {
    fill: url(#SVGID_123_);
  }
  .st123 {
    fill: url(#SVGID_124_);
  }
  .st124 {
    fill: url(#SVGID_125_);
  }
  .st125 {
    fill: url(#SVGID_126_);
  }
  .st126 {
    fill: url(#SVGID_127_);
  }
  .st127 {
    fill: url(#SVGID_128_);
  }
  .st128 {
    fill: url(#SVGID_129_);
  }
  .st129 {
    fill: url(#SVGID_130_);
  }
  .st130 {
    fill: url(#SVGID_131_);
  }
  .st131 {
    fill: url(#SVGID_132_);
  }
  .st132 {
    fill: url(#SVGID_133_);
  }
  .st133 {
    fill: url(#SVGID_134_);
  }
  .st134 {
    fill: url(#SVGID_135_);
  }
  .st135 {
    fill: url(#SVGID_136_);
  }
  .st136 {
    fill: url(#SVGID_137_);
  }
  .st137 {
    fill: url(#SVGID_138_);
  }
  .st138 {
    fill: url(#SVGID_139_);
  }
  .st139 {
    fill: url(#SVGID_140_);
  }
  .st140 {
    fill: url(#SVGID_141_);
  }
  .st141 {
    fill: url(#SVGID_142_);
  }
  .st142 {
    fill: url(#SVGID_143_);
  }
  .st143 {
    fill: url(#SVGID_144_);
  }
  .st144 {
    fill: url(#SVGID_145_);
  }
  .st145 {
    fill: url(#SVGID_146_);
  }
  .st146 {
    fill: url(#SVGID_147_);
  }
  .st147 {
    fill: url(#SVGID_148_);
  }
  .st148 {
    fill: url(#SVGID_149_);
  }
  .st149 {
    fill: url(#SVGID_150_);
  }
  .st150 {
    fill: url(#SVGID_151_);
  }
  .st151 {
    fill: url(#SVGID_152_);
  }
  .st152 {
    fill: url(#SVGID_153_);
  }
  .st153 {
    fill: url(#SVGID_154_);
  }
  .st154 {
    fill: url(#SVGID_155_);
  }
  .st155 {
    fill: url(#SVGID_156_);
  }
  .st156 {
    fill: url(#SVGID_157_);
  }
  .st157 {
    fill: url(#SVGID_158_);
  }
  .st158 {
    fill: url(#SVGID_159_);
  }
  .st159 {
    fill: url(#SVGID_160_);
  }
  .st160 {
    fill: url(#SVGID_161_);
  }
  .st161 {
    fill: url(#SVGID_162_);
  }
  .st162 {
    fill: url(#SVGID_163_);
  }
  .st163 {
    fill: url(#SVGID_164_);
  }
  .st164 {
    fill: url(#SVGID_165_);
  }
  .st165 {
    fill: url(#SVGID_166_);
  }
  .st166 {
    fill: url(#SVGID_167_);
  }
  .st167 {
    fill: url(#SVGID_168_);
  }
  .st168 {
    fill: url(#SVGID_169_);
  }
  .st169 {
    fill: url(#SVGID_170_);
  }
  .st170 {
    fill: url(#SVGID_171_);
  }
  .st171 {
    fill: url(#SVGID_172_);
  }
  .st172 {
    fill: url(#SVGID_173_);
  }
  .st173 {
    fill: url(#SVGID_174_);
  }
  .st174 {
    fill: url(#SVGID_175_);
  }
  .st175 {
    fill: url(#SVGID_176_);
  }
  .st176 {
    fill: url(#SVGID_177_);
  }
  .st177 {
    fill: url(#SVGID_178_);
  }
  .st178 {
    fill: url(#SVGID_179_);
  }
  .st179 {
    fill: url(#SVGID_180_);
  }
  .st180 {
    fill: url(#SVGID_181_);
  }
  .st181 {
    fill: url(#SVGID_182_);
  }
  .st182 {
    fill: url(#SVGID_183_);
  }
  .st183 {
    fill: url(#SVGID_184_);
  }
  .st184 {
    fill: url(#SVGID_185_);
  }
  .st185 {
    fill: url(#SVGID_186_);
  }
  .st186 {
    fill: url(#SVGID_187_);
  }
  .st187 {
    fill: url(#SVGID_188_);
  }
  .st188 {
    fill: url(#SVGID_189_);
  }
  .st189 {
    fill: url(#SVGID_190_);
  }
  .st190 {
    fill: url(#SVGID_191_);
  }
  .st191 {
    fill: url(#SVGID_192_);
  }
  .st192 {
    fill: url(#SVGID_193_);
  }
  .st193 {
    fill: url(#SVGID_194_);
  }
  .st194 {
    fill: url(#SVGID_195_);
  }
  .st195 {
    fill: url(#SVGID_196_);
  }
  .st196 {
    fill: url(#SVGID_197_);
  }
  .st197 {
    fill: url(#SVGID_198_);
  }
  .st198 {
    fill: url(#SVGID_199_);
  }
  .st199 {
    fill: url(#SVGID_200_);
  }
  .st200 {
    fill: url(#SVGID_201_);
  }
  .st201 {
    fill: url(#SVGID_202_);
  }
  .st202 {
    fill: url(#SVGID_203_);
  }
  .st203 {
    fill: url(#SVGID_204_);
  }
  .st204 {
    fill: url(#SVGID_205_);
  }
  .st205 {
    fill: url(#SVGID_206_);
  }
  .st206 {
    fill: url(#SVGID_207_);
  }
  .st207 {
    fill: url(#SVGID_208_);
  }
  .st208 {
    fill: url(#SVGID_209_);
  }
  .st209 {
    fill: url(#SVGID_210_);
  }
}
svg {
}
rect {
  opacity: 0;
}
rect:nth-child(1) {
  transform-origin: 1% 5px;
  transform: rotate(-145deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 100ms;
  animation-duration: 1500ms;
}
rect:nth-child(2) {
  transform-origin: 5% 5px;
  transform: rotate(164deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 300ms;
  animation-duration: 1550ms;
}
rect:nth-child(3) {
  transform-origin: 10% 6px;
  transform: rotate(4deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 200ms;
  animation-duration: 1500ms;
}
rect:nth-child(4) {
  transform-origin: 15% 6px;
  transform: rotate(-175deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 200ms;
  animation-duration: 1700ms;
}
rect:nth-child(5) {
  transform-origin: 20% 5px;
  transform: rotate(-97deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 100ms;
  animation-duration: 1650ms;
}
rect:nth-child(6) {
  transform-origin: 25% 6px;
  transform: rotate(57deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 300ms;
  animation-duration: 1600ms;
}
rect:nth-child(7) {
  transform-origin: 30% 5px;
  transform: rotate(-46deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 131ms;
  animation-duration: 1800ms;
}
rect:nth-child(8) {
  transform-origin: 35% 6px;
  transform: rotate(-65deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 85ms;
  animation-duration: 1850ms;
}
rect:nth-child(9) {
  transform-origin: 40% 6px;
  transform: rotate(13deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 128ms;
  animation-duration: 1900ms;
}
rect:nth-child(10) {
  transform-origin: 45% 5px;
  transform: rotate(176deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 311ms;
  animation-duration: 1950ms;
}
rect:nth-child(11) {
  transform-origin: 50% 5px;
  transform: rotate(108deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 108ms;
  animation-duration: 2000ms;
}
rect:nth-child(12) {
  transform-origin: 55% 6px;
  transform: rotate(62deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 105ms;
  animation-duration: 2050ms;
}
rect:nth-child(13) {
  transform-origin: 60% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 149ms;
  animation-duration: 2100ms;
}
rect:nth-child(14) {
  transform-origin: 65% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 170ms;
  animation-duration: 2150ms;
}
rect:nth-child(15) {
  transform-origin: 70% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 126ms;
  animation-duration: 2200ms;
}
rect:nth-child(16) {
  transform-origin: 75% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 148ms;
  animation-duration: 2250ms;
}
rect:nth-child(17) {
  transform-origin: 80% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 200ms;
  animation-duration: 2300ms;
}
rect:nth-child(18) {
  transform-origin: 85% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 210ms;
  animation-duration: 2350ms;
}
rect:nth-child(19) {
  transform-origin: 90% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 120ms;
  animation-duration: 2400ms;
}
rect:nth-child(20) {
  transform-origin: 95% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 60ms;
  animation-duration: 2450ms;
}
rect:nth-child(21) {
  transform-origin: 100% 5px;
  transform: rotate(16deg);
  animation: blast 700ms infinite ease-out;
  animation-delay: 246ms;
  animation-duration: 2500ms;
}

rect:nth-child(odd) {
  fill: #65bb5c;
}
rect:nth-child(even) {
  z-index: 1;
  fill: #33aaff;
}
rect:nth-child(4n) {
  animation-duration: 2400ms;
  fill: #f23b14;
}
rect:nth-child(3n) {
  animation-duration: 2750ms;
  //animation-delay: 700ms;
}
rect:nth-child(4n-7) {
  fill: #2a2f6a;
}
rect:nth-child(6n) {
  fill: #fbba23;
}

@keyframes blast {
  from {
    opacity: 0;
    transform: translateY(100%);
    //percentage(random() * (80 - 40) + 40);
  }
  20% {
    opacity: 1;
  }
  to {
  }
  @for $i from 0 through 80 {
    from {
      x: random() + 0%;
    }
  }
}
@keyframes action {
  from {
    x: 100%;
  }
  20% {
  }
  to {
    x: 10%;
  }
}
</style>
