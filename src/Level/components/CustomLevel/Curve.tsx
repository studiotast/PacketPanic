import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";

interface CornerProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: Vector3;
}

export default function Curve({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: CornerProps) {
  const { curveModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => curveModel.clone(), [curveModel]);

  return (
    <group rotation={rotation} scale={scale} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
