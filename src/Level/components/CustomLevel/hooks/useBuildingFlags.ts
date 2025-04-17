import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";

export default function useBuildingFlags({ initialColors, position }) {
  const [flagColors, setFlagColors] = useState(initialColors || []);

  const { timer, currentLevel } = useGame((state) => ({
    timer: state.timer,
    currentLevel: state.currentLevel,
  }));

  useEffect(() => {
    // If no timeline exists, use initial colors
    if (!currentLevel.timeLine) return;

    // Find which scene we're in based on the timer
    const { timeLine } = currentLevel;
    let currentScene;

    if (timer < timeLine.scene1.time) {
      // Before first scene - use initial colors
      return;
    } else if (timer < timeLine.scene2.time) {
      currentScene = timeLine.scene1;
    } else if (timer < timeLine.scene3.time) {
      currentScene = timeLine.scene2;
    } else {
      currentScene = timeLine.scene3;
    }

    // Find the matching building colors based on position
    const matchingBuilding = currentScene.buildingColors.find((building) => {
      // Compare positions with a small tolerance for floating point differences
      return (
        Math.abs(building.position[0] - position[0]) < 0.1 &&
        Math.abs(building.position[1] - position[1]) < 0.1 &&
        Math.abs(building.position[2] - position[2]) < 0.1
      );
    });

    // Update colors if we found a match
    if (matchingBuilding) {
      setFlagColors(matchingBuilding.colors);
    }
  }, [timer, position, currentLevel, initialColors]);

  return flagColors;
}
