import { Euler, Vector3 } from "@react-three/fiber";
import React, { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { useModels } from "../../../../../stores/useModels";
import { getColorMaterial } from "../../../../../utils/getColorMaterial";

interface SignProps {
  position?: Vector3;
  rotation?: Euler;
  color: string;
}

const Flag = forwardRef<any, SignProps>(
  ({ position = [0, 0, 0], color, rotation }, ref) => {
    const { flagModel } = useModels((state) => state.getModels());

    const clonedModel = useMemo(() => {
      const clone = flagModel.clone();
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = getColorMaterial(color);
        }
      });
      return clone;
    }, [flagModel, color]);

    console.log("Flag color", color);

    return (
      <group rotation={rotation} position={position} scale={[1, 1, 1]}>
        <primitive object={clonedModel} />
      </group>
    );
  }
);

export default Flag;
