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
  badActor?: boolean;
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
    description: "Direct the colored packets to their matching buildings!",
    tutorial: [
      {
        text: "Stuur de pakketjes de goede kant op.",
      },
      {
        text: "De pakketjes volgen richting van de wegwijzer.",
      },
      {
        text: "De vlaggetjes geven aan wat de beste route is volgens het BGP.",
      },
      {
        text: "Wat de beste route is kan tijdens het level veranderen.",
      },
      {
        text: "Klik op de wegwijzer op de pakketjes een andere kant op te sturen",
      },
    ],
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
    scoreScreen: [
      {
        title: "Pakket afgeleverd!",
        description:
          "Natuurlijk is het gelukt. Je had mijn geniale voorbereiding achter je. Toch?",
      },
      {
        title: "Zending zoekgeraakt",
        description:
          "Hmm. Die heb ik... even niet gevolgd. Maar goed, fouten zijn ook een soort data.",
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
          position: [0, 1, -14],
          colors: ["blue", "red"],
        },
      ],
      buildings: [
        {
          name: "Building1",
          position: [-7, 2, -24],
          colors: [{ color: "red" }],
        },
        {
          name: "Building2",
          position: [7, 2, -20],
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
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
                minusScoreNumber: 5,
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
        spawnRate: 2.5,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                transition: true,
                minusScoreNumber: 5,
              },
              {
                color: "blue",
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
                transition: true,
                minusScoreNumber: 5,
              },
              {
                color: "red",
                minusScoreNumber: 5,
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
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                minusScoreNumber: 5,
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
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "blue",
                transition: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "blue",
                minusScoreNumber: 5,
              },
              {
                color: "red",
                minusScoreNumber: 5,
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
                color: "red",
                minusScoreNumber: 5,
              },
              {
                color: "blue",
                minusScoreNumber: 5,
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
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                minusScoreNumber: 5,
              },
              {
                color: "blue",
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "red",
                transition: true,
                minusScoreNumber: 5,
              },
              {
                color: "blue",
                transition: true,
                minusScoreNumber: 5,
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
        spawnRate: 2.4,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "red",
                minusScoreNumber: 5,
              },
              {
                color: "blue",
                minusScoreNumber: 5,
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
  {
    id: 2,
    name: "Packet Basics",
    scoreToAdvance: 200,
    maxScore: 240,
    timeLimit: 90, // 1min 30secs
    description: "Direct the colored packets to their matching buildings!",
    tutorial: [
      {
        text: "Pakketje gaan nu langs meerdere wegwijzers, zet ze allemaal goed als een route wijzigt.",
      },
    ],
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
    scoreScreen: [
      {
        title: "Routerend goed!",
        description:
          "Zo! Dat was precies zoals ik het niet had voorspeld. Maar hé, werkt ook.",
      },
      {
        title: "Verkeerde afslag genomen",
        description:
          "Tja, Pakistan is óók een bestemming. Niet mijn eerste keuze, maar goed.",
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
      buildings: [
        {
          name: "Building1",
          position: [-17, 2, -26],
          colors: [
            {
              color: "red",
            },
          ],
        },
        {
          name: "Building2",
          position: [-7, 2, -32],
          colors: [
            {
              color: "green",
            },
          ],
        },
        {
          name: "Building3",
          position: [3, 2, -32],
          colors: [
            {
              color: "blue",
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
        time: 10,
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
        time: 15,
        spawnRate: 2.1,
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
        time: 25,
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
              {
                color: "blue",
                badActor: true,
                minusScoreNumber: 5,
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
                transition: true,
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
      scene5: {
        time: 30,
        spawnRate: 2.1,
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
                minusScoreNumber: 5,
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
      scene6: {
        time: 40,
        spawnRate: 2.1,
        buildingColors: [
          {
            name: "Building1",
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
            name: "Building2",
            colors: [
              {
                color: "blue",
                badActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "green",
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
      scene7: {
        time: 45,
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
                badActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "green",
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
      // ------------- transition scene -----------
      scene8: {
        time: 55,
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
                badActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "green",
                transition: true,
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
                color: "green",
                badActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "yellow",
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
      scene9: {
        time: 60,
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
                badActor: true,
                minusScoreNumber: 5,
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
                color: "green",
                badActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
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
      scene10: {
        time: 70,
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
                color: "blue",
                badActor: true,
                minusScoreNumber: 5,
                transition: true,
              },

              {
                color: "yellow",
              },
              {
                color: "red",
                badActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
                badActor: true,
                minusScoreNumber: 5,
                transition: true,
              },
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
        time: 75,
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
              },
              {
                color: "red",
                badActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "green",
                badActor: true,
                minusScoreNumber: 5,
              },
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
];

export default levelsData;
