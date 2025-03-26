export interface LevelData {
  id: number;
  name: string;
  scoreToAdvance: number;
  timeLimit: number;
  description: string;
  trackConfig: {
    accelerators: AcceleratorConfig[];
    buildings: BuildingConfig[];
    spawner: SpawnerConfig;
  };
}

interface AcceleratorConfig {
  position: [number, number, number];
  colors: string[];
}

interface BuildingConfig {
  position: [number, number, number];
  colors: string[];
}

interface SpawnerConfig {
  position: [number, number, number];
  spawnRate: number;
  minSpawnRate: number;
  ballColors: string[];
}

const levelsData: LevelData[] = [
  {
    id: 1,
    name: "Packet Basics",
    scoreToAdvance: 10,
    timeLimit: 60, // 60 seconds
    description: "Direct the colored packets to their matching buildings!",
    trackConfig: {
      accelerators: [
        {
          position: [0, 0.5, -1.2],
          colors: ["yellow", "purple"],
        },
      ],
      buildings: [
        {
          position: [2, 0.75, -3],
          colors: ["purple", "yellow"],
        },
        {
          position: [-2, 0.75, -3],
          colors: ["yellow"],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        spawnRate: 2.0,
        minSpawnRate: 0.4,
        ballColors: ["yellow", "purple"],
      },
    },
  },
  {
    id: 2,
    name: "Network Junction",
    scoreToAdvance: 25,
    timeLimit: 90, // 90 seconds
    description: "Navigate through multiple junctions to deliver packets!",
    trackConfig: {
      accelerators: [
        // First junction (from level 1)
        {
          position: [0, 0.5, -1.2],
          colors: ["yellow", "purple"],
        },
        // Second junction (new for level 2)
        {
          position: [2, 0.5, -3.7],
          colors: ["purple", "yellow"],
        },
        // Third junction (new for level 2)
        {
          position: [-2, 0.5, -3.7],
          colors: ["yellow", "purple"],
        },
      ],
      buildings: [
        {
          position: [4, 0.75, -5],
          colors: ["purple"],
        },
        {
          position: [0, 0.75, -5],
          colors: ["green"],
        },
        {
          position: [-4, 0.75, -5],
          colors: ["yellow"],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        spawnRate: 1.5, // Faster spawn rate for added difficulty
        minSpawnRate: 0.3,
        ballColors: ["yellow", "purple"],
      },
    },
  },
];

export default levelsData;
