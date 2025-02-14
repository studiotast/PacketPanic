import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";

export default function Ball() {
  const body = useRef();

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
      canSleep={false}
    >
      <mesh castShadow>
        {/* <icosahedronGeometry args={[0.3, 1]} /> */}
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          //flatShading
          color={"mediumpurple"}
        />
      </mesh>
    </RigidBody>
  );
}
