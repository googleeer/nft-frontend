import { Collection } from "@/service/collections/collections.type";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";
import { Drop } from "@/service/drop/drop.type";

export const formatImages = ({
  background,
  artistLogo,
  brandLogo,
  cube,
  canvas,
}: Partial<Collection | Drop>): SceneImagesProp => ({
  background: background?.url,
  canvas: canvas?.url,
  artistLogo: artistLogo?.url,
  brandLogo: brandLogo?.url,
  cube: cube?.url,
});
