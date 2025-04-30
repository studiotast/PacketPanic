import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../../../stores/useModels";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function PlatformLevel1({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: JunctionProps) {
  const { platformLevel1Model } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(
    () => platformLevel1Model.clone(),
    [platformLevel1Model]
  );

  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
