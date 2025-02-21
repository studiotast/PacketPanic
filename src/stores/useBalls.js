import create from "zustand";

const useBalls = create((set) => ({
  balls: [],
  addBall: (ball) => set((state) => ({ balls: [...state.balls, ball] })),
  // Verwijder een bal op basis van de id
  removeBall: (id) =>
    set((state) => ({
      balls: state.balls.filter((ball) => ball.id !== id),
    })),
}));

export default useBalls;
