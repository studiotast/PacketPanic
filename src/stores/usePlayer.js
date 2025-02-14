import create from "zustand";

const usePlayer = create((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),
}));

export default usePlayer;
