import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { StateCreator } from "zustand";
import { Howl, Howler } from "howler";
import levelsData from "../utils/levelsData";
import { LevelData, ColorConfig } from "../utils/levelsData";
import * as THREE from "three";

// Define types for timeline scenes in a level
interface TimeLineScene {
  time: number;
  spawnRate?: number;
  ballColors?: string[];
  buildingColors?: BuildingConfig[];
}

// Define the TimeLine type
interface TimeLine {
  [key: string]: TimeLineScene;
}

// Define building config for type safety
interface BuildingConfig {
  name: string;
  position?: [number, number, number];
  colors: ColorConfig[];
}

interface SpawnerConfig {
  position: [number, number, number];
  ballColors: string[];
}

interface AcceleratorConfig {
  position: [number, number, number];
  colors: string[];
}

// Define audio elements using Howler.js
type GameSounds = {
  level: Howl | null;
  menu: Howl | null;
  inHole: Howl | null;
  boost: Howl | null;
  score: Howl | null;
  button: Howl | null;
  woosh: Howl | null;
  countDown: Howl | null;
  garageOpen: Howl | null;
  garageClose: Howl | null;
  robotTalking1: Howl | null;
  robotTalking2: Howl | null;
  robotTalking3: Howl | null;
  flagAppear: Howl | null;
  flagDisappear: Howl | null;
  failScore: Howl | null;
};

// Define game phases
type GamePhase =
  | "intro"
  | "explanation"
  | "tutorial"
  | "ready"
  | "playing"
  | "pause"
  | "ended"
  | "gameFinished"
  | "levelComplete"
  | "levelPicker"
  | "about";

// Define the scene calculation return type
interface SceneCalculation {
  spawnRate: number;
  colors: string[];
}

// Define the game state
interface GameState {
  blocksCount: number;
  blocksSeed: number;

  // Time
  startTime: number;
  endTime: number;
  timer: number;
  timerActive: boolean;

  // Phases
  phase: GamePhase;
  isPaused: boolean;
  canTogglePause: boolean;

  // Mute
  isMuted: boolean;

  // Sounds
  sounds: GameSounds;

  // Score
  score: number;

  // BadActor count
  badActorCount: number;

  // Level data
  currentLevelId: number;
  currentLevel: LevelData;

  // Methods
  playSound: (
    soundName: keyof GameSounds,
    options?: { volume?: number; rate?: number; interrupt?: boolean }
  ) => boolean;
  togglePause: () => void;
  saveCurrentLevel: () => void;
  aboutPage: () => void;
  loadSavedLevel: () => boolean;
  hasSavedLevel: () => boolean;
  getSavedLevelId: () => number | null;
  startFromIntro: () => void;
  startTutorial: () => void;
  start: () => void;
  advanceToNextLevel: () => void;
  updateTimer: (delta: number) => void;
  completeRestart: () => void;
  levelPicker: () => void;
  levelSelect: (levelId: number) => boolean;
  calculateScene: () => SceneCalculation;
  restart: () => void;
  end: () => void;
  incrementScore: () => void;
  decrementScore: (minusScoreNumber?: number) => void;
  stopSound: (soundName: keyof GameSounds) => boolean;
  toggleMute: () => void;
  incrementBadActorCount: () => void;
}

// Create the game store with TypeScript types
type GameStateCreator = StateCreator<
  GameState,
  [["zustand/subscribeWithSelector", never]],
  []
>;

