import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import {
  purpleBallMaterial,
  sphereGeometry,
  yellowBallMaterial,
} from "../../Level";

const Ball = forwardRef((props, ref) => {
  console.log(props.id);
  const ballRef = useRef();

  useImperativeHandle(ref, () => ({
    applyImpulse: (impulse) => {
      ballRef.current.applyImpulse(impulse);
    },
  }));

  const getBallMaterial = (id) => {
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
      name={props.id}
      ref={ballRef}
      colliders="ball"
      position={props.position}
    >
      <mesh
        castShadow
        geometry={sphereGeometry}
        material={getBallMaterial(props.id)}
      />
    </RigidBody>
  );
});

export default Ball;
