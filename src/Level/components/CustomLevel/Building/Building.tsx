import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import React from "react";
import useBalls from "../../../../stores/useBalls"; // Import de zustand store
import useGame from "../../../../stores/useGame";
import { getColorMaterial } from "../../../../utils/getColorMaterial";
import { boxGeometry, whiteMaterial } from "../../../Level";
import House from "./components/House";

interface BuildingProps {
  position?: Vector3;
  rotation?: Euler;
  colors?: string[];
  type?: string;
}

export default function Building({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  colors,
  type,
}: BuildingProps) {
  const incrementScore = useGame((state) => state.incrementScore);
  const removeBall = useBalls((state) => state.removeBall); // Haal de removeBall functie uit de store
  const playSound = useGame((state) => state.playSound);

  return (
    <group rotation={rotation} position={position}>
      {/* <mesh geometry={boxGeometry} scale={[1, 1, 1]} material={whiteMaterial} /> */}
      {/* {colors &&
        colors?.map((color, i) => {
          const positionFromLeft = -0.34 + i * 0.22; // Tel 0.34 op per index
          return (
            <mesh
              key={i}
              geometry={boxGeometry}
              scale={[0.18, 0.06, 0.18]}
              position={[positionFromLeft, 0.4, 0.5]}
              material={getColorMaterial(color)}
            />
          );
        })} */}
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
              `Ball collision detected: ${ballColor}. Building accepts: ${colors?.join(
                ","
              )}`
            );

            // Check if this building accepts this ball color
            if (colors?.includes(ballColor)) {
              console.log(`Score incremented for ${ballColor} ball!`);
              playSound("score");
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
              `Ball collision detected: ${ballColor}. Building accepts: ${colors?.join(
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
