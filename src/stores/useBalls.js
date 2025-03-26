import { create } from "zustand";

export default create((set) => ({
  balls: [],
  addBall: (ball) => set((state) => ({ balls: [...state.balls, ball] })),
  // Verwijder een bal op basis van de id
  removeBall: (id) => {
    set((state) => ({
      balls: state.balls.filter((ball) => ball.id !== id),
    }));
  },

  clearBalls: () => {
    set({ balls: [] });
  },

  // Optional: Add a method to clean up balls that have fallen below a certain Y position
  cleanupBalls: () => {
    set((state) => ({
      balls: state.balls.filter((ball) => {
        // If we have a ref and can check position, filter out balls below -10
        if (ball.ref.current) {
          const position = ball.ref.current.position;
          return position.y > -10;
        }
        return true; // Keep balls without refs
      }),
    }));
  },
}));
