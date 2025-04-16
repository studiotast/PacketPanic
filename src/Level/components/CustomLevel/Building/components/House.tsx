import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import * as THREE from "three";
import { useModels } from "../../../../../stores/useModels";

interface StraightProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function House({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: StraightProps) {
  const { houseModel } = useModels((state) => state.getModels());

  // Gebruik useMemo om een gekloonde instantie te maken per component
  const clonedModel = useMemo(() => houseModel.clone(), [houseModel]);

  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
