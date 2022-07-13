import { computed, reactive, ref } from "vue";
import { useAppStateStore } from "@/store/appState.store";

const defaultCubeTransformStyles = "translateX(-50%)";

type Direction = "X" | "Y";
type SwipeEvent = MouseEvent | TouchEvent;
type SwitchFunction = (direction: "prev" | "next") => void;

const targetIsLink = (target: EventTarget | null) => {
  return (target as HTMLElement).tagName === "A";
};

const getCoordinate = (event: SwipeEvent, direction: Direction) => {
  const isY = direction === "Y";
  if ("changedTouches" in event) {
    const touch = event?.changedTouches?.[0];
    return isY ? touch.pageY : touch.pageX;
  } else {
    return isY ? event.pageY : event.pageX;
  }
};

export const useSceneSwipe = (
  direction: Direction,
  onSwitch: SwitchFunction,
) => {
  const appStateStore = useAppStateStore();
  const threshold = computed(() => (appStateStore.isMobile ? 120 : 170));
  const isY = direction === "Y";
  const startPosition = ref<null | number>(null);
  const difference = ref(0);
  const cubeStyles = reactive({
    transform: defaultCubeTransformStyles,
    transformOrigin: "top",
  });

  const onSwipeStart = (event: SwipeEvent) => {
    if (targetIsLink(event.target) || wheelStarted.value) return;
    startPosition.value = getCoordinate(event, direction);
  };
  const onSwipeEnd = () => {
    difference.value = 0;
    cubeStyles.transform = defaultCubeTransformStyles;
    startPosition.value = null;
  };

  const onSwipeMove = (event: SwipeEvent) => {
    if (!startPosition.value) return;
    const currentCoordinate = getCoordinate(event, direction);
    const toPrev = currentCoordinate < startPosition.value;
    difference.value = currentCoordinate - startPosition.value;

    if (isY) {
      const part = Math.abs(difference.value) / threshold.value / 5;

      cubeStyles.transform = `translateX(-50%) translateY(${
        difference.value / 10
      }px) scale(${1 - part})`;
      cubeStyles.transformOrigin = toPrev ? "top" : "bottom";
    }

    if (Math.abs(difference.value) >= threshold.value) {
      onSwitch(toPrev ? "prev" : "next");
      onSwipeEnd();
    }
  };

  const wheelStarted = ref(false);
  const wheelDirection = ref("");

  const onWheel = (event: WheelEvent) => {
    const delta = event[isY ? "deltaY" : "deltaX"];
    if (wheelStarted.value || startPosition.value || !Math.abs(delta)) return;
    wheelStarted.value = true;
    const direction = delta < 0 ? "prev" : "next";
    wheelDirection.value = direction;
    setTimeout(() => {
      wheelStarted.value = false;
      wheelDirection.value = "";
      onSwitch(direction);
    }, 420);
  };

  return {
    onSwipeEnd,
    onSwipeStart,
    onSwipeMove,
    onWheel,
    cubeStyles,
    wheelDirection,
  };
};
