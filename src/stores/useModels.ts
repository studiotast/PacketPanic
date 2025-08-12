import { create } from "zustand";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelsState {
  loaded: boolean; // Add loaded as part of the interface
  straightModel: THREE.Object3D | null;
  straightShortModel: THREE.Object3D | null;
  cornerModel: THREE.Object3D | null;
  curveModel: THREE.Object3D | null;
  junctionModel: THREE.Object3D | null;
  signModel: THREE.Object3D | null;
  signPostModel: THREE.Object3D | null;
  buildingsPlatformModel: THREE.Object3D | null;
  houseModel: THREE.Object3D | null;
  flagModel: THREE.Object3D | null;
  flagAttentionModel: THREE.Object3D | null;
  platformLevel1Model: THREE.Object3D | null;
  platformLevel2Model: THREE.Object3D | null;
  platformLevel34Model: THREE.Object3D | null;
  getModels: () => ModelsState;
}

export const useModels = create<ModelsState>((set, get) => {
  // Initialize models to null
  const initialState = {
    loaded: false,
    straightModel: null,
    straightShortModel: null,
    cornerModel: null,
    curveModel: null,
    junctionModel: null,
    signModel: null,
    signPostModel: null,
    buildingsPlatformModel: null,
    houseModel: null,
    flagModel: null,
    flagAttentionModel: null,
    platformLevel1Model: null,
    platformLevel2Model: null,
    platformLevel34Model: null,
  };

  return {
    ...initialState,
    getModels: () => {
      if (get().loaded) return get();

      // Load all models
      const models = {
        straightModel: useGLTF("assets/models/track_straight_long_a03.glb")
          .scene,
        straightShortModel: useGLTF(
          "assets/models/track_straight_short_a05.glb"
        ).scene,
        cornerModel: useGLTF("assets/models/track_corner_a03.glb").scene,
        curveModel: useGLTF("assets/models/track_curve_a03.glb").scene,
        junctionModel: useGLTF("assets/models/track_junction_a06.glb").scene,
        signModel: useGLTF("assets/models/signpost_sign_a03.glb").scene,
        signPostModel: useGLTF("assets/models/signpost_pole_a03.glb").scene,
        buildingsPlatformModel: useGLTF("assets/models/gebouwen_a01.glb").scene,
        houseModel: useGLTF("assets/models/house_a02.glb").scene,
        flagModel: useGLTF("assets/models/house_flag_a02.glb").scene,
        flagAttentionModel: useGLTF(
          "assets/models/house_flag_attention_a01.glb"
        ).scene,
        platformLevel1Model: useGLTF("assets/models/platform_level1_a03.glb")
          .scene,
        platformLevel2Model: useGLTF("assets/models/platform_level2_a03.glb")
          .scene,
        platformLevel34Model: useGLTF("assets/models/platform_level3&4_a01.glb")
          .scene,
      };

      // Update the store with all the models and set loaded to true
      set({
        ...models,
        loaded: true,
      });

      return get();
    },
  };
});
