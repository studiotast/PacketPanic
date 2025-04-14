import React from "react";
import { boxGeometry, beigeMaterial, purpleMaterial } from "../../Level";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function TrackStraight({ length = 1 }) {
  const wallHeight = 0.3;
  const wallThickness = 0.06;
  const trackWidth = 0.8;
  const trackLength = 4;

  return (
    <>
      {/* Right wall */}
      <mesh
        position={[
          trackWidth / 2 + wallThickness / 2,
          wallHeight / 2,
          -(length * 2) + 2 + trackWidth / 2,
        ]}
        geometry={boxGeometry}
        material={purpleMaterial}
        scale={[wallThickness, wallHeight, 4 * length - trackWidth]}
        castShadow
      />
      {/* Left wall */}
      <mesh
        position={[
          -(trackWidth / 2 + wallThickness / 2),
          wallHeight / 2,
          -(length * 2) + 2 + trackWidth / 2,
          ,
        ]}
        geometry={boxGeometry}
        material={purpleMaterial}
        scale={[wallThickness, wallHeight, 4 * length - trackWidth]}
        receiveShadow
      />
      {/* End wall */}
      <mesh
        position={[0, wallHeight / 2, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={purpleMaterial}
        scale={[trackWidth + wallThickness, wallHeight, wallThickness]}
        receiveShadow
      />
      {/* Floor */}
      <mesh
        position={[0, -0.05, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={beigeMaterial}
        scale={[trackWidth, 0.1, 4 * length]}
        receiveShadow
      />
      {/* Floor collider */}
      <CuboidCollider
        args={[trackWidth / 2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </>
  );
}
