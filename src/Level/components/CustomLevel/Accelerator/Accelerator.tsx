import { CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import useBalls from "../../../../stores/useBalls";
import useGame from "../../../../stores/useGame";
import Sign from "./Sign";
import SignPost from "./SignPost";
import useAcceleratorColors from "../hooks/useAcceleratorColors";

export default function Accelerator({
  position = [0, 0.5, -1.2],
  colors,
}: {
  position?: [number, number, number];
  colors: string[];
}) {
  const balls = useBalls((state) => state.balls);
  const playSound = useGame((state) => state.playSound);

  // Get dynamic colors from the timeline
  const { currentColors } = useAcceleratorColors({
    initialColors: colors,
  });

  // State to store the current directions
  const [directions, setDirections] = useState<boolean[]>([]);

  // Ref to keep track of user-modified directions
  const userDirectionsRef = useRef<Record<string, boolean>>({});

  // Update directions when colors change, but keep user modifications
  useEffect(() => {
    console.log("Accelerator colors updated:", currentColors);

    setDirections(
      currentColors.map((color, index) => {
        // If user has modified this color's direction, use that value
        if (color in userDirectionsRef.current) {
          return userDirectionsRef.current[color];
        }
        // Otherwise, use default (alternating directions)
        return index % 2 === 0;
      })
    );
  }, [currentColors]);

  function onClickSign(index: number) {
    playSound("woosh");

    // Update directions state
    setDirections((prev) => {
      const newDirections = [...prev];
      newDirections[index] = !newDirections[index];

      // Store this user modification in the ref
      if (index < currentColors.length) {
        userDirectionsRef.current[currentColors[index]] = newDirections[index];
      }

      return newDirections;
    });
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
                const colorIndex = currentColors.indexOf(ballColor);
                if (colorIndex !== -1) {
                  const direction = directions[colorIndex]
                    ? { x: 7.8, y: 0, z: -1.4 }
                    : { x: -7.8, y: 0, z: -1.4 };

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
      {currentColors.map((color, index) => (
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
