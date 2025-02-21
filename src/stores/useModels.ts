import { create } from "zustand";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelsState {
  straightModel: THREE.Object3D;
  cornerModel: THREE.Object3D;
  junctionModel: THREE.Object3D;
  signPost: THREE.Object3D;
  getModels: () => ModelsState;
}
export const useModels = create<ModelsState>((set) => {
  let loaded = false;
  let models = {};

  return {
    getModels: () => {
      if (loaded) return models;

      models = {
        straightModel: useGLTF("/assets/models/tube_straight_a02.glb").scene,
        cornerModel: useGLTF("/assets/models/tube_corner_a02.glb").scene,
        junctionModel: useGLTF("/assets/models/tube_junction_a02.glb").scene,
        signPost: useGLTF("/assets/models/signPost_a02.glb").scene,
      };
      loaded = true;

      return models;
    },
  };
});
