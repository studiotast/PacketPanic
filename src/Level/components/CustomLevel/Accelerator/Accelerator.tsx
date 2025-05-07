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
    playSound("woosh");
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
      <group rotation={[0, Math.PI * 0.25, 0]} position={[0, 0, 0.7]}>
        {/* <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh> */}
        <CuboidCollider
          args={[0.75, 0.75, 0.75]}
          sensor
          onIntersectionEnter={(intersect) => {
            // console.log("Intersection detected with accelerator");
            playSound("boost");
            if (intersect?.colliderObject) {
              const ballId = intersect.colliderObject.name;
              const ballColor = ballId.split("|")[1];

              const ball = balls.find((ball) => ball.id === ballId);
              if (ball) {
                const colorIndex = colors.indexOf(ballColor);
                if (colorIndex !== -1) {
                  const direction = directions[colorIndex]
                    ? { x: 7.8, y: 0, z: -2.2 }
                    : { x: -7.8, y: 0, z: -2.2 };

                  if (ball.ref.current) {
                    ball.ref.current.applyImpulse(direction);
                  }
                }
              }
            }
          }}
        />
      </group>
      <SignPost position={[0, -1, 0]} />
      {colors.map((color, index) => (
        <Sign
          key={index}
          color={color}
          position={[0, 4.4 + 1.3 * (index - (colors.length - 1) / 2), 0]}
          direction={directions[index]}
          onClick={() => onClickSign(index)}
        />
      ))}
    </group>
  );
}
