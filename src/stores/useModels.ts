import { create } from "zustand";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelsState {
  straightModel: THREE.Object3D;
  straightShortModel: THREE.Object3D;
  cornerModel: THREE.Object3D;
  curveModel: THREE.Object3D;
  junctionModel: THREE.Object3D;
  signModel: THREE.Object3D;
  signPostModel: THREE.Object3D;
  getModels: () => ModelsState;
}
export const useModels = create<ModelsState>((set) => {
  let loaded = false;
  let models = {};

  return {
    getModels: () => {
      if (loaded) return models;

      models = {
        straightModel: useGLTF("assets/models/track_straight_long_a01.glb")
          .scene,
        straightShortModel: useGLTF(
          "assets/models/track_straight_short_a01.glb"
        ).scene,
        cornerModel: useGLTF("assets/models/track_corner_a01.glb").scene,
        curveModel: useGLTF("assets/models/track_curve_a01.glb").scene,
        junctionModel: useGLTF("assets/models/track_junction_a01.glb").scene,
        signModel: useGLTF("assets/models/signpost_sign_a01.glb").scene,
        signPostModel: useGLTF("assets/models/signpost_pole_a01.glb").scene,
      };
      loaded = true;

      return models;
    },
  };
});
