import * as THREE from "three";

export function getAllNewsArticles() {
  return levelsData
    .map((level) => level.newsArticle)
    .filter((article) => article !== undefined);
}
export interface LevelData {
  id: number;
  name: string;
  scoreToAdvance: number;
  maxScore: number;
  timeLimit: number;
  description: string;
  storyLine: StoryLine[];
  tutorial: Tutorial[];
  newsArticle?: NewsArticle;
  scoreScreen: ScoreScreen[];
  notifications?: NotificationsData[];
  warnings?: NotificationsData[];
  seriousNotifications?: NotificationsData[];
  trackConfig: {
    accelerators: AcceleratorConfig[];
    buildings: BuildingConfig[];
    spawner: SpawnerConfig;
    cameraStartLookAt: THREE.Vector3;
    cameraStartPosition: [number, number, number];
  };
  timeLine?: {
    scene1: SceneData;
    scene2: SceneData;
    scene3: SceneData;
    scene4: SceneData;
    scene5?: SceneData;
    scene6?: SceneData;
    scene7?: SceneData;
    scene8?: SceneData;
    scene9?: SceneData;
    scene10?: SceneData;
    scene11?: SceneData;
    scene12?: SceneData;
    scene13?: SceneData;
    scene14?: SceneData;
    scene15?: SceneData;
    scene16?: SceneData;
    scene17?: SceneData;
    scene18?: SceneData;
    scene19?: SceneData;
    scene20?: SceneData;
  };
}

export interface NotificationsData {
  text: string;
}

interface SceneData {
  time: number;
  spawnRate: number;
  buildingColors: BuildingConfig[];
  ballColors: string[];
  accelerators?: AcceleratorConfig[];
}

interface Tutorial {
  text: string;
}

interface ScoreScreen {
  title: string;
  description: string;
}

export interface ColorConfig {
  color: string;
  mistakenBadActor?: boolean;
  maliciousBadActor?: boolean;
  transition?: boolean;
  minusScoreNumber?: number;
}

interface BuildingConfig {
  name: string;
  position?: [number, number, number];
  colors: ColorConfig[];
}

interface AcceleratorConfig {
  position: [number, number, number];
  colors: string[];
}

interface SpawnerConfig {
  position: [number, number, number];
  ballColors: string[];
}

interface StoryLine {
  text: string;
  button: string;
}

interface NewsArticle {
  title: string;
  content: string;
  imageUrl: string;
  readMoreLink: string;
  date: string;
}