const useGame = create<GameState>()(
  subscribeWithSelector((set, get) => {
    // Initialize audio elements with Howler.js
    const createHowl = (src: string, options: any = {}): Howl | null => {
      if (typeof window === "undefined") return null;

      return new Howl({
        src: [src],
        volume: options.volume || 0.5,
        loop: options.loop || false,
        sprite: options.sprite || undefined,
        pool: options.pool || 5, // Create a pool of 5 instances for simultaneous playback
        preload: true,
        html5: false, // Use Web Audio API for better performance
        ...options,
      });
    };

    // Create sound instances with appropriate settings
    const sounds: GameSounds = {
      level: createHowl("/audio/level.wav", { loop: true, volume: 0.3 }),
      menu: createHowl("/audio/menu.wav", { loop: true, volume: 0.3 }),
      inHole: createHowl("/audio/in-hole.wav", { pool: 10 }),
      boost: createHowl("/audio/boost.wav", { pool: 10 }),
      score: createHowl("/audio/score.wav", { pool: 5 }),
      button: createHowl("/audio/button.wav", { pool: 3 }),
      woosh: createHowl("/audio/quick-woosh.wav", { pool: 5 }),
      countDown: createHowl("/audio/count-down.wav", { pool: 1 }),
      garageOpen: createHowl("/audio/garage-open.wav", { pool: 2 }),
      garageClose: createHowl("/audio/garage-close.wav", { pool: 2 }),
      robotTalking1: createHowl("/audio/robot-talking.wav", { pool: 1 }),
      robotTalking2: createHowl("/audio/robot-talking2.wav", { pool: 1 }),
      robotTalking3: createHowl("/audio/robot-talking3.wav", { pool: 1 }),
      flagAppear: createHowl("/audio/flag-appear.wav", { pool: 8 }),
      flagDisappear: createHowl("/audio/flag-disappear.wav", { pool: 8 }),
      failScore: createHowl("/audio/fail-score.wav", { pool: 5 }),
    };

    // Setup keyboard listeners
    const setupKeyboardListeners = () => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Use 'P' key for pause functionality instead of Space
        if (e.code === "KeyP") {
          e.preventDefault();

          // Only handle pause toggle if in playing phase and not on cooldown
          if (get().phase === "playing" && get().canTogglePause) {
            // Prevent rapid toggling
            set({ canTogglePause: false });

            // Toggle pause state
            set((state) => {
              const newIsPaused = !state.isPaused;
              return {
                isPaused: newIsPaused,
                timerActive: !newIsPaused,
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

            // Toggle pause state
            set((state) => {
              const newIsPaused = !state.isPaused;
              return {
                isPaused: newIsPaused,
                timerActive: !newIsPaused,
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
        const currentListeners = (window as any).__gameKeyListeners || [];
        currentListeners.forEach((listener: EventListener) => {
          window.removeEventListener("keyup", listener);
          window.removeEventListener("keydown", listener);
        });
        (window as any).__gameKeyListeners = [handleKeyDown];
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
      canTogglePause: true,

      // Mute
      isMuted: false,

      // Sounds
      sounds,

      // Score
      score: 0,

      // BadActor count
      badActorCount: 0,

      // New level properties
      currentLevelId: 1,
      currentLevel: levelsData[0],

      // Enhanced playSound function with Howler.js
      playSound: (
        soundName: keyof GameSounds,
        options: { volume?: number; rate?: number; interrupt?: boolean } = {}
      ): boolean => {
        const { sounds, isMuted } = get();
        const sound = sounds[soundName];

        if (sound && !isMuted) {
          try {
            // Stop current sound if interrupt is true
            if (options.interrupt && sound.playing()) {
              sound.stop();
            }

            // Set volume if provided
            if (options.volume !== undefined) {
              sound.volume(options.volume);
            }

            // Set playback rate if provided
            if (options.rate !== undefined) {
              sound.rate(options.rate);
            }

            // Play the sound
            const soundId = sound.play();

            // For non-looping sounds, reset volume after playing
            if (!sound.loop && options.volume !== undefined) {
              sound.once("end", () => {
                sound.volume(0.5); // Reset to default volume
              });
            }

            return true;
          } catch (err) {
            console.error("Error playing sound:", err);
            return false;
          }
        }

        return false;
      },

      // Toggle pause state
      togglePause: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "pause") {
            const newIsPaused = !state.isPaused;
            return {
              isPaused: newIsPaused,
              timerActive: !newIsPaused,
            };
          }
          return {};
        });
      },

      // Save current level to localStorage
      saveCurrentLevel: () => {
        const { currentLevelId } = get();
        try {
          localStorage.setItem(
            "packetPanicSavedLevel",
            currentLevelId.toString()
          );
          console.log("Saved level:", currentLevelId);
        } catch (e) {
          console.error("Failed to save level to localStorage:", e);
        }
      },

      aboutPage: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "pause") {
            return { phase: "about" };
          }
          return {};
        });
      },

      // Load level from localStorage
      loadSavedLevel: (): boolean => {
        try {
          const savedLevelId = localStorage.getItem("packetPanicSavedLevel");
          if (savedLevelId) {
            const levelId = parseInt(savedLevelId, 10);
            const level = levelsData.find((level) => level.id === levelId);
            if (level) {
              set({
                currentLevelId: levelId,
                currentLevel: level as LevelData,
              });
              return true;
            }
          }
          return false;
        } catch (e) {
          console.error("Failed to load level from localStorage:", e);
          return false;
        }
      },

      // Check if there's a saved level
      hasSavedLevel: (): boolean => {
        try {
          const savedLevel = localStorage.getItem("packetPanicSavedLevel");
          return !!savedLevel;
        } catch (e) {
          return false;
        }
      },

      // Get saved level ID
      getSavedLevelId: (): number | null => {
        try {
          const savedLevel = localStorage.getItem("packetPanicSavedLevel");
          return savedLevel ? parseInt(savedLevel, 10) : null;
        } catch (e) {
          return null;
        }
      },

      // Start from intro screen
      startFromIntro: () => {
        set((state) => {
          if (state.phase === "intro") {
            return { phase: "explanation" };
          }
          if (state.isPaused) {
            return { phase: "intro", isPaused: false };
          }
          return {};
        });
      },

      startTutorial: () => {
        set((state) => {
          if (state.phase === "explanation") {
            return { phase: "tutorial" };
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

      advanceToNextLevel: (): void => {
        const { currentLevelId } = get();
        const nextLevelId = currentLevelId + 1;
        const nextLevel = levelsData.find((level) => level.id === nextLevelId);

        if (nextLevel) {
          set({
            currentLevelId: nextLevelId,
            currentLevel: nextLevel as LevelData,
            phase: "explanation",
            timer: 0,
            score: 0,
            badActorCount: 0,
          });

          // Save progress to localStorage
          get().saveCurrentLevel();
        }
      },

      // Update timer value
      updateTimer: (delta: number): void => {
        set((state) => {
          const { phase, timer, isPaused, currentLevel } = state;

          if (phase === "playing" && !isPaused) {
            const newTimer = timer + delta;

            // Check if points limit reached
            if (state.score >= currentLevel.scoreToAdvance) {
              return { phase: "ended", timer: newTimer };
            }

            // Check if time limit reached
            if (newTimer >= currentLevel.timeLimit) {
              return { phase: "ended", timer: newTimer };
            }

            return { timer: newTimer };
          }

          return {};
        });
      },

      completeRestart: () => {
        set({
          phase: "intro",
          blocksSeed: Math.random(),
          score: 0,
          badActorCount: 0,
          timer: 0,
          startTime: 0,
          endTime: 0,
          timerActive: false,
          isPaused: false,
        });
        // clear saved level in localStorage
        try {
          localStorage.removeItem("packetPanicSavedLevel");
        } catch (e) {
          console.error("Failed to clear saved level from localStorage:", e);
        }
      },

      levelPicker: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "pause") {
            return { phase: "levelPicker" };
          }
          return {};
        });
      },

      levelSelect: (levelId: number): boolean => {
        const level = levelsData.find((level) => level.id === levelId);

        if (level) {
          set({
            currentLevelId: levelId,
            currentLevel: level as LevelData,
            phase: "explanation",
            timer: 0,
            score: 0,
            badActorCount: 0,
            isPaused: false,
          });

          return true;
        }

        return false;
      },

      calculateScene: (): SceneCalculation => {
        const { timer, currentLevel } = get();

        // Safety check if timeLine doesn't exist
        if (!currentLevel.timeLine) {
          return {
            spawnRate: 2.5,
            colors: currentLevel.trackConfig.buildings
              .map((b) => b.colors.map((c: ColorConfig) => c.color))
              .flat(),
          };
        }

        const timeLine = currentLevel.timeLine as unknown as Record<
          string,
          TimeLineScene
        >;

        // Get all scene keys and sort them by time
        const sceneKeys = Object.keys(timeLine)
          .filter((key) => key.startsWith("scene"))
          .sort((a, b) => {
            return timeLine[a].time - timeLine[b].time;
          });

        // Before the first scene
        if (timer < timeLine[sceneKeys[0]].time) {
          return {
            spawnRate: timeLine[sceneKeys[0]].spawnRate || 2.5,
            colors: currentLevel.trackConfig.spawner.ballColors,
          };
        }

        // Find current scene
        let currentSceneKey = sceneKeys[0];

        for (let i = 0; i < sceneKeys.length; i++) {
          const sceneKey = sceneKeys[i];
          const nextSceneKey = sceneKeys[i + 1];

          if (!nextSceneKey || timer < timeLine[nextSceneKey].time) {
            currentSceneKey = sceneKey;
            break;
          }
        }

        return {
          spawnRate: timeLine[currentSceneKey].spawnRate || 2.5,
          colors: timeLine[currentSceneKey].ballColors || [],
        };
      },

      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return {
              phase: "ready",
              timer: 0,
              score: 0,
              badActorCount: 0,
              isPaused: false,
            };
          }
          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === "ended") {
            return { phase: "gameFinished" };
          }
          return {};
        });
      },

      incrementScore: () => {
        set((state) => {
          const { score, currentLevel, phase } = state;
          const newScore = score + 10;
          return { score: newScore };
        });
      },

      decrementScore: (minusScoreNumber: number = 5): void => {
        set((state) => {
          const { score } = state;
          const newScore = Math.max(0, score - minusScoreNumber);
          return { score: newScore };
        });
      },

      incrementBadActorCount: () => {
        set((state) => {
          const { badActorCount } = state;
          return { badActorCount: badActorCount + 1 };
        });
      },

      stopSound: (soundName: keyof GameSounds): boolean => {
        const { sounds } = get();
        const sound = sounds[soundName];

        if (sound) {
          sound.stop();
          return true;
        }
        return false;
      },

      toggleMute: () => {
        set((state) => {
          const newIsMuted = !state.isMuted;

          if (newIsMuted) {
            // Mute all sounds
            Howler.mute(true);
          } else {
            // Unmute all sounds
            Howler.mute(false);
          }

          return { isMuted: newIsMuted };
        });
      },
    };
  })
);

export default useGame;
