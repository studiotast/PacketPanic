import { BallCollider, CuboidCollider, Debug } from "@react-three/rapier";
import React, { useState } from "react";
import useBalls from "../../../../stores/useBalls";
import Sign from "./Sign";
import SignPost from "./SignPost";
import useGame from "../../../../stores/useGame";
import { boxGeometry, magentaMaterial } from "../../../Level";

export default function Accelerator({
  position = [0, 0.5, -1.2],
  colors,
}: {
  position?: [number, number, number];
  colors: string[];
}) {
  const balls = useBalls((state) => state.balls);
  const playSound = useGame((state) => state.playSound);

  const [directions, setDirections] = useState<boolean[]>(() =>
    colors.map((_, index) => index % 2 === 0)
  );

  function onClickSign(index: number) {
    setDirections((prev) => prev.map((dir, i) => (i === index ? !dir : dir)));
  }

  return (
    <group position={position}>
      {/* <mesh
        position={[0, 0, 0.9]}
        geometry={boxGeometry}
        scale={[1.5, 1.5, 1.5]}
        material={magentaMaterial}
      /> */}
      {/* Toon de collider met een Box-mesh */}
      <mesh position={[0, 0, 0.9]} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshBasicMaterial color="blue" wireframe />
      </mesh>
      <BallCollider
        args={[0.75]} // Straal van de bol
        position={[0, 0, 0.9]}
        sensor
        onIntersectionEnter={(intersect) => {
          console.log("Intersection detected with accelerator");
          playSound("boost");
          if (intersect?.colliderObject) {
            const ballId = intersect.colliderObject.name;
            const ballColor = ballId.split("|")[1];

            const ball = balls.find((ball) => ball.id === ballId);
            if (ball) {
              const colorIndex = colors.indexOf(ballColor);
              if (colorIndex !== -1) {
                const direction = directions[colorIndex]
                  ? { x: 6, y: 0, z: -2 }
                  : { x: -6, y: 0, z: -2 };

                if (ball.ref.current) {
                  ball.ref.current.applyImpulse(direction);
                }
              }
            }
          }
        }}
      />
      <SignPost position={[0, -1, 0]} />
      {colors.map((color, index) => (
        <Sign
          key={index}
          color={color}
          position={[0, 4.4 + 1.3 * (index - (colors.length - 1) / 2), 0]}
          rotation={[0, (directions[index] ? 0 : Math.PI) - Math.PI * 0.5, 0]}
          onClick={() => onClickSign(index)}
        />
      ))}
    </group>
  );
}
