import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { boxGeometry, yellowMaterial, magentaMaterial } from "../../Level";
import { useControls } from "leva";
import * as THREE from "three";

export default function Bar({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  const { rotationDirection } = useControls({
    rotationDirection: {
      value: "left",
      options: ["left", "right"],
    },
  });

  const rotationAngle =
    rotationDirection === "left" ? Math.PI * 0.4 : -Math.PI * 0.4;

  return (
    <group position={position}>
      <RigidBody
        rotation={[0, rotationAngle, 0]}
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={magentaMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
