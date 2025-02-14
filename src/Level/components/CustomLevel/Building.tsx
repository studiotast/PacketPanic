import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import * as THREE from "three";
import usePlayer from "../../../stores/usePlayer";
import { boxGeometry, obstacleMaterial, wallMaterial } from "../../Level";
import useGame from "../../../stores/useGame";

export default function Building() {
  const buildingRef = useRef();
  const playerRef = usePlayer((state) => state.playerRef);
  const { world } = useRapier();

  const end = useGame((state) => state.end);
  return (
    <group position={[5, 0, -7.5]} rotation={[0, -(Math.PI / 2.5), 0]}>
      <mesh
        geometry={boxGeometry}
        scale={[1, 1, 0.15]}
        material={obstacleMaterial}
      />
      <CuboidCollider
        args={[1, 1, 0.15]}
        sensor
        onIntersectionEnter={(intersect) => {
          console.log("Goal!", intersect?.colliderObject?.name, intersect);
          end();
        }}
      />
    </group>
  );
}
