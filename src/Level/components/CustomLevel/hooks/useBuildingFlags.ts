import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";
import { ColorConfig } from "../../../../utils/levelsData";

interface BuildingFlagsState {
  currentColors: ColorConfig[];
}

export default function useBuildingFlags({ initialColors, name }) {
  const [flagState, setFlagState] = useState<BuildingFlagsState>({
    currentColors: initialColors || [],
  });

  const { timer, currentLevel } = useGame((state) => ({
    timer: state.timer,
    currentLevel: state.currentLevel,
  }));

  useEffect(() => {
    // If no timeline exists, use initial colors
    if (!currentLevel.timeLine) {
      setFlagState({
        currentColors: initialColors || [],
      });
      return;
    }

    // Find which scene we're in based on the timer
    const { timeLine } = currentLevel;

    // Process all scenes (dynamic version)
    const sceneKeys = Object.keys(timeLine)
      .filter((key) => key.startsWith("scene"))
      .sort((a, b) => {
        return timeLine[a].time - timeLine[b].time;
      });

    // Before first scene
    if (timer < timeLine[sceneKeys[0]].time) {
      setFlagState({
        currentColors: initialColors || [],
      });
      return;
    }

    // Find current scene
    let currentScene;

    for (let i = 0; i < sceneKeys.length; i++) {
      const currentSceneKey = sceneKeys[i];
      const nextSceneKey = sceneKeys[i + 1];

      // If this is the last scene or we're before the next scene's time
      if (!nextSceneKey || timer < timeLine[nextSceneKey].time) {
        currentScene = timeLine[currentSceneKey];
        break;
      }
    }

    // Find the matching building colors for current scene
    if (currentScene) {
      const matchingBuilding = currentScene.buildingColors.find(
        (building) => building.name === name
      );

      if (matchingBuilding) {
        setFlagState({
          currentColors: matchingBuilding.colors || [],
        });
      }
    }
  }, [timer, name, currentLevel, initialColors]);

  return flagState;
}
