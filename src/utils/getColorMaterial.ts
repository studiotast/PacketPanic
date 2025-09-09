import {
  blueMaterial,
  redMaterial,
  yellowMaterial,
  greenMaterial,
} from "../Level/Level";

export function getColorMaterial(color: string) {
  switch (color) {
    case "yellow":
      return yellowMaterial;
    case "red":
      return redMaterial;
    case "blue":
      return blueMaterial;
    case "green":
      return greenMaterial;
    default:
      return yellowMaterial;
  }
}