const levelsData: LevelData[] = [
  {
    id: 1,
    name: "Packet Basics",
    scoreToAdvance: 150,
    maxScore: 200,
    timeLimit: 60, // 60 seconds
    description: "levels.level-1.description",
    tutorial: [
      {
        text: "levels.level-1.tutorial.step-1",
      },
      {
        text: "levels.level-1.tutorial.step-2",
      },
      {
        text: "levels.level-1.tutorial.step-3",
      },
      {
        text: "levels.level-1.tutorial.step-4",
      },
      {
        text: "levels.level-1.tutorial.step-5",
      },
      {
        text: "levels.level-1.tutorial.step-6",
      },
    ],
    storyLine: [
      {
        text: "levels.level-1.storyline.step-1.text",
        button: "levels.level-1.storyline.step-1.button",
      },
      {
        text: "levels.level-1.storyline.step-2.text",
        button: "levels.level-1.storyline.step-2.button",
      },
      {
        text: "levels.level-1.storyline.step-3.text",
        button: "levels.level-1.storyline.step-3.button",
      },
      {
        text: "levels.level-1.storyline.step-4.text",
        button: "levels.level-1.storyline.step-4.button",
      },
      {
        text: "levels.level-1.storyline.step-5.text",
        button: "levels.level-1.storyline.step-5.button",
      },
      {
        text: "levels.level-1.storyline.step-6.text",
        button: "levels.level-1.storyline.step-6.button",
      },
      {
        text: "levels.level-1.storyline.step-7.text",
        button: "levels.level-1.storyline.step-7.button",
      },
      {
        text: "levels.level-1.storyline.step-8.text",
        button: "levels.level-1.storyline.step-8.button",
      },
    ],
    scoreScreen: [
      {
        title: "levels.level-1.score-screen.success.title",
        description: "levels.level-1.score-screen.success.description",
      },
      {
        title: "levels.level-1.score-screen.fail.title",
        description: "levels.level-1.score-screen.fail.description",
      },
    ],
    newsArticle: {
      title: "levels.level-1.news-article.title",
      content: "levels.level-1.news-article.content",
      imageUrl: "/images/news/1.jpg",
      readMoreLink:
        "https://tweakers.net/reviews/4155/all/border-gateway-protocol-de-achilleshiel-van-internet.html",
      date: "22-8-2015",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -12),
      cameraStartPosition: [34, 27, 15],
      accelerators: [
        {
          position: [0, 1, -14],
          colors: ["blue", "red"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-7, 1.8, -24],
          colors: [{ color: "red" }],
        },
        {
          name: "Building2",
          position: [7, 1.8, -20],
          colors: [{ color: "blue" }],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        ballColors: ["blue", "red"],
      },
    },
    timeLine: {
      scene1: {
        time: 0,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      scene6: {
        time: 45,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                transition: true,
              },
              {
                color: "blue",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
      scene7: {
        time: 50,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [],
          },
        ],
        ballColors: ["blue", "red"],
        accelerators: [
          {
            position: [0, 1, -14],
            colors: ["blue", "red"],
          },
        ],
      },
    },
  },
  // LEVEL 2 __________________________________________________________________________________________________
  {
    id: 2,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 90, // 1min 30secs
    description: "levels.level-2.description",
    notifications: [
      {
        text: "levels.level-2.notifications.0",
      },
      {
        text: "levels.level-2.notifications.1",
      },
      {
        text: "levels.level-2.notifications.2",
      },
      {
        text: "levels.level-2.notifications.3",
      },
    ],
    tutorial: [
      {
        text: "levels.level-2.tutorial.step-1",
      },
    ],
    storyLine: [
      {
        text: "levels.level-2.storyline.step-1.text",
        button: "levels.level-2.storyline.step-1.button",
      },
      {
        text: "levels.level-2.storyline.step-2.text",
        button: "levels.level-2.storyline.step-2.button",
      },
      {
        text: "levels.level-2.storyline.step-3.text",
        button: "levels.level-2.storyline.step-3.button",
      },
      {
        text: "levels.level-2.storyline.step-4.text",
        button: "levels.level-2.storyline.step-4.button",
      },
    ],
    scoreScreen: [
      {
        title: "levels.level-2.score-screen.success.title",
        description: "levels.level-2.score-screen.success.description",
      },
      {
        title: "levels.level-2.score-screen.fail.title",
        description: "levels.level-2.score-screen.fail.description",
      },
    ],
    newsArticle: {
      title: "levels.level-2.news-article.title",
      content: "levels.level-2.news-article.content",
      imageUrl: "/images/news/2.jpg",
      readMoreLink:
        "https://arstechnica.com/uncategorized/2008/02/insecure-routing-redirects-youtube-to-pakistan/",
      date: "24-3-2008",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -10),
      cameraStartPosition: [35, 30, 15],
      accelerators: [
        {
          position: [0, 1, -7],
          colors: ["blue", "red", "green"],
        },
        {
          position: [6, 1, -13],
          colors: ["blue", "red", "green"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-13, 1.8, -19],
          colors: [
            {
              color: "red",
              mistakenBadActor: true,
              minusScoreNumber: 3,
            },
          ],
        },
        {
          name: "Building2",
          position: [-5, 1.8, -23],
          colors: [
            {
              color: "green",
              mistakenBadActor: true,
              minusScoreNumber: 3,
            },
          ],
        },
        {
          name: "Building3",
          position: [7, 1.8, -21],
          colors: [
            {
              color: "blue",
              mistakenBadActor: true,
              minusScoreNumber: 3,
            },
          ],
        },
      ],
      spawner: {
        position: [0, 0.75, 10],
        ballColors: ["blue", "red", "green", "yellow"],
      },
    },
    timeLine: {
      scene1: {
        time: 0,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
              {
                color: "red",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 45,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
              {
                color: "yellow",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene7: {
        time: 50,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene8: {
        time: 60,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
              },
              {
                color: "blue",
              },
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },

              {
                color: "yellow",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene10: {
        time: 75,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
              {
                color: "blue",
              },
              {
                color: "yellow",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene11: {
        time: 80,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"],
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
    },
  },
  // LEVEL 3 __________________________________________________________________________________________
  {
    id: 3,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 90, // 1min 30secs
    description: "levels.level-3.description",
    notifications: [
      {
        text: "levels.level-3.notifications.0",
      },
      {
        text: "levels.level-3.notifications.1",
      },
    ],
    seriousNotifications: [
      {
        text: "levels.level-3.serious-notifications.0",
      },
      {
        text: "levels.level-3.serious-notifications.1",
      },
      {
        text: "levels.level-3.serious-notifications.2",
      },
      {
        text: "levels.level-3.serious-notifications.3",
      },
    ],
    warnings: [
      {
        text: "levels.level-3.warnings.0",
      },
      {
        text: "levels.level-3.warnings.1",
      },
      {
        text: "levels.level-3.warnings.2",
      },
      {
        text: "levels.level-3.warnings.3",
      },
    ],
    tutorial: [
      {
        text: "levels.level-3.tutorial.step-1",
      },
    ],
    storyLine: [
      {
        text: "levels.level-3.storyline.step-1.text",
        button: "levels.level-3.storyline.step-1.button",
      },
      {
        text: "levels.level-3.storyline.step-2.text",
        button: "levels.level-3.storyline.step-2.button",
      },
      {
        text: "levels.level-3.storyline.step-3.text",
        button: "levels.level-3.storyline.step-3.button",
      },
      {
        text: "levels.level-3.storyline.step-4.text",
        button: "levels.level-3.storyline.step-4.button",
      },
      {
        text: "levels.level-3.storyline.step-5.text",
        button: "levels.level-3.storyline.step-5.button",
      },
      {
        text: "levels.level-3.storyline.step-6.text",
        button: "levels.level-3.storyline.step-6.button",
      },
      {
        text: "levels.level-3.storyline.step-7.text",
        button: "levels.level-3.storyline.step-7.button",
      },
    ],
    scoreScreen: [
      {
        title: "levels.level-3.score-screen.success.title",
        description: "levels.level-3.score-screen.success.description",
      },
      {
        title: "levels.level-3.score-screen.fail.title",
        description: "levels.level-3.score-screen.fail.description",
      },
    ],
    newsArticle: {
      title: "levels.level-3.news-article.title",
      content: "levels.level-3.news-article.content",
      imageUrl: "/images/news/3.jpg",
      readMoreLink:
        "https://arstechnica.com/information-technology/2022/09/how-3-hours-of-inaction-from-amazon-cost-cryptocurrency-holders-235000/",
      date: "23-9-2022",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -13),
      cameraStartPosition: [35, 25, 15],
      accelerators: [
        {
          position: [0, 1, -16],
          colors: ["blue", "red", "green", "yellow"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red", "green", "yellow"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red", "green", "yellow"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-17, 2, -26],
          colors: [
            {
              color: "red",
            },
            {
              color: "green",
            },
          ],
        },
        {
          name: "Building2",
          position: [-7, 2, -32],
          colors: [],
        },
        {
          name: "Building3",
          position: [3, 2, -32],
          colors: [
            {
              color: "blue",
            },
            {
              color: "yellow",
              mistakenBadActor: true,
              minusScoreNumber: 3,
            },
          ],
        },
        {
          name: "Building4",
          position: [13, 2, -24],
          colors: [],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        ballColors: ["blue", "red", "green", "yellow"],
      },
    },
    timeLine: {
      scene1: {
        time: 0,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 3,
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 45,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene7: {
        time: 50,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene8: {
        time: 60,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene10: {
        time: 75,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene11: {
        time: 80,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene12: {
        time: 90,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
                transition: true,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene13: {
        time: 95,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene14: {
        time: 105,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
                transition: true,
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene15: {
        time: 110,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
    },
  },
  // LEVEL 4 _________________________________________________
  {
    id: 4,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 90, // 1min 30secs
    description: "levels.level-4.description",
    notifications: [
      {
        text: "levels.level-4.notifications.0",
      },
      {
        text: "levels.level-4.notifications.1",
      },
    ],
    seriousNotifications: [
      {
        text: "levels.level-4.serious-notifications.0",
      },
      {
        text: "levels.level-4.serious-notifications.1",
      },
      {
        text: "levels.level-4.serious-notifications.2",
      },
      {
        text: "levels.level-4.serious-notifications.3",
      },
    ],
    warnings: [
      {
        text: "levels.level-4.warnings.0",
      },
      {
        text: "levels.level-4.warnings.1",
      },
      {
        text: "levels.level-4.warnings.2",
      },
      {
        text: "levels.level-4.warnings.3",
      },
    ],
    tutorial: [
      {
        text: "levels.level-4.tutorial.step-1",
      },
    ],
    storyLine: [
      {
        text: "levels.level-4.storyline.step-1.text",
        button: "levels.level-4.storyline.step-1.button",
      },
      {
        text: "levels.level-4.storyline.step-2.text",
        button: "levels.level-4.storyline.step-2.button",
      },
      {
        text: "levels.level-4.storyline.step-3.text",
        button: "levels.level-4.storyline.step-3.button",
      },
      {
        text: "levels.level-4.storyline.step-4.text",
        button: "levels.level-4.storyline.step-4.button",
      },
      {
        text: "levels.level-4.storyline.step-5.text",
        button: "levels.level-4.storyline.step-5.button",
      },
      {
        text: "levels.level-4.storyline.step-6.text",
        button: "levels.level-4.storyline.step-6.button",
      },
      {
        text: "levels.level-4.storyline.step-7.text",
        button: "levels.level-4.storyline.step-7.button",
      },
      {
        text: "levels.level-4.storyline.step-8.text",
        button: "levels.level-4.storyline.step-8.button",
      },
      {
        text: "levels.level-4.storyline.step-9.text",
        button: "levels.level-4.storyline.step-9.button",
      },
      {
        text: "levels.level-4.storyline.step-10.text",
        button: "levels.level-4.storyline.step-10.button",
      },
      {
        text: "levels.level-4.storyline.step-11.text",
        button: "levels.level-4.storyline.step-11.button",
      },
      {
        text: "levels.level-4.storyline.step-12.text",
        button: "levels.level-4.storyline.step-12.button",
      },
    ],
    scoreScreen: [
      {
        title: "levels.level-4.score-screen.success.title",
        description: "levels.level-4.score-screen.success.description",
      },
      {
        title: "levels.level-4.score-screen.fail.title",
        description: "levels.level-4.score-screen.fail.description",
      },
    ],
    newsArticle: {
      title: "levels.level-4.news-article.title",
      content: "levels.level-4.news-article.content",
      imageUrl: "/images/news/4.jpg",
      readMoreLink:
        "https://www.sidn.nl/nieuws-en-blogs/rpki-beveiligt-internet-routeringssysteem-bgp",
      date: "24-10-2022",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -13),
      cameraStartPosition: [35, 25, 15],
      accelerators: [
        {
          position: [0, 1, -16],
          colors: ["blue", "red", "green", "yellow"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red", "green", "yellow"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red", "green", "yellow"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-17, 2, -26],
          colors: [
            {
              color: "red",
            },
            {
              color: "green",
            },
          ],
        },
        {
          name: "Building2",
          position: [-7, 2, -32],
          colors: [],
        },
        {
          name: "Building3",
          position: [3, 2, -32],
          colors: [
            {
              color: "blue",
            },
            {
              color: "yellow",
              mistakenBadActor: true,
              minusScoreNumber: 3,
            },
          ],
        },
        {
          name: "Building4",
          position: [13, 2, -24],
          colors: [],
        },
      ],
      spawner: {
        position: [0, 0.75, 2.5],
        ballColors: ["blue", "red", "green", "yellow"],
      },
    },
    timeLine: {
      scene1: {
        time: 0,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 3,
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 45,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
              {
                color: "blue",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene7: {
        time: 50,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene8: {
        time: 60,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 10,
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene10: {
        time: 75,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "blue",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene11: {
        time: 80,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
              },
              {
                color: "blue",
              },
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene12: {
        time: 90,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
              },
              {
                color: "red",
                transition: true,
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene13: {
        time: 95,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene14: {
        time: 105,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
              {
                color: "green",
                transition: true,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 10,
                transition: true,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "yellow",
              },
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 3,
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene15: {
        time: 110,
        spawnRate: 2.0,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "green",
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "yellow",
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "yellow"],
          },
        ],
      },
    },
  },
];

export default levelsData;
