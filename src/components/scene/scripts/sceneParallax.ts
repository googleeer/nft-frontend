import { reactive, Ref, ref } from "vue";

const getPercent = (a: number, b: number) => (a * 100) / b;
const getByPercent = (percent: number, number: number) =>
  (number * percent) / 100;

const detectSection =
  (sceneRef: Ref<HTMLElement>) => (screenX: number, screenY: number) => {
    const { width: sceneWidth, height: sceneHeight } =
      sceneRef.value.getBoundingClientRect();
    const halfWidth = sceneWidth / 2;
    const halfHeight = sceneHeight / 2;
    const verticalPart = -getPercent(screenY - halfHeight, halfHeight);
    const horizontalPart = getPercent(screenX - halfWidth, halfWidth);
    const hypotenuse = Math.sqrt(
      Math.pow(halfHeight, 2) + Math.pow(halfWidth, 2),
    );

    const distanceToCenter = Math.sqrt(
      (screenX - halfWidth) ** 2 + (screenY - halfHeight) ** 2,
    );
    const axisPart = getPercent(distanceToCenter, hypotenuse);

    return {
      verticalPart,
      horizontalPart,
      axisPart,
    };
  };

export const useParallax = (sceneRef: Ref<HTMLElement>) => {
  const parallaxStyles = reactive({
    background: {},
    leftColumn: {},
    rightColumn: {},
  });

  let wait = false;
  const onMouseMove = ({ pageY, pageX }: MouseEvent) => {
    if (!wait) {
      const section = detectSection(sceneRef)(pageX, pageY);
      const z = getByPercent(section.axisPart, -3);
      const x = getByPercent(section.verticalPart, 2);
      const y = getByPercent(section.horizontalPart, 2);

      parallaxStyles.background = {
        transform: `translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg)`,
      };

      parallaxStyles.leftColumn = {
        transform: `translateZ(${z}px) rotateY(${-y}deg) rotateX(${x}deg)`,
      };

      parallaxStyles.rightColumn = {
        transform: `translateZ(${z}px) rotateY(${-y}deg) rotateX(${x}deg)`,
      };

      wait = true;
      setTimeout(function () {
        wait = false;
      }, 10);
    }
  };

  return {
    onMouseMove,
    parallaxStyles,
  };
};
