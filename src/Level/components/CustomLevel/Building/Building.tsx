import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import useBalls from "../../../../stores/useBalls";
import useGame from "../../../../stores/useGame";
import { ColorConfig } from "../../../../utils/levelsData";
import useBuildingFlags from "../hooks/useBuildingFlags";
import Flag from "./components/Flag";
import House from "./components/House";
import PlusOneLabel from "./components/PlusOneLabel";
import MinusLabel, { MinusLabelInfo } from "./MinusLabel";

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
  const decrementScore = useGame((state) => state.decrementScore); // Add this line
  const phase = useGame((state) => state.phase);
  const removeBall = useBalls((state) => state.removeBall);
  const playSound = useGame((state) => state.playSound);
  const currentLevelId = useGame((state) => state.currentLevelId);
  const incrementBadActorCount = useGame(
    (state) => state.incrementBadActorCount
  );

  // Get flag state with new ColorConfig format
  const { currentColors } = useBuildingFlags({
    initialColors,
    name,
  });

  const labelsWrapperRef = useRef<any[]>([]);

  function addPlusOneLabel() {
    const labelId = THREE.MathUtils.generateUUID();
    labelsWrapperRef.current.push(
      <PlusOneLabel
        key={labelId}
        id={labelId}
        onRemove={(id) => {
          labelsWrapperRef.current = labelsWrapperRef.current.filter(
            (label) => label.props.id !== id
          );
        }}
      />
    );
  }

  function addMinusLabel(info: MinusLabelInfo) {
    const labelId = THREE.MathUtils.generateUUID();
    labelsWrapperRef.current.push(
      <MinusLabel
        key={labelId}
        id={labelId}
        info={info}
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
          return (
            <Flag
              rotation={[0, Math.PI * 1.5, 0]}
              key={i}
              position={[0.9, 2, positionFromLeft]}
              color={colorConfig.color}
              isFading={colorConfig.transition || false}
            />
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
                // This is a bad actor flag - decrement score
                console.log(
                  `Score decremented for ${ballColor} ball by ${colorInfo.minusScoreNumber}!`
                );
                playSound("failScore"); // Play negative sound
                addMinusLabel(colorInfo); // Pass true to indicate penalty, need to pass in the amount also
                decrementScore(colorInfo.minusScoreNumber);
                if (currentLevelId >= 3) {
                  // Only increment bad actor count for levels 3 and above
                  incrementBadActorCount();
                }
              } else {
                // Normal flag - increment score
                console.log(`Score incremented for ${ballColor} ball!`);
                playSound("score");
                addPlusOneLabel();
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
