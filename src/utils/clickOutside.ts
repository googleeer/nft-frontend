import { DirectiveBinding } from "vue";

interface Element extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void;
}

export const clickOutside = {
  beforeMount: (el: Element, binding: DirectiveBinding) => {
    console.log(el);
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    setTimeout(
      () => document.addEventListener("click", el.clickOutsideEvent),
      binding.arg ? +binding.arg : 0,
    );
  },
  unmounted: (el: Element) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
