import React from "react";
import { CuboidCollider } from "@react-three/rapier";
import { boxGeometry, obstacleMaterial } from "../../Level";
import usePlayer from "../../../stores/usePlayer";
import useBalls from "../../../stores/useBalls";

export default function Accelerator() {
  const playerRef = usePlayer((state) => state.playerRef);
  const balls = useBalls((state) => state.balls);
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
            if (intersect?.colliderObject) {
              const ballId = intersect.colliderObject.name;

              // Vind de bal met het juiste ID
              const ball = balls.find((ball) => ball.id === ballId);
              if (ball) {
                const direction =
                  ballId.split("|")[1] === "yellow"
                    ? { x: -0.02, y: 0, z: 0 }
                    : { x: 0.02, y: 0, z: 0 };

                // Toepassen van de impuls op de bal via de ref
                if (ball.ref.current) {
                  ball.ref.current.applyImpulse(direction);
                }
              }
            }
          }
        }}
      />
    </group>
  );
}
