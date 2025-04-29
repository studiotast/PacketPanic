import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";

interface BuildingFlagsState {
  currentColors: string[];
  isTransitioning: boolean;
  nextColors?: string[];
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
    // Transition to scene2
    else if (
      timer >= timeLine.scene1.time - TRANSITION_PERIOD &&
      timer < timeLine.scene1.time
    ) {
      currentScene = null; // Still using initial colors
      isTransitioning = true;

      // Find next colors from scene1
      const nextScene = timeLine.scene1;
      const nextBuilding = nextScene.buildingColors.find(
        (b) => b.name === name
      );
      nextColors = nextBuilding?.colors || [];
    }
    // In scene1
    else if (timer < timeLine.scene2.time - TRANSITION_PERIOD) {
      currentScene = timeLine.scene1;
      isTransitioning = false;
    }
    // Transition to scene2
    else if (timer < timeLine.scene2.time) {
      currentScene = timeLine.scene1; // Still using scene1 colors
      isTransitioning = true;

      // Find next colors from scene2
      const nextScene = timeLine.scene2;
      const nextBuilding = nextScene.buildingColors.find(
        (b) => b.name === name
      );
      nextColors = nextBuilding?.colors || [];
    }
    // In scene2
    else if (timer < timeLine.scene3.time - TRANSITION_PERIOD) {
      currentScene = timeLine.scene2;
      isTransitioning = false;
    }
    // Transition to scene3
    else if (timer < timeLine.scene3.time) {
      currentScene = timeLine.scene2; // Still using scene2 colors
      isTransitioning = true;

      // Find next colors from scene3
      const nextScene = timeLine.scene3;
      const nextBuilding = nextScene.buildingColors.find(
        (b) => b.name === name
      );
      nextColors = nextBuilding?.colors || [];
    }
    // In scene3
    else {
      currentScene = timeLine.scene3;
      isTransitioning = false;
    }

    // Find the matching building colors for current scene
    if (currentScene) {
      const matchingBuilding = currentScene.buildingColors.find(
        (building) => building.name === name
      );

      if (matchingBuilding) {
        setFlagState({
          currentColors: matchingBuilding.colors,
          isTransitioning: isTransitioning,
          nextColors: isTransitioning ? nextColors : undefined,
        });
      }
    }
  }, [timer, name, currentLevel, initialColors]);

  return flagState;
}
