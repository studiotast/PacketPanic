import { Euler, Vector3 } from "@react-three/fiber";
import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { useModels } from "../../../../../stores/useModels";
import { getColorMaterial } from "../../../../../utils/getColorMaterial";

interface FlagAttentionProps {
  position?: Vector3;
  rotation?: Euler;
  color: string;
}

const FlagAttention = forwardRef<any, FlagAttentionProps>(
  ({ position = [0, 0, 0], color, rotation }, ref) => {
    const { flagAttentionModel } = useModels((state) => state.getModels());

    const clonedModel = useMemo(() => {
      const clone = flagAttentionModel.clone();
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = getColorMaterial(color);
        }
      });
      return clone;
    }, [flagAttentionModel, color]);

    return (
      <group rotation={rotation} position={position} scale={[1, 1, 1]}>
        <primitive object={clonedModel} />
      </group>
    );
  }
);

export default FlagAttention;
