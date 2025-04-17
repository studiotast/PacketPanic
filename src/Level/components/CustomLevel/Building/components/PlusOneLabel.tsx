import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

interface PlusOneLabelProps {
  id: string;
  onRemove: (id: string) => void; // Callback om het label te verwijderen
}

export default function PlusOneLabel({ id, onRemove }: PlusOneLabelProps) {
  const positionRef = useRef<[number, number, number]>([0, 3, 0]); // Startpositie

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (positionRef.current) {
      // console.log(positionRef.current[1]);
      positionRef.current[1] += time + delta * 2;
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
    <Html
      name={id}
      position={positionRef.current}
      center
      wrapperClass="building-label"
    >
      <b>+ 1</b>
    </Html>
  );
}
