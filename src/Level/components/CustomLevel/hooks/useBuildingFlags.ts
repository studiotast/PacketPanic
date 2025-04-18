import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";

export default function useBuildingFlags({ initialColors, name }) {
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

    // Find the matching building colors based on name
    const matchingBuilding = currentScene.buildingColors.find((building) => {
      // Compare building names
      return building.name === name;
    });

    // Update colors if we found a match
    if (matchingBuilding) {
      setFlagColors(matchingBuilding.colors);
    }
  }, [timer, name, currentLevel, initialColors]);

  return flagColors;
}
