import * as THREE from "three";

export interface LevelData {
  id: number;
  name: string;
  scoreToAdvance: number;
  maxScore: number;
  timeLimit: number;
  description: string;
  storyLine: StoryLine[];
  newsArticle?: NewsArticle;
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

interface SceneData {
  time: number;
  spawnRate: number;
  buildingColors: BuildingConfig[];
  ballColors: string[];
}

interface ColorConfig {
  color: string;
  badActor?: boolean;
  transition?: boolean;
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
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 60, // 60 seconds
    description: "Direct the colored packets to their matching buildings!",
    storyLine: [
      {
        text: "Welkom op je eerste werkdag als verkeersleider bij Packet Panic B.V.",
        button: "...",
      },
      {
        text: "Het meest prestigieuze autonome systeem van Nederland.",
        button: "...",
      },
      {
        text: "Mijn naam is D.I.R.K (Digitale Interne Routing Kracht). Maar jij mag me gewoon 'baas' noemen.",
        button: "Ja, baas...",
      },
      {
        text: "Je hebt het simpelste baantje op aarde. Het BGP vertelt je de beste route voor ieder pakketje.",
        button: "Oké!",
      },
      {
        text: "Jij hoeft alleen maar te zorgen dat iedere wegwijzer de goede kant op wijst. Makkie toch?",
        button: "Ik snap het",
      },
      {
        text: "Tenzij het BGP je de verkeerde route doorgeeft. Dan wordt het ingewikkeld. ",
        button: "...",
      },
      {
        text: "Maar dat gebeurt waarschijnlijk niet...",
        button: "Eh...",
      },
      {
        text: "Nee, daar hoef je je geen zorgen over te maken. Dat gebeurt niet. Vast niet...",
        button: "...",
      },
      {
        text: "In ieder geval niet op je eerste dag... Oké. Dan kom je er wel uit hé. Succes!",
        button: "Bedankt...",
      },
    ],
    newsArticle: {
      title: "BGP: de achilleshiel van het internet",
      content:
        "Het BGP werkt vaak prima. Maar wat de bedenkers niet hebben voorzien, is dat het internet een plek zou worden waar niet iedereen altijd eerlijk is. Door het gebrek aan authenticatie, kun je niet checken of een via BGP aangekondigde route klopt.",
      imageUrl: "/images/news/level1.jpg",
      readMoreLink:
        "https://tweakers.net/reviews/4155/all/border-gateway-protocol-de-achilleshiel-van-internet.html",
      date: "2015-08-22",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -13),
      cameraStartPosition: [35, 25, 15],
      accelerators: [
        {
          position: [0, 1, -16],
          colors: ["blue", "red"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-7, 1.5, -24],
          colors: [{ color: "red" }],
        },
        {
          name: "Building2",
          position: [7, 1.5, -20],
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
        spawnRate: 2.5,
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
      },
      // ------------- transition scene -----------
      scene2: {
        time: 5,
        spawnRate: 2.5,
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
                color: "blue",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene3: {
        time: 10,
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
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
      },
      // ------------- transition scene -----------
      scene4: {
        time: 15,
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
                transition: true,
              },
              {
                color: "red",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene5: {
        time: 20,
        spawnRate: 2.4,
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
      },
      // ------------- transition scene -----------
      scene6: {
        time: 25,
        spawnRate: 2.4,
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
                color: "red",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene7: {
        time: 30,
        spawnRate: 2.3,
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
      },
      // ------------- transition scene -----------
      scene8: {
        time: 35,
        spawnRate: 2.3,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
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
      },
      // --------------------------------
      scene9: {
        time: 40,
        spawnRate: 2.2,
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
      },
      // ------------- transition scene -----------
      scene10: {
        time: 45,
        spawnRate: 2.2,
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
                color: "red",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene11: {
        time: 50,
        spawnRate: 2.1,
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
        ballColors: ["blue", "red"],
      },
    },
  },
  {
    id: 2,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 18000, // 1min 30secs
    description: "Direct the colored packets to their matching buildings!",
    storyLine: [
      {
        text: "Dus je hebt gister helemaal geen problemen met het BGP ervaren?",
        button: "Nee",
      },
      {
        text: "Alles wat mis ging was je eigen fout?",
        button: "Ja?",
      },
      {
        text: "De wonderen zijn de wereld nog niet uit...",
        button: "...",
      },
      {
        text: "Laten we hopen dat dat vandaag zo blijft!",
        button: "Verder",
      },
    ],
    newsArticle: {
      title: "BGP-foutje Pakistan legt Youtube plat",
      content:
        "In maart 2008 lag YouTube voor miljoenen gebruikers urenlang plat. De Pakistaanse overheid probeerde YouTube in hun land te blokkeren. Maar door een fout in de BGP-configuratie stuurden ze juist verkeer uit andere landen naar Pakistaanse netwerken.",
      imageUrl: "/images/news/level1.jpg",
      readMoreLink:
        "https://arstechnica.com/uncategorized/2008/02/insecure-routing-redirects-youtube-to-pakistan/",
      date: "2008-03-24",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -13),
      cameraStartPosition: [35, 25, 15],
      accelerators: [
        {
          position: [0, 1, -16],
          colors: ["blue", "red"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red"],
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
          colors: [
            {
              color: "blue",
            },
            {
              color: "red",
            },
          ],
        },
        {
          name: "Building3",
          position: [3, 2, -32],
          colors: [
            {
              color: "green",
            },
            {
              color: "blue",
            },
          ],
        },
        {
          name: "Building4",
          position: [13, 2, -24],
          colors: [
            {
              color: "red",
            },
            {
              color: "green",
            },
          ],
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
        spawnRate: 2.2,
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
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green"], // Colors for the spawner
      },
      // ------------- transition scene -----------
      scene2: {
        time: 5,
        spawnRate: 2.2,
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
                transition: true,
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green"],
      },
      // --------------------------------
      scene3: {
        time: 10,
        spawnRate: 2.2,
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
            colors: [
              {
                color: "blue",
                badActor: true,
              },
              {
                color: "red",
              },
            ],
          },
          {
            name: "Building3",
            colors: [],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green"],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 15,
        spawnRate: 2.2,
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
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
                badActor: true,
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
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green"],
      },
      // --------------------------------
      scene5: {
        time: 20,
        spawnRate: 2.4,
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
            colors: [
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 25,
        spawnRate: 2.4,
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
                color: "red",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene7: {
        time: 30,
        spawnRate: 2.3,
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
      },
      // ------------- transition scene -----------
      scene8: {
        time: 35,
        spawnRate: 2.3,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
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
      },
      // --------------------------------
      scene9: {
        time: 40,
        spawnRate: 2.2,
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
      },
      // ------------- transition scene -----------
      scene10: {
        time: 45,
        spawnRate: 2.2,
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
                color: "red",
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red"],
      },
      // --------------------------------
      scene11: {
        time: 50,
        spawnRate: 2.1,
        buildingColors: [
          {
            name: "Building1",
            colors: [{ color: "red" }],
          },
          {
            name: "Building2",
            colors: [{ color: "blue" }],
          },
        ],
        ballColors: ["blue", "red"],
      },
    },
  },
];

export default levelsData;
