import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { RigidBody } from "@react-three/rapier";

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
      <mesh castShadow>
        {/* <icosahedronGeometry args={[0.3, 1]} /> */}
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          //flatShading
          color={"yellow"}
        />
      </mesh>
    </RigidBody>
  );
});

export default Ball;
