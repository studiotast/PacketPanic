import { Vector3 } from "@react-three/fiber";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useModels } from "../../../../stores/useModels";
import { getColorMaterial } from "../../../../utils/getColorMaterial";
import gsap from "gsap";

interface SignProps {
  position?: Vector3;
  direction: boolean;
  color: string;
  onClick: () => void;
}

const Sign = forwardRef<any, SignProps>(
  ({ position = [0, 0, 0], color, onClick, direction }, ref) => {
    const { signModel } = useModels((state) => state.getModels());
    const groupRef = useRef<THREE.Group>(null); // Ref for the group

    const clonedModel = useMemo(() => {
      const clone = signModel.clone();
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = getColorMaterial(color);
        }
      });
      return clone;
    }, [signModel, color]);

    useEffect(() => {
      if (groupRef.current) {
        // Calculate the target rotation based on the direction
        const targetRotationY = (direction ? 0 : Math.PI) - Math.PI * 0.5;

        // Animate the rotation using GSAP
        gsap.to(groupRef.current.rotation, {
          y: targetRotationY,
          duration: 0.5, // Animation duration
          ease: "power2.out", // Easing function
        });
      }
    }, [direction]); // Run this effect when direction changes

    return (
      <group
        ref={groupRef} // Attach the ref to the group
        onClick={(e) => {
          e.stopPropagation(); // voorkomt doorklikken naar achterliggende signs
          onClick();
        }}
        position={position}
        scale={[1, 1, 1]}
      >
        <primitive object={clonedModel} />
      </group>
    );
  }
);

export default Sign;
