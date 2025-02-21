import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";

interface StraightProps {
  position?: Vector3;
  rotation?: Euler;
  length?: number;
}

export default function Straight({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  length = 1,
}: StraightProps) {
  const { straightModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => straightModel.clone(), [straightModel]);

  return (
    <group rotation={rotation} position={position} scale={[1, 1, length]}>
      <primitive object={clonedModel} />
    </group>
  );
}
