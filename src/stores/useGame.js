import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import levelsData from "../utils/levelsData";

const TIME_LIMIT = 45; // 45 seconds game limit

export default create(
  subscribeWithSelector((set, get) => {
    // Setup keyboard listeners
    const setupKeyboardListeners = () => {
      const handleKeyDown = (e) => {
        // Use 'P' key for pause functionality instead of Space
        if (e.code === "KeyP") {
          e.preventDefault();

          // Only handle pause toggle if in playing phase and not on cooldown
          if (get().phase === "playing" && get().canTogglePause) {
            // Prevent rapid toggling
            set({ canTogglePause: false });

            // Toggle pause state - FIXED LOGIC HERE
            set((state) => {
              const newIsPaused = !state.isPaused;
              return {
                isPaused: newIsPaused,
                timerActive: !newIsPaused, // timerActive is opposite of the NEW isPaused value
              };
            });

            // Reset debounce after delay
            setTimeout(() => set({ canTogglePause: true }), 300);
          }
        }

        if (e.code === "Escape") {
          e.preventDefault();

          // Only handle pause toggle if in playing phase and not on cooldown
          if (get().phase === "playing" && get().canTogglePause) {
            // Prevent rapid toggling
            set({ canTogglePause: false });

            // Toggle pause state - FIXED LOGIC HERE
            set((state) => {
              const newIsPaused = !state.isPaused;
              return {
                isPaused: newIsPaused,
                timerActive: !newIsPaused, // timerActive is opposite of the NEW isPaused value
              };
            });

            // Reset debounce after delay
            setTimeout(() => set({ canTogglePause: true }), 300);
          }
        }
      };

      // Use keydown for pause since it's no longer conflicting with jump
      window.addEventListener("keydown", handleKeyDown);

      // Cleanup function (for hot module reloading)
      if (typeof window !== "undefined") {
        const currentListeners = window.__gameKeyListeners || [];
        currentListeners.forEach((listener) => {
          window.removeEventListener("keyup", listener);
          window.removeEventListener("keydown", listener);
        });
        window.__gameKeyListeners = [handleKeyDown];
      }
    };

    // Setup listeners immediately
    if (typeof window !== "undefined") {
      setupKeyboardListeners();
    }

    return {
      blocksCount: 10,
      blocksSeed: 0,

      // Time
      startTime: 0,
      endTime: 0,
      timer: 0,
      timerActive: false,

      // Phases
      phase: "intro",
      isPaused: false,
      canTogglePause: true, // Used for debouncing

      // Score
      score: 0,

      // New level properties
      currentLevelId: 1,
      currentLevel: levelsData[0],

      // Toggle pause state
      togglePause: () => {
        set((state) => {
          if (state.phase === "playing") {
            const newIsPaused = !state.isPaused;
            return {
              isPaused: newIsPaused,
              timerActive: !newIsPaused, // timerActive is opposite of the NEW isPaused value
            };
          }
          return {};
        });
      },

      // Start from intro screen
      startFromIntro: () => {
        set((state) => {
          if (state.phase === "intro") {
            return { phase: "explanation" };
          }
          return {};
        });
      },

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return {
              phase: "playing",
              startTime: Date.now(),
              timer: 0,
              timerActive: true,
              isPaused: false,
            };
          }
          return {};
        });
      },

      advanceToNextLevel: () => {
        const { currentLevelId } = get();
        const nextLevelId = currentLevelId + 1;
        const nextLevel = levelsData.find((level) => level.id === nextLevelId);

        if (nextLevel) {
          set({
            currentLevelId: nextLevelId,
            currentLevel: nextLevel,
            phase: "ready",
            timer: 0,
            // Keep the score between levels
          });
        } else {
          // No more levels, game is complete
          set({ phase: "gameOver" });
        }
      },

      // Update timer value
      updateTimer: (delta) => {
        set((state) => {
          const { phase, timer, isPaused, currentLevel } = state;

          if (phase === "playing" && !isPaused) {
            const newTimer = timer + delta;

            // Check if time limit reached
            if (newTimer >= currentLevel.timeLimit) {
              return { phase: "ended", timer: newTimer };
            }

            return { timer: newTimer };
          }

          return {};
        });
      },

      // phase: "ready",

      // Score
      score: 0, // Voeg score toe

      // start: () => {
      //   set((state) => {
      //     if (state.phase === "ready") {
      //       return { phase: "playing", startTime: Date.now() };
      //     }
      //     return {};
      //   });
      // },
      completeRestart: () => {
        set({
          phase: "intro",
          blocksSeed: Math.random(),
          score: 0,
          timer: 0,
          startTime: 0,
          endTime: 0,
          timerActive: false,
          isPaused: false,
        });
      },

      // Improve the existing restart function
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return {
              phase: "ready",
              blocksSeed: Math.random(),
              timer: 0,
              score: 0,
              timerActive: false,
              isPaused: false,
            };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
      // Functie om de score te verhogen
      incrementScore: () => {
        set((state) => {
          const { score, currentLevel, phase } = state;
          const newScore = score + 10;

          // Check if level is complete based on score
          if (phase === "playing" && newScore >= currentLevel.scoreToAdvance) {
            return { phase: "levelComplete", score: newScore };
          }

          return { score: newScore };
        });
      },

      toggleMute: () => {
        set((state) => {
          return { isMuted: !state.isMuted };
        });
      },
    };
  })
);
