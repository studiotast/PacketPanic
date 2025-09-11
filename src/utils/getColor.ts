import { yellow, purple, red, blue, green } from "../Level/Level";

export function getColor(color: string) {
  switch (color) {
    case "yellow":
      return yellow;
    case "red":
      return red;
    case "blue":
      return blue;
    case "green":
      return green;
    default:
      return yellow;
  }
}
