import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";

interface CornerProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Corner({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CornerProps) {
  const { cornerModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => cornerModel.clone(), [cornerModel]);

  return (
    <group rotation={rotation} position={position} scale={[1, 1, 1]}>
      <primitive object={clonedModel} />
    </group>
  );
}
