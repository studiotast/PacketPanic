import { useState, useEffect } from "react";
import useGame from "../../../../stores/useGame";

interface AcceleratorColorsState {
  currentColors: string[];
}

type UseAcceleratorColorsProps = {
  initialColors: string[];
};

export default function useAcceleratorColors({
  initialColors,
}: UseAcceleratorColorsProps) {
  const [colorState, setColorState] = useState<AcceleratorColorsState>({
    currentColors: initialColors || [],
  });

  const { timer, currentLevel } = useGame((state) => ({
    timer: state.timer,
    currentLevel: state.currentLevel,
  }));

  useEffect(() => {
    // If no timeline exists, use initial colors
    if (!currentLevel.timeLine) {
      setColorState({
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
      setColorState({
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

    // Handle accelerator colors from current scene
    if (currentScene && currentScene.accelerators) {
      // Since all accelerators in a scene share the same colors in this implementation,
      // we can just take the colors from the first accelerator
      if (currentScene.accelerators.length > 0) {
        const firstAccelerator = currentScene.accelerators[0];
        if (firstAccelerator.colors) {
          setColorState({
            currentColors: firstAccelerator.colors,
          });
        }
      } else {
        // Fallback to initial colors if no accelerators in scene
        setColorState({
          currentColors: initialColors || [],
        });
      }
    }
  }, [timer, currentLevel, initialColors]);

  return colorState;
}
