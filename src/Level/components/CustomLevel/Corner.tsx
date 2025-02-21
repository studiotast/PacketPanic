import React, { useEffect, useRef } from "react";
import { Vector3, Euler } from "@react-three/fiber";
import * as THREE from "three";

interface CornerProps {
  position?: Vector3;
  rotation?: Euler;
  model: THREE.Group; // type voor je GLTF-model
}

export default function Corner({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  model,
}: CornerProps) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (ref.current) {
      // Het model klonen zodat elke instantie een unieke referentie heeft
      const clonedScene = model.clone();
      ref.current.add(clonedScene);
    }
  }, [model]);
  return (
    <group ref={ref} rotation={rotation} position={position} scale={[1, 1, 1]}>
      {/* Het gekloonde object wordt nu hier aan de group toegevoegd */}
    </group>
  );
}
