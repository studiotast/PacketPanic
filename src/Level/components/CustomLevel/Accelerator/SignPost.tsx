import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../../stores/useModels";
import * as THREE from "three";
import { purpleMaterial } from "../../../Level";

interface StraightProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function SignPost({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: StraightProps) {
  const { signPostModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken en het materiaal aan te passen
  const clonedModel = useMemo(() => {
    const clone = signPostModel.clone();
    const material = purpleMaterial; // Maak een nieuw materiaal met de opgegeven kleur
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material; // Pas het materiaal toe op elke mesh
      }
    });
    return clone;
  }, [signPostModel]);
  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
