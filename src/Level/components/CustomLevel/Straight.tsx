import { Euler, Vector3 } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface StraightProps {
  position?: Vector3;
  rotation?: Euler;
  model: THREE.Group; // type voor je GLTF-model
  length?: number;
}

export default function Straight({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  length = 1,
  model,
}: StraightProps) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (ref.current) {
      // Het model klonen zodat elke instantie een unieke referentie heeft
      const clonedScene = model.clone();
      ref.current.add(clonedScene);
    }
  }, [model]);

  return (
    <group
      ref={ref}
      rotation={rotation}
      position={position}
      scale={[1, 1, length]}
    >
      {/* Het gekloonde object wordt nu hier aan de group toegevoegd */}
    </group>
  );
}
