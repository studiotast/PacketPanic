import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import React from "react";
import useBalls from "../../../stores/useBalls"; // Import de zustand store
import useGame from "../../../stores/useGame";
import { getColorMaterial } from "../../../utils/getColorMaterial";
import { boxGeometry, whiteMaterial } from "../../Level";

interface BuildingProps {
  position?: Vector3;
  rotation?: Euler;
  colors: string[];
}

export default function Building({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  colors,
}: BuildingProps) {
  const incrementScore = useGame((state) => state.incrementScore);
  const removeBall = useBalls((state) => state.removeBall); // Haal de removeBall functie uit de store

  return (
    <group rotation={rotation} position={position}>
      <mesh geometry={boxGeometry} scale={[1, 1, 1]} material={whiteMaterial} />
      {colors.map((color, i) => {
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
      })}
      <CuboidCollider
        args={[0.5, 0.5, 0.5]}
        sensor
        onIntersectionEnter={(intersect) => {
          const collidedObjectName = intersect?.colliderObject?.name;
          const ballColor = intersect?.colliderObject?.name.split("|")[1];

          // Verwijder de bal als deze intersectie de naam van de bal heeft
          if (ballColor) {
            removeBall(collidedObjectName); // Verwijder de bal met het id
            if (colors.includes(ballColor)) {
              // Controleer of de kleur voorkomt in de array
              incrementScore(); // Verhoog de score
            }
          }
        }}
      />
    </group>
  );
}
