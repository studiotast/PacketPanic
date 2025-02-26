import { purpleBallMaterial, yellowBallMaterial } from "../Level/Level";

export function getColorMaterial(color: string) {
  switch (color) {
    case "yellow":
      return yellowBallMaterial;
    case "purple":
      return purpleBallMaterial;
    default:
      return yellowBallMaterial;
  }
}
