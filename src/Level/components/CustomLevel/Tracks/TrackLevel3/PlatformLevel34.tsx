import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../../../stores/useModels";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function PlatformLevel34({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: JunctionProps) {
  const { platformLevel34Model } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(
    () => platformLevel34Model.clone(),
    [platformLevel34Model]
  );

  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
