import { RigidBody } from "@react-three/rapier";
import React from "react";
import Accelerator from "./Accelerator";
import Building from "./Building";
import Corner from "./Corner";
import Junction from "./Junction";
import Straight from "./Straight";

export default function Track({}) {
  return (
    <group rotation={[-0.05, 0, 0]}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.2}
        friction={0}
      >
        <Straight position={[0, 0, 1]} length={3} />
        <Straight rotation={[0, Math.PI * 0.5, 0]} position={[1, 0, -1]} />
        <Straight rotation={[0, Math.PI * 0.5, 0]} position={[-1, 0, -1]} />
        <Junction position={[0, 0, -1]} />
        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-2, 0, -1]} />
        <Straight rotation={[0, 0, 0]} position={[-2, 0, -2]} />
        <Corner rotation={[0, Math.PI * 1, 0]} position={[2, 0, -1]} />
        <Straight rotation={[0, 0, 0]} position={[2, 0, -2]} />
      </RigidBody>

      <Accelerator />
      <Building color="purple" position={[2, 0.5, -3]} />
      <Building color="yellow" position={[-2, 0.5, -3]} />
    </group>
  );
}
