import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  purpleBallMaterial,
  sphereGeometry,
  yellowBallMaterial,
} from "../../Level";
import { Vector3 } from "@react-three/fiber";

interface BallProps {
  id: string;
  position: Vector3;
}

// Typing voor de ref zodat hij `applyImpulse` correct herkent
export interface BallRef {
  applyImpulse: (impulse: Vector3) => void;
}

const Ball = forwardRef<BallRef, BallProps>(({ id, position }, ref) => {
  // Ref correct typen als RigidBodyApi | null
  const ballRef = useRef<RapierRigidBody | null>(null);

  useImperativeHandle(ref, () => ({
    applyImpulse: (impulse: any) => {
      if (ballRef.current) {
        ballRef.current.applyImpulse(impulse, true);
      }
    },
  }));

  const getBallMaterial = (id: string) => {
    const color = id.split("|")[1];
    console.log(color);
    switch (color) {
      case "yellow":
        return yellowBallMaterial;
      case "purple":
        return purpleBallMaterial;
      default:
        return yellowBallMaterial;
    }
  };

  return (
    <RigidBody
      name={id}
      ref={ballRef as any} // TypeScript fix omdat RigidBody geen correcte forwardRef ondersteuning heeft
      colliders="ball"
      position={position}
    >
      <mesh
        castShadow
        geometry={sphereGeometry}
        material={getBallMaterial(id)}
      />
    </RigidBody>
  );
});

export default Ball;
