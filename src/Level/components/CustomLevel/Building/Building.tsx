import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useBalls from "../../../../stores/useBalls";
import useGame from "../../../../stores/useGame";
import { ColorConfig } from "../../../../utils/levelsData";
import useBuildingFlags from "../hooks/useBuildingFlags";
import Flag from "./components/Flag";
import FlagAttention from "./components/FlagAttention";
import House from "./components/House";
import PlusOneLabel from "./components/PlusOneLabel/PlusOneLabel";
import MinusLabel, { MinusLabelInfo } from "./components/MinusLabel/MinusLabel";

interface BuildingProps {
  position?: Vector3;
  rotation?: Euler;
  colors?: ColorConfig[];
  type?: string;
  name: string;
}

export default function Building({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  colors: initialColors,
  type,
  name,
}: BuildingProps) {
  const incrementScore = useGame((state) => state.incrementScore);
  const decrementScore = useGame((state) => state.decrementScore);
  const phase = useGame((state) => state.phase);
  const currentLevelId = useGame((state) => state.currentLevelId);
  const removeBall = useBalls((state) => state.removeBall);
  const playSound = useGame((state) => state.playSound);
  const incrementBadActorCount = useGame(
    (state) => state.incrementBadActorCount
  );

  // State to track warnings per color
  const [warningsCount, setWarningsCount] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    // Reset warnings count when the phase changes to anything besides "playing" or "paused"
    if (phase !== "playing" && phase !== "pause") {
      setWarningsCount({});
    }
  }, [phase, currentLevelId]); // Watch for phase changes

  // Get flag state with new ColorConfig format
  const { currentColors } = useBuildingFlags({
    initialColors,
    name,
  });

  const labelsWrapperRef = useRef<any[]>([]);

  function addPlusOneLabel(color: string) {
    const labelId = THREE.MathUtils.generateUUID();
    labelsWrapperRef.current.push(
      <PlusOneLabel
        key={labelId}
        id={labelId}
        color={color}
        onRemove={(id) => {
          labelsWrapperRef.current = labelsWrapperRef.current.filter(
            (label) => label.props.id !== id
          );
        }}
      />
    );
  }

  function addMinusLabel(
    info: MinusLabelInfo,
    isWarning = false,
    warningsExceeded = false,
    color?: string
  ) {
    const labelId = THREE.MathUtils.generateUUID();
    labelsWrapperRef.current.push(
      <MinusLabel
        key={labelId}
        id={labelId}
        info={info}
        color={color}
        isWarning={isWarning} // Pass the warning flag to MinusLabel
        warningsExceeded={warningsExceeded} // Pass the warningsExceeded flag to MinusLabel
        onRemove={(id) => {
          labelsWrapperRef.current = labelsWrapperRef.current.filter(
            (label) => label.props.id !== id
          );
        }}
      />
    );
  }

  // Extract all the necessary data for collision detection
  const acceptedColorsMap =
    currentColors?.reduce((map, colorConfig) => {
      map[colorConfig.color] = {
        isMistakeBadActor: colorConfig.mistakenBadActor || false,
        isMaliciousBadActor: colorConfig.maliciousBadActor || false,
        minusScoreNumber: colorConfig.minusScoreNumber || 5,
      };
      return map;
    }, {} as Record<string, { isMistakeBadActor: boolean; isMaliciousBadActor: boolean; minusScoreNumber: number }>) ||
    {};

  // Get just the color names for quick lookup
  const acceptedColors = Object.keys(acceptedColorsMap);

  return (
    <group name={name} rotation={rotation} position={position}>
      {/* Render flags with proper color object */}
      {currentColors &&
        currentColors.map((colorConfig, i) => {
          const positionFromLeft = 0.8 - i * 0.75;
          const flagPosition: Vector3 = [0.9, 2, positionFromLeft];
          const isBadActor =
            colorConfig.mistakenBadActor || colorConfig.maliciousBadActor;

          return (
            <group key={i}>
              {/* Conditionally render either FlagAttention (on level 4 for bad actors) or regular Flag */}
              {currentLevelId === 4 && isBadActor ? (
                <FlagAttention
                  rotation={[0, Math.PI * 1.5, 0]}
                  position={flagPosition}
                  color={colorConfig.color}
                />
              ) : (
                <Flag
                  rotation={[0, Math.PI * 1.5, 0]}
                  position={flagPosition}
                  color={colorConfig.color}
                  isFading={colorConfig.transition || false}
                />
              )}
            </group>
          );
        })}

      {phase === "playing" && (
        <group>{labelsWrapperRef.current.map((label) => label)}</group>
      )}

      <House position={[0, -1.9, 0]} rotation={[0, Math.PI * 1.5, 0]} />

      <group position={[3, 0, -1]}>
        <CuboidCollider
          args={[0.75, 0.75, 0.75]}
          sensor
          onIntersectionEnter={(intersection) => {
            if (!intersection.colliderObject) return;

            // Get the ball's ID (which includes color information)
            const ballId = intersection.colliderObject.name;
            if (!ballId) return;

            // Extract the color part from the ID (format: "uuid|color")
            const ballParts = ballId.split("|");
            if (ballParts.length < 2) return;

            const ballColor = ballParts[1];

            console.log(
              `Ball collision detected: ${ballColor}. Building accepts: ${acceptedColors.join(
                ","
              )}`
            );

            // Check if this building accepts this ball color
            if (acceptedColors.includes(ballColor)) {
              const colorInfo = acceptedColorsMap[ballColor];

              if (
                colorInfo.isMistakeBadActor ||
                colorInfo.isMaliciousBadActor
              ) {
                // This is a bad actor flag - check for warnings
                const minusAmount = colorInfo.minusScoreNumber;
                const currentWarnings = warningsCount[ballColor] || 0;

                if (minusAmount > 5 && currentWarnings < 3) {
                  // Show warning instead of deducting points
                  console.log(
                    `Warning ${currentWarnings + 1}/3 for ${ballColor} ball!`
                  );
                  playSound("failScore"); // Play warning sound
                  addMinusLabel(colorInfo, true, false, ballColor); // Pass true for isWarning

                  // Increment warning count for this color
                  setWarningsCount((prev) => ({
                    ...prev,
                    [ballColor]: currentWarnings + 1,
                  }));
                } else {
                  // Either minusAmount <= 5 or warnings exceeded, deduct points
                  console.log(
                    `Score decremented for ${ballColor} ball by ${minusAmount}!`
                  );
                  playSound("failScore"); // Play negative sound
                  addMinusLabel(colorInfo, false, true, ballColor); // Not a warning, show minus points
                  decrementScore(minusAmount);

                  if (currentLevelId >= 3) {
                    // Only increment bad actor count for levels 3 and above
                    incrementBadActorCount();
                  }
                }
              } else {
                // Normal flag - increment score
                console.log(`Score incremented for ${ballColor} ball!`);
                playSound("score");
                addPlusOneLabel(ballColor);
                incrementScore();
              }
            }
          }}
        />
      </group>

      <group position={[3, -3, -4]}>
        <CuboidCollider
          args={[0.75, 0.75, 0.75]}
          sensor
          onIntersectionEnter={(intersection) => {
            playSound("inHole");
            if (!intersection.colliderObject) return;
            const ballId = intersection.colliderObject.name;
            if (!ballId) return;

            // Remove the ball always
            if (type !== "spawner") {
              removeBall(ballId);
            }
          }}
        />
      </group>
    </group>
  );
}
