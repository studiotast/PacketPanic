import React from "react";
import {
  boxGeometry,
  beigeMaterial,
  magentaMaterial,
  purpleMaterial,
} from "../../Level";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function TrackToRight({ length = 1 }) {
  const wallHeight = 0.3;
  const wallThickness = 0.06;
  const trackWidth = 0.8;
  const trackLength = 4;

  return (
    <>
      <group position={[4, 0, -7]} rotation={[0, Math.PI / 8, 0]}>
        {/* front wall */}
        <mesh
          position={[0, wallHeight / 2, trackWidth / 2 + wallThickness / 2]}
          geometry={boxGeometry}
          material={purpleMaterial}
          scale={[4 * length, wallHeight, wallThickness]}
          castShadow
        />
        {/* back wall */}
        <mesh
          position={[0, wallHeight / 2, -(trackWidth / 2 + wallThickness / 2)]}
          geometry={boxGeometry}
          material={purpleMaterial}
          scale={[4 * length + trackWidth / 2, wallHeight, wallThickness]}
          castShadow
        />
        {/* Floor */}
        <mesh
          position={[0, -0.05, 0]}
          geometry={boxGeometry}
          material={beigeMaterial}
          scale={[4 * length, 0.1, trackWidth]}
          receiveShadow
        />
        {/* Floor collider */}
        <CuboidCollider
          args={[trackWidth / 2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
        {/* Left wall */}
        {/* <mesh
        position={[
          -(length * 2) + 2,
          wallHeight / 2,
          -(trackWidth / 2 + wallThickness / 2),
        ]}
        geometry={boxGeometry}
        material={purpleMaterial}
        scale={[length * 2 + 2, wallHeight, wallThickness]}
        receiveShadow
      /> */}
        {/* End wall */}
        {/* <mesh
        position={[0, wallHeight / 2, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={purpleMaterial}
        scale={[trackWidth + wallThickness * 2, wallHeight, 0.3]}
        receiveShadow
      /> */}
      </group>
    </>
  );
}
