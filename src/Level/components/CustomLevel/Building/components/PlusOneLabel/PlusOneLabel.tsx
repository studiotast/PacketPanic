import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./PlusOneLabel.module.scss";
import { getColor } from "@/utils/getColor";

interface PlusOneLabelProps {
  id: string;
  onRemove: (id: string) => void; // Callback om het label te verwijderen
  color?: string; // Optional color prop
}

export default function PlusOneLabel({
  id,
  onRemove,
  color,
}: PlusOneLabelProps) {
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

  // console.log(color);
  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <Html
        name={id}
        style={{ color: getColor(color ? color : "blue") }}
        center
        wrapperClass={styles.buildingLabel}
      >
        <b>+ 1</b>
      </Html>
    </group>
  );
}
