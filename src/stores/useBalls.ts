import { create } from "zustand";
import { RefObject } from "react";
import { Object3D, Vector3 } from "three";

// Define the type for a ball object in the store
type Ball = {
  id: string | number;
  ref: RefObject<{
    position: Vector3;
    [key: string]: any;
  }>;
  color?: string;
  [key: string]: any;
};

// Define the store state and actions
type BallsState = {
  balls: Ball[];
  addBall: (ball: Ball) => void;
  removeBall: (id: string | number) => void;
  clearBalls: () => void;
  cleanupBalls: () => void;
};

// Create the zustand store with types
const useBalls = create<BallsState>((set) => ({
  balls: [],

  addBall: (ball) => set((state) => ({ balls: [...state.balls, ball] })),

  // Remove a ball based on its id
  removeBall: (id) => {
    set((state) => ({
      balls: state.balls.filter((ball) => ball.id !== id),
    }));
  },

  clearBalls: () => {
    set({ balls: [] });
  },

  // Clean up balls that have fallen below a certain Y position
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

export default useBalls;
