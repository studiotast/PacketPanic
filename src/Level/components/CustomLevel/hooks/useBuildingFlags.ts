import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";
import { ColorConfig } from "../../../../utils/levelsData";

interface BuildingFlagsState {
  currentColors: ColorConfig[];
  isTransitioning: boolean;
  nextColors?: ColorConfig[];
}

export default function useBuildingFlags({ initialColors, name }) {
  const [flagState, setFlagState] = useState<BuildingFlagsState>({
    currentColors: initialColors || [],
    isTransitioning: false,
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
        isTransitioning: false,
      });
      return;
    }

    // Find which scene we're in based on the timer
    const { timeLine } = currentLevel;
    const TRANSITION_PERIOD = 5; // 5 seconds before scene change

    // Calculate current scene and detect transition periods
    let currentScene;
    let isTransitioning = false;
    let nextColors;

    // Before first scene
    if (timer < timeLine.scene1.time) {
      setFlagState({
        currentColors: initialColors || [],
        isTransitioning: false,
      });
      return;
    }

    // Process all scenes (dynamic version)
    const sceneKeys = Object.keys(timeLine).sort((a, b) => {
      const aNumber = parseInt(a.replace("scene", ""));
      const bNumber = parseInt(b.replace("scene", ""));
      return timeLine[a].time - timeLine[b].time;
    });

    // Find current scene and check for transition periods
    for (let i = 0; i < sceneKeys.length; i++) {
      const currentSceneKey = sceneKeys[i];
      const currentSceneTime = timeLine[currentSceneKey].time;
      const nextSceneKey = sceneKeys[i + 1];

      if (
        !nextSceneKey ||
        timer < timeLine[nextSceneKey].time - TRANSITION_PERIOD
      ) {
        // In current scene
        currentScene = timeLine[currentSceneKey];
        isTransitioning = false;
        break;
      } else if (timer < timeLine[nextSceneKey].time) {
        // In transition to next scene
        currentScene = timeLine[currentSceneKey];
        isTransitioning = true;

        // Get next scene colors
        const nextScene = timeLine[nextSceneKey];
        const nextBuilding = nextScene.buildingColors.find(
          (b) => b.name === name
        );
        nextColors = nextBuilding?.colors || [];
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
          isTransitioning: isTransitioning,
          nextColors: isTransitioning ? nextColors : undefined,
        });
      }
    }
  }, [timer, name, currentLevel, initialColors]);

  return flagState;
}
