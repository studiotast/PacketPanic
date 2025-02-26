import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import React, { forwardRef, useMemo } from "react";
import { useModels } from "../../../stores/useModels";
import * as THREE from "three";
import { purpleBallMaterial, yellowBallMaterial } from "../../Level";

interface SignProps {
  position?: Vector3;
  rotation?: Euler;
  color: string;
  onClick: any;
  index: number;
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

const Sign = forwardRef<any, SignProps>(
  ({ position = [0, 0, 0], color, rotation, onClick, index }, ref) => {
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
      <group
        onClick={onClick}
        rotation={[0, ref?.current[index] ? 0 : Math.PI, 0]}
        position={position}
        scale={[1, 1, 1]}
      >
        <primitive object={clonedModel} />
      </group>
    );
  }
);

export default Sign;
