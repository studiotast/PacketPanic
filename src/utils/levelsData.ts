export interface LevelData {
  id: number;
  name: string;
  scoreToAdvance: number;
  maxScore: number;
  timeLimit: number;
  description: string;
  newsArticle?: {
    title: string;
    content: string;
    imageUrl: string;
  };
  trackConfig: {
    accelerators: AcceleratorConfig[];
    buildings: BuildingConfig[];
    spawner: SpawnerConfig;
  };
  timeLine?: {
    scene1: SceneData;
    scene2: SceneData;
    scene3: SceneData;
  };
}

interface SceneData {
  time: number;
  spawnRate: number;
  buildingColors: BuildingConfig[];
  ballColors: string[];
}

interface BuildingConfig {
  name: string;
  position?: [number, number, number];
  colors: string[];
}

interface AcceleratorConfig {
  position: [number, number, number];
  colors: string[];
}

interface SpawnerConfig {
  position: [number, number, number];
  ballColors: string[];
}

const levelsData: LevelData[] = [
  {
    id: 1,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 60, // 60 seconds
    description: "Direct the colored packets to their matching buildings!",
    newsArticle: {
      title: "Packet Basics",
      content:
        "Welcome to the world of packet delivery! In this level, you'll learn the basics of directing packets to their respective destinations. Use the accelerators wisely and avoid obstacles!",
      imageUrl: "/images/news/level1.jpg",
    },
    trackConfig: {
      accelerators: [
        {
          position: [0, 1, -14],
          colors: ["blue", "red"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-7, 0.75, -24],
          colors: ["blue", "red"],
        },
        {
          name: "Building2",
          position: [7, 0.75, -20],
          colors: ["red"],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        ballColors: ["blue", "red"],
      },
    },
    timeLine: {
      scene1: {
        time: 20,
        spawnRate: 2.5,
        buildingColors: [
          {
            name: "Building1",
            colors: ["blue"],
          },
          {
            name: "Building2",
            colors: ["red"],
          },
        ],
        ballColors: ["blue", "red"], // Colors for the spawner
      },
      scene2: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: ["red"], // Add green flag in scene 2
          },
          {
            name: "Building2",
            colors: ["blue"], // Add yellow flag in scene 2
          },
        ],
        ballColors: ["blue", "red"], // Add new colors to spawner
      },
      scene3: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: ["red"], // Add green flag in scene 2
          },
          {
            name: "Building2",
            colors: ["blue"], // Add yellow flag in scene 2
          },
        ],
        ballColors: ["blue", "red"], // Add new colors to spawner
      },
    },
  },
  {
    id: 2,
    name: "Network Junction",
    scoreToAdvance: 25,
    maxScore: 30,
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
          name: "Building1",
          position: [4, 0.75, -5],
          colors: ["purple"],
        },
        {
          name: "Building2",
          position: [0, 0.75, -5],
          colors: ["green"],
        },
        {
          name: "Building3",
          position: [-4, 0.75, -5],
          colors: ["yellow"],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        ballColors: ["yellow", "purple"],
      },
    },
  },
];

export default levelsData;
