import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { sphereGeometry, yellowBallMaterial } from "../../Level";

const Ball = forwardRef((props, ref) => {
  console.log(props.id);
  const ballRef = useRef();

  useImperativeHandle(ref, () => ({
    applyImpulse: (impulse) => {
      ballRef.current.applyImpulse(impulse);
    },
  }));

  return (
    <RigidBody
      name={props.id}
      ref={ballRef}
      colliders="ball"
      position={props.position}
    >
      <mesh
        castShadow
        geometry={sphereGeometry}
        material={yellowBallMaterial}
      />
    </RigidBody>
  );
});

export default Ball;
