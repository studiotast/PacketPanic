import create from "zustand";

const useBalls = create((set) => ({
  balls: [],
  addBall: (ball) => set((state) => ({ balls: [...state.balls, ball] })),
}));

export default useBalls;
