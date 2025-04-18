import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import React, { useRef } from "react";
import useBalls from "../../../../stores/useBalls"; // Import de zustand store
import useGame from "../../../../stores/useGame";
import House from "./components/House";
import Flag from "./components/Flag";
import useBuildingFlags from "../hooks/useBuildingFlags";
import PlusOneLabel from "./components/PlusOneLabel";
import * as THREE from "three";

interface BuildingProps {
  position?: Vector3;
  rotation?: Euler;
  colors?: string[];
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
  const removeBall = useBalls((state) => state.removeBall); // Haal de removeBall functie uit de store
  const playSound = useGame((state) => state.playSound);

  const currentColors = useBuildingFlags({ initialColors, name });

  // console.log("Position:", position);
  // console.log("Initial colors:", initialColors);
  // console.log("Current colors from timeline:", currentColors);

  const plusOneLabelsWrapperRef = useRef<any[]>([]); // Houd de labels bij

  function addPlusOneLabel() {
    const labelId = THREE.MathUtils.generateUUID(); // Genereer een uniek ID

    // Voeg een nieuw PlusOneLabel toe aan de wrapper
    plusOneLabelsWrapperRef.current.push(
      <PlusOneLabel
        key={labelId}
        id={labelId}
        onRemove={(id) => {
          // Verwijder het label met het gegeven ID
          plusOneLabelsWrapperRef.current =
            plusOneLabelsWrapperRef.current.filter(
              (label) => label.props.id !== id
            );
        }}
      />
    );
  }

  return (
    <group name={name} rotation={rotation} position={position}>
      {currentColors &&
        currentColors?.map((color, i) => {
          const positionFromLeft = 0.8 - i * 0.75; // Tel 0.34 op per index
          return (
            <Flag
              rotation={[0, Math.PI * 1.5, 0]}
              key={i}
              position={[0.9, 2, positionFromLeft]}
              color={color}
            />
          );
        })}
      {/* Render de labels */}
      <group>{plusOneLabelsWrapperRef.current.map((label) => label)}</group>

      <House position={[0, -1.9, 0]} rotation={[0, Math.PI * 1.5, 0]} />
      <group position={[3, 0, -1]}>
        <mesh scale={[1, 1, 1]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh>
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
              `Ball collision detected: ${ballColor}. Building accepts: ${currentColors?.join(
                ","
              )}`
            );

            // Check if this building accepts this ball color
            if (currentColors?.includes(ballColor)) {
              console.log(`Score incremented for ${ballColor} ball!`);
              playSound("score");
              addPlusOneLabel();
              incrementScore();
            }
          }}
        />
      </group>

      <group position={[3, -3, -4]}>
        <mesh scale={[1, 1, 1]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="blue" wireframe />
        </mesh>
        <CuboidCollider
          args={[0.75, 0.75, 0.75]}
          sensor
          onIntersectionEnter={(intersection) => {
            playSound("inHole");
            if (!intersection.colliderObject) return;

            // Get the ball's ID (which includes color information)
            const ballId = intersection.colliderObject.name;

            if (!ballId) return;

            // Extract the color part from the ID (format: "uuid|color")
            const ballParts = ballId.split("|");
            if (ballParts.length < 2) return;

            const ballColor = ballParts[1];

            console.log(
              `Ball collision detected: ${ballColor}. Building accepts: ${currentColors?.join(
                ","
              )}`
            );

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
