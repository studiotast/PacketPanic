import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { sphereGeometry } from "../../Level";
import { Vector3 } from "@react-three/fiber";
import { getColorMaterial } from "../../../utils/getColorMaterial";
import { useFrame } from "@react-three/fiber";
import useBalls from "../../../stores/useBalls";

interface BallProps {
  id: string;
  position: Vector3;
  velocity?: Vector3;
}

// Typing for the ref so it correctly recognizes `applyImpulse`
export interface BallRef {
  applyImpulse: (impulse: Vector3) => void;
}

const Ball = forwardRef<BallRef, BallProps>(
  ({ id, position, velocity }, ref) => {
    // Correctly type the ref as RapierRigidBody | null
    const ballRef = useRef<RapierRigidBody | null>(null);
    // Use ref instead of state to track if velocity was applied
    const velocityApplied = useRef(false);

    // Apply velocity using useFrame to ensure RigidBody is initialized
    useFrame(() => {
      // Apply velocity only once when body is ready
      if (ballRef.current && !velocityApplied.current && velocity) {
        // console.log(`Applying velocity to ball ${id}:`, velocity);

        // Apply strong impulse
        ballRef.current.applyImpulse(
          {
            x: velocity[0] || 0,
            y: velocity[1] || 0,
            z: velocity[2] || 0,
          },
          true
        );

        // Also set linear velocity directly as backup
        ballRef.current.setLinvel(
          {
            x: (velocity[0] || 0) / 10,
            y: (velocity[1] || 0) / 10,
            z: (velocity[2] || 0) / 10,
          },
          true
        );

        // Mark as applied using ref
        velocityApplied.current = true;
      }
    });

    // Remove balls that fall too far
    useFrame(() => {
      if (ballRef.current && ballRef.current.translation().y < -10) {
        const removeBall = useBalls.getState().removeBall;
        if (removeBall) {
          removeBall(id);
        }
      }
    });

    // Keep the imperative handle as requested
    useImperativeHandle(ref, () => ({
      applyImpulse: (impulse: any) => {
        if (ballRef.current) {
          ballRef.current.applyImpulse(impulse, true);
        }
      },
    }));

    return (
      <RigidBody
        name={id}
        ref={ballRef as any} // TypeScript fix because RigidBody doesn't have proper forwardRef support
        colliders="ball"
        position={position}
        // restitution={0.2} // Add some bounce
        // friction={1} // Add friction for realistic movement
        linearDamping={0.05} // REDUCED to allow more movement
        angularDamping={0.1} // REDUCED to allow more rotation
        // mass={5} // LOWER mass for better response to impulses
        // gravityScale={0.8} // Slightly reduced gravity effect
      >
        <mesh
          castShadow
          geometry={sphereGeometry}
          material={getColorMaterial(id.split("|")[1])}
        />
      </RigidBody>
    );
  }
);

export default Ball;
