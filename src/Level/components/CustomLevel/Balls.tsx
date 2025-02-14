import React, { useState, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import Ball from "./Ball";

const Balls = forwardRef((props, ref) => {
  const [balls, setBalls] = useState([]);

  const addBall = () => {
    const newBall = {
      id: THREE.MathUtils.generateUUID(),
      position: [0, 5, 0], // Fixed position
      ref: React.createRef(),
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  };

  useImperativeHandle(ref, () => ({
    addBall,
  }));

  return (
    <>
      {balls.map((ball) => (
        <Ball
          id={ball.id}
          key={ball.id}
          ref={ball.ref}
          position={ball.position}
        />
      ))}
    </>
  );
});

export default Balls;
