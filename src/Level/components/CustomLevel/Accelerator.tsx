import React from "react";
import { CuboidCollider } from "@react-three/rapier";
import { boxGeometry, obstacleMaterial } from "../../Level";
import usePlayer from "../../../stores/usePlayer";
import useBalls from "../../../stores/useBalls";

export default function Accelerator() {
  const playerRef = usePlayer((state) => state.playerRef);
  const accelerateBall = useBalls((state) => state.accelerateBall);
  return (
    <group position={[0, 0.5, -1.2]}>
      <mesh
        geometry={boxGeometry}
        scale={[0.25, 0.25, 0.25]}
        material={obstacleMaterial}
      />
      <CuboidCollider
        args={[0.125, 0.125, 0.125]}
        sensor
        onIntersectionEnter={(intersect) => {
          if (intersect?.colliderObject) {
            // const ballId = intersect.colliderObject.name;
            // playerRef.current.applyImpulse({ x: -0.02, y: 0, z: 0 });
            // console.log("Ball hit accelerator!", ballId);
            const ballId = intersect.colliderObject.name;
            const color = ballId.split("|")[1];
            const direction =
              color === "yellow"
                ? { x: -0.0005, y: 0, z: 0 }
                : { x: 0.0005, y: 0, z: 0 };
            accelerateBall(ballId, direction);
          }
        }}
      />
    </group>
  );
}
