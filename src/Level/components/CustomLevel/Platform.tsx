import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Platform({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: JunctionProps) {
  const { platformModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => platformModel.clone(), [platformModel]);

  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
