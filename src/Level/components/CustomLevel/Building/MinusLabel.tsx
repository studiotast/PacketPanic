import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type MinusLabelInfo = {
  isMistakeBadActor: boolean;
  isMaliciousBadActor: boolean;
  minusScoreNumber: number;
};
interface MinusLabelProps {
  id: string;
  onRemove: (id: string) => void; // Callback om het label te verwijderen
  number?: number; // Optional number prop
  info: MinusLabelInfo; // Optional info prop
}

export default function MinusLabel({ id, onRemove, info }: MinusLabelProps) {
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
    }, 2200);

    return () => clearTimeout(timeout); // Opruimen bij unmount
  }, [id, onRemove]);

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <Html name={id} center wrapperClass="building-label-minus">
        <div className="wrapper">
          <div className="label">
            <b>- {info?.minusScoreNumber}</b>
          </div>
          <div className="comment">
            <p>@Boxing_bubbles</p>
            <p>
              Ik kom helemaal niet bij youtube uit maar een of andere vage clone
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}
