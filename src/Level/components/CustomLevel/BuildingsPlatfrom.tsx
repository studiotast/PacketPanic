import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../stores/useModels";

interface JunctionProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function BuildingsPlatform({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: JunctionProps) {
  const { buildingsPlatformModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(
    () => buildingsPlatformModel.clone(),
    [buildingsPlatformModel]
  );

  return (
    <group rotation={rotation} position={position} scale={[0.87, 0.87, 0.87]}>
      <primitive object={clonedModel} />
    </group>
  );
}
