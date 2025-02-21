import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import React, { useRef } from "react";
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import * as THREE from "three";
import useBalls from "../../../stores/useBalls"; // Import de zustand store
import { boxGeometry, obstacleMaterial, wallMaterial } from "../../Level";
import useGame from "../../../stores/useGame";

interface BuildingProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Building({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: BuildingProps) {
  const incrementScore = useGame((state) => state.incrementScore);
  const removeBall = useBalls((state) => state.removeBall); // Haal de removeBall functie uit de store

  return (
    <group rotation={rotation} position={position}>
      <mesh
        geometry={boxGeometry}
        scale={[1, 1, 1]}
        material={obstacleMaterial}
      />
      <CuboidCollider
        args={[0.5, 0.5, 0.5]}
        sensor
        onIntersectionEnter={(intersect) => {
          const collidedObjectName = intersect?.colliderObject?.name;
          console.log("Done!", collidedObjectName, intersect);

          // Verwijder de bal als deze intersectie de naam van de bal heeft
          if (collidedObjectName) {
            removeBall(collidedObjectName); // Verwijder de bal met het id
            incrementScore(); // Verhoog de score
          }
        }}
      />
    </group>
  );
}
