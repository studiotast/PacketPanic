import React, { useRef, useEffect, useMemo } from "react";
import { CuboidCollider } from "@react-three/rapier";
import { boxGeometry, obstacleMaterial } from "../../Level";
import useBalls from "../../../stores/useBalls";
import Sign from "./Sign";

export default function Accelerator({ colors }: { colors: string[] }) {
  const balls = useBalls((state) => state.balls);
  const directionsRef = useRef<boolean[]>([]);

  useMemo(() => {
    // Richtingen initialiseren op basis van het aantal kleuren
    const initialDirections = colors.map((_, index) => index % 2 === 0); // Alternating true/false
    directionsRef.current = initialDirections;
    console.log(directionsRef);
  }, [colors]);

  function onClickSign(index: number) {
    console.log("geklikt", index, directionsRef.current[index]);
    directionsRef.current[index] = !directionsRef.current[index];
  }

  return (
    <group position={[0, 0.5, -1.2]}>
      <mesh
        geometry={boxGeometry}
        scale={[0.25, 0.25, 0.25]}
        material={obstacleMaterial}
      />
      <CuboidCollider
        args={[0.125, 0.125, 0.125]}
        sensor
        onIntersectionEnter={(intersect) => {
          if (intersect?.colliderObject) {
            const ballId = intersect.colliderObject.name;
            const ballColor = ballId.split("|")[1];

            const ball = balls.find((ball) => ball.id === ballId);
            if (ball) {
              const colorIndex = colors.indexOf(ballColor);
              if (colorIndex !== -1) {
                const direction = directionsRef.current[colorIndex]
                  ? { x: 0.02, y: 0, z: 0 }
                  : { x: -0.02, y: 0, z: 0 };

                if (ball.ref.current) {
                  ball.ref.current.applyImpulse(direction);
                }
              }
            }
          }
        }}
      />
      {colors.map((color, index) => (
        <Sign
          key={index}
          color={color}
          position={[0, 0.25 * (index - 0.5), 0]}
          ref={directionsRef}
          index={index}
          // rotation={[0, directionsRef.current[index] ? Math.PI : 0, 0]}
          onClick={() => onClickSign(index)}
        />
      ))}
    </group>
  );
}
