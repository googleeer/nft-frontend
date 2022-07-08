import { Collection } from "@/service/collections/collections.type";
import { SceneImagesProp } from "@/components/scene/sceneComponent.types";
import { Drop } from "@/service/drop/drop.type";

export const formatImages = ({
  background,
  rightColumn,
  leftColumn,
  artistLogo,
  brandLogo,
  cube,
}: Collection | Drop): SceneImagesProp => ({
  background: background?.url,
  rightColumn: rightColumn?.url,
  leftColumn: leftColumn?.url,
  artistLogo: artistLogo?.url,
  brandLogo: brandLogo?.url,
  cube: cube?.url,
});
