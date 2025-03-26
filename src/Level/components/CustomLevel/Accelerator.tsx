import React, { useState } from "react";
import { CuboidCollider } from "@react-three/rapier";
import { boxGeometry, obstacleMaterial } from "../../Level";
import useBalls from "../../../stores/useBalls";
import Sign from "./Sign";

export default function Accelerator({
  position = [0, 0.5, -1.2],
  colors,
}: {
  position?: [number, number, number];
  colors: string[];
}) {
  const balls = useBalls((state) => state.balls);

  const [directions, setDirections] = useState<boolean[]>(() =>
    colors.map((_, index) => index % 2 === 0)
  );

  function onClickSign(index: number) {
    setDirections((prev) => prev.map((dir, i) => (i === index ? !dir : dir)));
  }

  return (
    <group position={position}>
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
                const direction = directions[colorIndex]
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
          position={[0, 0.25 * (index - (colors.length - 1) / 2), 0]}
          rotation={[0, directions[index] ? 0 : Math.PI, 0]}
          onClick={() => onClickSign(index)}
        />
      ))}
    </group>
  );
}
