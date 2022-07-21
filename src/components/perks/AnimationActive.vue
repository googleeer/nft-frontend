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
    <div :class="'confettia-' + i" v-for="i of 35" :key="'a' + i"></div>
    <div :class="'confettib-' + i" v-for="i of 35" :key="'b' + i"></div>
    <div :class="'confettic-' + i" v-for="i of 35" :key="'c' + i"></div>
    <div :class="'confettid-' + i" v-for="i of 35" :key="'d' + i"></div>
    <div :class="'confettie-' + i" v-for="i of 35" :key="i"></div>
    <div :class="'confettif-' + i" v-for="i of 35" :key="i"></div>
    <div :class="'confettig-' + i" v-for="i of 35" :key="i"></div>
    <div :class="'confettih-' + i" v-for="i of 35" :key="i"></div>
  </div>
</template>

<style lang="scss" scoped>
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

  [class^="confetti"] {
    position: absolute;
  }

  $colors: (
    linear-gradient(
      89.99deg,
      #fcfff9 9.64%,
      #e9eef7 44.04%,
      #d5e7f0 61.4%,
      #c1d8ef 95.53%
    ),
    #ffbf00,
    #263672
  );

  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettia-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropa-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (0.5 - 0) + 0+"s");
    }

    @keyframes dropa-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(4)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0;
        opacity: 0.3;
      }
    }
  }
  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettib-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropb-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (1 - 0.5) + 0.5+"s");
    }

    @keyframes dropb-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }
  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettic-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropc-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (1.5 - 1) + 1+"s");
    }

    @keyframes dropc-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }
  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettid-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropd-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (2 - 1.5) + 1.5+"s");
    }

    @keyframes dropd-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }

  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettie-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: drope-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (2.5 - 2) + 2+"s");
    }

    @keyframes drope-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }

  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettif-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropf-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (3 - 2.5) + 2.5+"s");
    }

    @keyframes dropf-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }
  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettih-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: droph-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (3.5 - 3) + 3+"s");
    }

    @keyframes droph-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }
  @for $i from 1 through 35 {
    $w: random(40);
    $l: random(100);
    .confettig-#{$i} {
      width: #{$w}px;
      height: #{$w * 0.4}px;
      background: nth($colors, random(3));
      top: 110%;
      left: unquote($l + "%");
      opacity: random() + 0.5;
      transform: rotate(#{random() * 360}deg);
      animation: dropg-#{$i}
        unquote(4 + random() + "s")
        unquote(random() + "s")
        infinite;
      animation-delay: unquote(random() * (4 - 3.5) + 3.5+"s");
    }

    @keyframes dropg-#{$i} {
      from {
        bottom: 0;
        opacity: 1;
        transform: rotate(#{random(5)}deg);
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
      }

      100% {
        //top: -1%;
        left: unquote($l + random(4) + "%");
        right: unquote($l + random(4) + "%");
        top: 0%;
        opacity: 0.3;
      }
    }
  }
}
</style>
