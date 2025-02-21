import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";
import * as THREE from "three";
import { purpleBallMaterial, yellowBallMaterial } from "../../Level";

interface SignProps {
  position?: Vector3;
  rotation?: Euler;
  color: string;
}

const getSignMaterial = (color: string) => {
  switch (color) {
    case "yellow":
      return yellowBallMaterial;
    case "purple":
      return purpleBallMaterial;
    default:
      return yellowBallMaterial;
  }
};

export default function Sign({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color,
}: SignProps) {
  const { signPost } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => {
    const clone = signPost.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = getSignMaterial(color);
      }
    });
    return clone;
  }, [signPost, color]);

  return (
    <group rotation={rotation} position={position} scale={[1, 1, 1]}>
      <primitive object={clonedModel} />
    </group>
  );
}
