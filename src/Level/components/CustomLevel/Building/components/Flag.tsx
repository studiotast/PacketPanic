import { Euler, Vector3 } from "@react-three/fiber";
import { forwardRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import useGame from "../../../../../stores/useGame";
import { useModels } from "../../../../../stores/useModels";
import { getColorMaterial } from "../../../../../utils/getColorMaterial";

interface SignProps {
  position?: Vector3;
  rotation?: Euler;
  color: string;
  isFading: boolean;
}

const Flag = forwardRef<any, SignProps>(
  ({ position = [0, 0, 0], color, rotation, isFading }, ref) => {
    const { flagModel } = useModels((state) => state.getModels());
    const playSound = useGame((state) => state.playSound);
    // console.log(isFading, isFading);

    const clonedModel = useMemo(() => {
      const clone = flagModel.clone();
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = getColorMaterial(color);
        }
      });
      return clone;
    }, [flagModel, color]);

    useEffect(() => {
      clonedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (isFading) {
            playSound("flagDisappear");
            const fadedMaterial = child.material.clone();
            fadedMaterial.transparent = true;
            fadedMaterial.opacity = 0.5;
            fadedMaterial.needsUpdate = true;
            child.material = fadedMaterial;
          } else {
            playSound("flagAppear");
            const normalMaterial = getColorMaterial(color);
            child.material = normalMaterial;
          }
        }
      });
    }, [isFading, color, clonedModel]);

    return (
      <group rotation={rotation} position={position} scale={[1, 1, 1]}>
        <primitive object={clonedModel} />
      </group>
    );
  }
);

export default Flag;
