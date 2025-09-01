import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { StateCreator } from "zustand";
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

// Use the LevelData interface from levelsData.ts
// This ensures types match exactly

// Define audio elements
type GameSounds = {
  level: HTMLAudioElement | null;
  menu: HTMLAudioElement | null;
  inHole: HTMLAudioElement | null;
  boost: HTMLAudioElement | null;
  score: HTMLAudioElement | null;
  button: HTMLAudioElement | null;
  woosh: HTMLAudioElement | null;
  countDown: HTMLAudioElement | null;
  garageOpen: HTMLAudioElement | null;
  garageClose: HTMLAudioElement | null;
  robotTalking1: HTMLAudioElement | null;
  robotTalking2: HTMLAudioElement | null;
  robotTalking3: HTMLAudioElement | null;
  flagAppear: HTMLAudioElement | null;
  flagDisappear: HTMLAudioElement | null;
  failScore: HTMLAudioElement | null;
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
  playSound: (soundName: keyof GameSounds) => HTMLAudioElement | false;
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

const TIME_LIMIT = 45; // 45 seconds game limit

// Create the game store with TypeScript types
// Define the state creator type with the subscribeWithSelector middleware
type GameStateCreator = StateCreator<
  GameState,
  [["zustand/subscribeWithSelector", never]],
  []
>;

const useGame = create<GameState>()(
  subscribeWithSelector((set, get) => {
    // Initialize audio elements with proper type checking
    const createAudio = (path: string): HTMLAudioElement | null => {
      return typeof Audio !== "undefined" ? new Audio(path) : null;
    };

    const levelSound = createAudio("/audio/level.wav");
    const menuSound = createAudio("/audio/menu.wav");
    const inHoleSound = createAudio("/audio/in-hole.wav");
    const boostSound = createAudio("/audio/boost.wav");
    const scoreSound = createAudio("/audio/score.wav");
    const buttonSound = createAudio("/audio/button.wav");
    const wooshSound = createAudio("/audio/quick-woosh.wav");
    const countDownSound = createAudio("/audio/count-down.wav");
    const garageOpenSound = createAudio("/audio/garage-open.wav");
    const garageCloseSound = createAudio("/audio/garage-close.wav");
    const robotTalkingSound1 = createAudio("/audio/robot-talking.wav");
    const robotTalkingSound2 = createAudio("/audio/robot-talking2.wav");
    const robotTalkingSound3 = createAudio("/audio/robot-talking3.wav");
    const flagAppearSound = createAudio("/audio/flag-appear.wav");
    const flagDisappearSound = createAudio("/audio/flag-disappear.wav");
    const failScoreSound = createAudio("/audio/fail-score.wav");

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
      canTogglePause: true, // Used for debouncing

      // Mute
      isMuted: false,

      // Level sound
      sounds: {
        level: levelSound,
        menu: menuSound,
        inHole: inHoleSound,
        boost: boostSound,
        score: scoreSound,
        button: buttonSound,
        woosh: wooshSound,
        countDown: countDownSound,
        garageOpen: garageOpenSound,
        garageClose: garageCloseSound,
        robotTalking1: robotTalkingSound1,
        robotTalking2: robotTalkingSound2,
        robotTalking3: robotTalkingSound3,
        flagAppear: flagAppearSound,
        flagDisappear: flagDisappearSound,
        failScore: failScoreSound,
      },

      // Score
      score: 0,

      // BadActor count
      badActorCount: 0,

      // New level properties
      currentLevelId: 1,
      currentLevel: levelsData[0],

      // Play a sound from the sounds object
      playSound: (soundName: keyof GameSounds): HTMLAudioElement | false => {
        const { sounds, isMuted } = get();
        const sound = sounds[soundName];

        if (sound && !isMuted) {
          sound.currentTime = 0; // Reset to start

          sound.volume = 0.5; // Set volume to 50%

          // Only set loop for menu sound
          sound.loop = soundName === "menu" || soundName === "level";

          // Return the Promise from play()
          try {
            sound.play();
            return sound; // Return the sound object
          } catch (err) {
            console.error("Error playing sound:", err);
            return false;
          }
        }

        return false; // Return false if sound doesn't exist or is muted
      },

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
            score: 0, // Reset score for the new level
            badActorCount: 0, // Reset bad actor count
            // Keep the score between levels
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
        // Find the level with the matching ID
        const level = levelsData.find((level) => level.id === levelId);

        if (level) {
          set({
            currentLevelId: levelId,
            currentLevel: level as LevelData,
            phase: "explanation", // Change to explanation phase
            timer: 0, // Reset timer for new level
            score: 0, // Reset score for new level
            badActorCount: 0, // Reset bad actor count
            isPaused: false, // Ensure the game isn't paused
          });

          return true; // Return success
        }

        return false; // Return failure if level not found
      },

      calculateScene: (): SceneCalculation => {
        const { timer, currentLevel } = get();

        // Safety check if timeLine doesn't exist
        if (!currentLevel.timeLine) {
          return {
            spawnRate: 2.5, // Default spawn rate
            colors: currentLevel.trackConfig.buildings
              .map((b) => b.colors.map((c: ColorConfig) => c.color))
              .flat(),
          };
        }

        // We need to cast the timeLine to a more flexible type since the original type
        // doesn't support dynamic string indexing
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

          // If this is the last scene or we're before the next scene's time
          if (!nextSceneKey || timer < timeLine[nextSceneKey].time) {
            currentSceneKey = sceneKey;
            break;
          }
        }

        // Return data for the current scene
        return {
          spawnRate: timeLine[currentSceneKey].spawnRate || 2.5,
          colors: timeLine[currentSceneKey].ballColors || [],
        };
      },

      // Improve the existing restart function
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

      // Function to increment the score
      incrementScore: () => {
        set((state) => {
          const { score, currentLevel, phase } = state;
          const newScore = score + 10;

          // // Check if level is complete based on score
          // if (phase === "playing" && newScore >= currentLevel.scoreToAdvance) {
          //   return { phase: "levelComplete", score: newScore };
          // }

          return { score: newScore };
        });
      },

      decrementScore: (minusScoreNumber: number = 5): void => {
        set((state) => {
          const { score } = state;
          // Ensure score doesn't go below 0
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
          sound.pause();
          sound.currentTime = 0;
          return true;
        }
        return false;
      },

      toggleMute: () => {
        set((state) => {
          // Stop all sounds when muting
          if (!state.isMuted) {
            Object.values(state.sounds).forEach((sound) => {
              if (sound && !sound.paused) {
                sound.pause();
                sound.currentTime = 0;
              }
            });
          }
          return { isMuted: !state.isMuted };
        });
      },
    };
  })
);

export default useGame;
