import create from "zustand";

const useBalls = create((set) => ({
  balls: [],
  addBall: (ball) => set((state) => ({ balls: [...state.balls, ball] })),
  accelerateBall: (id, direction) =>
    set((state) => {
      const updatedBalls = state.balls.map((ball) =>
        ball.id === id ? { ...ball, direction } : ball
      );
      return { balls: updatedBalls };
    }),
}));

export default useBalls;
