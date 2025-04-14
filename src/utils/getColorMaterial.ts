import {
  blueMaterial,
  purpleMaterial,
  redMaterial,
  yellowMaterial,
} from "../Level/Level";

export function getColorMaterial(color: string) {
  switch (color) {
    case "yellow":
      return yellowMaterial;
    case "purple":
      return purpleMaterial;
    case "red":
      return redMaterial;
    case "blue":
      return blueMaterial;
    default:
      return yellowMaterial;
  }
}
