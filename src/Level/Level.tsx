import * as THREE from "three";
import useGame from "../stores/useGame";
import TrackLevel1 from "./components/CustomLevel/Tracks/TrackLevel1/TrackLevel1";
import TrackLevel2 from "./components/CustomLevel/Tracks/TrackLevel2/TrackLevel2";
import TrackLevel34 from "./components/CustomLevel/Tracks/TrackLevel34/TrackLevel34";

// reusable geometries
export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const sphereGeometry = new THREE.SphereGeometry(0.66, 16, 16);
export const triangleGeometry = new THREE.BufferGeometry();

// Define the vertices of the 3D triangle
const vertices = new Float32Array([
  0,
  1,
  0, // Vertex 1
  -1,
  -1,
  0, // Vertex 2
  1,
  -1,
  0, // Vertex 3
  0,
  1,
  1, // Vertex 4 (same as Vertex 1 but with height)
  -1,
  -1,
  1, // Vertex 5 (same as Vertex 2 but with height)
  1,
  -1,
  1, // Vertex 6 (same as Vertex 3 but with height)
]);

// Define the indices for the faces of the 3D triangle
const indices = [
  0,
  1,
  2, // Bottom face
  3,
  4,
  5, // Top face
  0,
  1,
  4,
  3, // Side face 1
  1,
  2,
  5,
  4, // Side face 2
  2,
  0,
  3,
  5, // Side face 3
];

// Create the geometry and set the vertices and indices
triangleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
triangleGeometry.setIndex(indices);
triangleGeometry.computeVertexNormals(); // Compute normals for shading

// reusable materials
export const beigeMaterial = new THREE.MeshStandardMaterial({
  color: "#EBD8BD",
});
export const yellowMaterial = new THREE.MeshStandardMaterial({
  color: "#FFAB32",
});
export const pinkMaterial = new THREE.MeshStandardMaterial({
  color: "#FFB5ED",
});
export const blueMaterial = new THREE.MeshStandardMaterial({
  color: "#425ADF",
});
export const greenMaterial = new THREE.MeshStandardMaterial({
  color: "#4AF01C",
});
export const redMaterial = new THREE.MeshStandardMaterial({
  color: "#E72754",
});
export const magentaMaterial = new THREE.MeshStandardMaterial({
  color: "#FF2DCA",
});
export const purpleMaterial = new THREE.MeshStandardMaterial({
  color: "#b19bff",
});

export const whiteMaterial = new THREE.MeshStandardMaterial({
  color: "white",
});
export const traingleMaterial = new THREE.MeshStandardMaterial({
  color: "tomato",
  side: THREE.DoubleSide, // Ensure both sides are rendered
});

export default function Level() {
  const currentLevelId = useGame((state) => state.currentLevelId);

  return (
    <>
      {currentLevelId == 1 && <TrackLevel1 />}
      {currentLevelId == 2 && <TrackLevel2 />}
      {currentLevelId == 3 && <TrackLevel34 />}
      {currentLevelId == 4 && <TrackLevel34 />}
    </>
  );
}
