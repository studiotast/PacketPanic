import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";
import useBalls from "../../../../stores/useBalls";
import useGame from "../../../../stores/useGame";
import House from "./components/House";
import Flag from "./components/Flag";
import useBuildingFlags from "../hooks/useBuildingFlags";
import PlusOneLabel from "./components/PlusOneLabel";
import * as THREE from "three";
import { ColorConfig } from "../../../../utils/levelsData";

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
  const phase = useGame((state) => state.phase);
  const removeBall = useBalls((state) => state.removeBall);
  const playSound = useGame((state) => state.playSound);

  // Get flag state with new ColorConfig format
  const { currentColors } = useBuildingFlags({
    initialColors,
    name,
  });

  const plusOneLabelsWrapperRef = useRef<any[]>([]);

  function addPlusOneLabel() {
    const labelId = THREE.MathUtils.generateUUID();
    plusOneLabelsWrapperRef.current.push(
      <PlusOneLabel
        key={labelId}
        id={labelId}
        onRemove={(id) => {
          plusOneLabelsWrapperRef.current =
            plusOneLabelsWrapperRef.current.filter(
              (label) => label.props.id !== id
            );
        }}
      />
    );
  }

  // Extract just colors for collision detection
  const acceptedColors =
    currentColors?.map((colorConfig) => colorConfig.color) || [];

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
              // isBadActor={colorConfig.badActor || false}
              isFading={colorConfig.transition || false}
            />
          );
        })}

      {phase === "playing" && (
        <group>{plusOneLabelsWrapperRef.current.map((label) => label)}</group>
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

            // console.log(
            //   `Ball collision detected: ${ballColor}. Building accepts: ${acceptedColors.join(
            //     ","
            //   )}`
            // );

            // Check if this building accepts this ball color
            if (acceptedColors.includes(ballColor)) {
              // console.log(`Score incremented for ${ballColor} ball!`);
              playSound("score");
              addPlusOneLabel();
              incrementScore();
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
