import { Euler, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { useModels } from "../../../../stores/useModels";
import * as THREE from "three";
import { purpleMaterial } from "../../../Level";

interface StraightProps {
  position?: Vector3;
  rotation?: Euler;
  numberOfSigns?: number; // Number of signs to display on the post
}

export default function SignPost({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  numberOfSigns = 2, // Default to 2 signs
}: StraightProps) {
  const {
    signPostModel2Signs,
    signPostModel3Signs,
    signPostModel4Signs,
    signPostModel5Signs,
  } = useModels((state) => state.getModels());

  // Kies het juiste model op basis van numberOfSigns
  const model = useMemo(() => {
    // console.log("nummmer bordjes", numberOfSigns);
    switch (numberOfSigns) {
      case 3:
        return signPostModel3Signs;
      case 4:
        return signPostModel4Signs;
      case 5:
        return signPostModel5Signs;
      case 2:
      default:
        return signPostModel2Signs;
    }
  }, [
    numberOfSigns,
    signPostModel2Signs,
    signPostModel3Signs,
    signPostModel4Signs,
    signPostModel5Signs,
  ]);

  // Gebruik useMemo om een gekloonde instantie te maken en het materiaal aan te passen
  const clonedModel = useMemo(() => {
    const clone = model.clone();
    const material = purpleMaterial; // Maak een nieuw materiaal met de opgegeven kleur
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material; // Pas het materiaal toe op elke mesh
      }
    });
    return clone;
  }, [model]);
  return (
    <group rotation={rotation} position={position}>
      <primitive object={clonedModel} />
    </group>
  );
}
