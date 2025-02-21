import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import {
  purpleBallMaterial,
  sphereGeometry,
  yellowBallMaterial,
} from "../../Level";
import { useFrame } from "@react-three/fiber";

const Ball = forwardRef((props, ref) => {
  const { id, position, direction } = props;
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

  // Gebruik useFrame voor voortdurende updates van de positie
  useFrame(() => {
    if (ballRef.current && direction) {
      // Verhoog de snelheid van de bal
      ballRef.current.applyImpulse(direction);
    }
  });

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
