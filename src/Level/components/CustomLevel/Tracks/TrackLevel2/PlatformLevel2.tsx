import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../../../stores/useModels";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function PlatformLevel2({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: JunctionProps) {
  const { platformLevel2Model } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(
    () => platformLevel2Model.clone(),
    [platformLevel2Model]
  );

  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
