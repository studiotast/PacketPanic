import { useMemo } from "react";
import * as THREE from "three";
import BlockAxe from "./components/BlockAxe";
import BlockLimbo from "./components/BlockLimbo";
import BlockSpinner from "./components/BlockSpinner";
import Track from "./components/CustomLevel/Track";

// reusable geometries
export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// reusable materials
export const floor1Material = new THREE.MeshStandardMaterial({
  color: "limegreen",
});
export const floor2Material = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
export const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: "tomato",
});
export const wallMaterial = new THREE.MeshStandardMaterial({
  color: "slategrey",
});

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      {/* <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} /> */}
      {/* <Bounds length={count + 2} /> */}
      <Track />
    </>
  );
}
