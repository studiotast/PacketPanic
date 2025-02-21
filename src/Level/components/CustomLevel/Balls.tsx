import React, { forwardRef } from "react";
import * as THREE from "three";
import Ball from "./Ball";
import useBalls from "../../../stores/useBalls"; // Zorg ervoor dat je de juiste hook importeert
import { useControls, button } from "leva";

const Balls = forwardRef(({ props }, ref) => {
  const { balls, addBall } = useBalls((state) => ({
    balls: state.balls,
    addBall: state.addBall,
  }));

  // Voeg knoppen toe om ballen te maken
  const { yellowBall, purpleBall } = useControls({
    yellowBall: button(() => {
      addBall({
        id: `${THREE.MathUtils.generateUUID()}|yellow`,
        position: [0, 5, 0], // Fixed position
        ref: React.createRef(), // Maak ref aan
      });
    }),
    purpleBall: button(() => {
      addBall({
        id: `${THREE.MathUtils.generateUUID()}|purple`,
        position: [0, 5, 0], // Fixed position
        ref: React.createRef(), // Maak ref aan
      });
    }),
  });

  return (
    <>
      {balls.map((ball) => (
        <Ball
          id={ball.id}
          key={ball.id}
          position={ball.position}
          ref={ball.ref}
        />
      ))}
    </>
  );
});

export default Balls;
