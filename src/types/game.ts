import { RefObject } from "react";
import * as THREE from "three";

// Types for useBalls.ts
export interface Ball {
  id: string;
  ref: RefObject<THREE.Mesh>;
  color?: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

// Types for usePlayer.ts
export interface PlayerState {
  playerRef: RefObject<THREE.Group> | null;
  setPlayerRef: (ref: RefObject<THREE.Group>) => void;
}

// Types for useGame.ts
export interface LevelData {
  id: number;
  name: string;
  timeLimit: number;
  scoreToAdvance: number;
  timeLine?: {
    [key: string]: {
      time: number;
      spawnRate?: number;
      ballColors?: string[];
    };
  };
  trackConfig: {
    spawner: {
      ballColors: string[];
    };
    buildings: Array<{
      colors: string[];
    }>;
  };
}

export type GamePhase =
  | "intro"
  | "explanation"
  | "tutorial"
  | "ready"
  | "playing"
  | "ended"
  | "gameFinished"
  | "levelComplete"
  | "pause"
  | "levelPicker"
  | "about";

export interface Sounds {
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
}

export interface SceneData {
  spawnRate: number;
  colors: string[];
}

export interface GameState {
  blocksCount: number;
  blocksSeed: number;
  startTime: number;
  endTime: number;
  timer: number;
  timerActive: boolean;
  phase: GamePhase;
  isPaused: boolean;
  canTogglePause: boolean;
  isMuted: boolean;
  sounds: Sounds;
  score: number;
  currentLevelId: number;
  currentLevel: LevelData;
  playSound: (soundName: keyof Sounds) => HTMLAudioElement | false;
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
  calculateScene: () => SceneData;
  restart: () => void;
  end: () => void;
  incrementScore: () => void;
  decrementScore: (minusScoreNumber?: number) => void;
  stopSound: (soundName: keyof Sounds) => boolean;
  toggleMute: () => void;
}
