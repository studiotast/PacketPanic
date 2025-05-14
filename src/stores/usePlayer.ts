import { create } from "zustand";
import { RefObject } from "react";
import { Object3D } from "three";

// Define the type for the player store
type PlayerState = {
  playerRef: RefObject<Object3D> | null;
  setPlayerRef: (ref: RefObject<Object3D>) => void;
};

// Create the zustand store with types
const usePlayer = create<PlayerState>((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),
}));

export default usePlayer;
