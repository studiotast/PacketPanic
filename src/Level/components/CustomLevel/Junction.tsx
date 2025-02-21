import { Euler, Vector3 } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
  model: THREE.Group; // type voor je GLTF-model
}

export default function Junction({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  model,
}: JunctionProps) {
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
