import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlusOneLabelProps {
  id: string;
  onRemove: (id: string) => void; // Callback om het label te verwijderen
}

export default function PlusOneLabel({ id, onRemove }: PlusOneLabelProps) {
  const groupRef = useRef<THREE.Group>(null); // Ref for the group

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y += 5 * delta;
    }
  });

  useEffect(() => {
    // Verwijder het label na 1 seconde
    const timeout = setTimeout(() => {
      onRemove(id);
    }, 1000);

    return () => clearTimeout(timeout); // Opruimen bij unmount
  }, [id, onRemove]);

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <Html name={id} center wrapperClass="building-label">
        <b>+ 1</b>
      </Html>
    </group>
  );
}
