import React from "react";
import { CuboidCollider } from "@react-three/rapier";
import { boxGeometry, obstacleMaterial } from "../../Level";
import usePlayer from "../../../stores/usePlayer";

export default function Accelerator() {
  const playerRef = usePlayer((state) => state.playerRef);
  return (
    <group position={[0, 0, -6]}>
      <mesh
        geometry={boxGeometry}
        scale={[1, 1, 0.5]}
        material={obstacleMaterial}
      />
      <CuboidCollider
        args={[0.5, 0.5, 0.25]}
        sensor
        onIntersectionEnter={(intersect) => {
          if (intersect?.colliderObject) {
            const ballId = intersect.colliderObject.name;
            playerRef.current.applyImpulse({ x: -0.6, y: 0, z: 0 });
            console.log("Ball hit accelerator!", ballId);
          }
        }}
      />
    </group>
  );
}
