import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import {
  boxGeometry,
  yellowMaterial,
  magentaMaterial,
  traingleMaterial,
  triangleGeometry,
} from "../../Level";

export default function Splitter({ position = [0, -0.2, -4] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around the X-axis
          geometry={triangleGeometry}
          material={traingleMaterial}
          scale={[0.7, 0.7, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
