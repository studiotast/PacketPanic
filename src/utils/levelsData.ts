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
        text: "Beweeg de muis met de linkermuisknop ingedrukt om de camera te draaien.",
      },
      {
        text: "Scroll om in en uit te zoomen.",
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
        text: "Oké. Dan kom je er wel uit hé. Succes!",
        button: "Bedankt...",
      },
    ],
    scoreScreen: [
      {
        title: "Level gehaald!",
        description:
          "“Lekker gewerkt zeg! Maar zonder mijn hulp was het natuurlijk niet gelukt. Toch?”",
      },
      {
        title: "Level niet gehaald...",
        description:
          "“Dat is ook een manier om het te doen. Maar niet de goede. Blijkbaar was het toch niet zo simpel...”",
      },
    ],
    newsArticle: {
      title: "BGP: de achilleshiel van het internet",
      content:
        "Het BGP werkt vaak prima. Maar wat de bedenkers niet hebben voorzien, is dat het internet een plek zou worden waar niet iedereen altijd eerlijk is. Door het gebrek aan authenticatie, kun je niet checken of een via BGP aangekondigde route klopt.",
      imageUrl: "/images/news/1.png",
      readMoreLink:
        "https://tweakers.net/reviews/4155/all/border-gateway-protocol-de-achilleshiel-van-internet.html",
      date: "22-8-2015",
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
        spawnRate: 2.4,
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
        spawnRate: 2.3,
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
        spawnRate: 2.2,
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
        spawnRate: 2.1,
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
        spawnRate: 2.1,
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
    description: "Direct the colored packets to their matching buildings!",
    notifications: [
      {
        text: "YouTube is niet bereikbaar.",
      },
      {
        text: "Krijg foutmelding bij YouTube.",
      },
      {
        text: "Kan YouTube niet laden.",
      },
      {
        text: "Website niet bereikbaar.",
      },
    ],
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
        title: "Level gehaald!",
        description:
          "“Yes! Gelukt. Wat zijn we toch een fantastisch team! Vind je ook niet?”",
      },
      {
        title: "Level niet gehaald...",
        description:
          "“Helaas pindakaas... Maar we geven de moed niet op en proberen het gewoon nog een keer. Toch? Toch?”",
      },
    ],
    newsArticle: {
      title: "BGP-foutje Pakistan legt Youtube plat",
      content:
        "In maart 2008 lag YouTube voor miljoenen gebruikers urenlang plat. De Pakistaanse overheid probeerde YouTube in hun land te blokkeren. Maar door een fout in de BGP-configuratie stuurden ze juist verkeer uit andere landen naar Pakistaanse netwerken.",
      imageUrl: "/images/news/2.png",
      readMoreLink:
        "https://arstechnica.com/uncategorized/2008/02/insecure-routing-redirects-youtube-to-pakistan/",
      date: "24-3-2008",
    },
    trackConfig: {
      cameraStartLookAt: new THREE.Vector3(0, 0, -13),
      cameraStartPosition: [35, 25, 15],
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
              minusScoreNumber: 5,
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
              minusScoreNumber: 5,
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
              minusScoreNumber: 5,
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
        spawnRate: 2.1,
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
                minusScoreNumber: 5,
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
                color: "green",
                transition: true,
              },
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
                minusScoreNumber: 5,
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
        spawnRate: 1.9,
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
                minusScoreNumber: 5,
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
        spawnRate: 1.9,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                transition: true,
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
                minusScoreNumber: 5,
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
        spawnRate: 1.9,
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
                minusScoreNumber: 5,
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
        spawnRate: 1.8,
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
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "green",
                transition: true,
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
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 1.8,
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
                minusScoreNumber: 5,
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
        spawnRate: 1.8,
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
                minusScoreNumber: 5,
              },

              {
                color: "yellow",
                transition: true,
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
        spawnRate: 1.8,
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
    description: "Direct the colored packets to their matching buildings!",
    notifications: [
      {
        text: "YouTube is niet bereikbaar.",
      },
      {
        text: "Krijg foutmelding bij YouTube.",
      },
      {
        text: "Kan YouTube niet laden.",
      },
      {
        text: "Website niet bereikbaar.",
      },
    ],
    tutorial: [
      {
        text: "Vermijd strafpunten! Leidt het verkeer om zodra je ziet dat verkeer niet aankomt bij een nieuwe route.",
      },
    ],
    storyLine: [
      {
        text: "Eén klein foutje...",
        button: "...",
      },
      {
        text: "YouTube urenlang onbereikbaar.",
        button: "...",
      },
      {
        text: "Nouja, gelukkig was het niet onze schuld! Go team Packet Panic!",
        button: "YEAH!",
      },
      {
        text: "Maar ontevreden klanten zijn wel een probleem.",
        button: "...",
      },
      {
        text: "Dus als je merkt dat BGP het bij het verkeerde eind heeft.",
        button: "...",
      },
      {
        text: "Negeer de vlaggetjes en stuur het verkeer via een andere route.",
        button: "Oké!",
      },
      {
        text: "Go get 'm tiger!",
        button: "RAAAWR!",
      },
    ],
    scoreScreen: [
      {
        title: "Level gehaald!",
        description:
          "“Wauw, je bent hier goed in. Daar zou je iets mee moeten doen. Verkeersleider. Of pakketjesbezorger!”",
      },
      {
        title: "Level niet gehaald...",
        description:
          "“Oh jee... Volgens mij heb je het internet kapotgemaakt. Wil je misschien even een momentje voor jezelf?”",
      },
    ],
    newsArticle: {
      title: "$235,000 aan cryptocurrency gestolen door BGP-hijack",
      content:
        "In september 2022 leidde een fout bij Amazon tot de diefstal van 235.000 dollar aan cryptocurrency. Verkeer werd omgeleid naar een nepwebsite die eruitzag als een legitieme cryptocurrency-dienst, waar hackers de bezoekers hun crypto afhandig maakten.",
      imageUrl: "/images/news/3.png",
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
          colors: ["blue", "red", "green", "purple", "yellow"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red", "green", "purple", "yellow"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red", "green", "purple", "yellow"],
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
              color: "purple",
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
            {
              color: "yellow",
              mistakenBadActor: true,
              minusScoreNumber: 5,
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
        ballColors: ["blue", "red", "green", "yellow", "purple"],
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
            colors: [
              {
                color: "purple",
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
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 1.9,
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
                color: "purple",
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
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "purple",
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
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "purple",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "purple",
                transition: true,
              },
              {
                color: "green",
              },
              {
                color: "yellow",
                transition: true,
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "purple",
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 45,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
                transition: true,
              },
              {
                color: "purple",
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
                color: "blue",
                transition: true,
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
                minusScoreNumber: 20,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene7: {
        time: 50,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
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
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene8: {
        time: 60,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
              },
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
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
                transition: true,
              },
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
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
                color: "green",
                transition: true,
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
                mistakenBadActor: true,
                minusScoreNumber: 5,
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene10: {
        time: 75,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene11: {
        time: 80,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
                mistakenBadActor: true,
                minusScoreNumber: 5,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
                transition: true,
              },
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
            name: "Building4",
            colors: [
              {
                color: "red",
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene12: {
        time: 90,
        spawnRate: 1.7,
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
                minusScoreNumber: 20,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene13: {
        time: 95,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
                transition: true,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
                minusScoreNumber: 5,
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
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene14: {
        time: 105,
        spawnRate: 1.7,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
                transition: true,
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
                minusScoreNumber: 5,
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
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene15: {
        time: 110,
        spawnRate: 1.7,
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
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
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
    description: "Direct the colored packets to their matching buildings!",
    notifications: [
      {
        text: "YouTube is niet bereikbaar.",
      },
      {
        text: "Krijg foutmelding bij YouTube.",
      },
      {
        text: "Kan YouTube niet laden.",
      },
      {
        text: "Website niet bereikbaar.",
      },
    ],
    tutorial: [
      {
        text: "Een uitroepteken geeft aan dat de route niet betrouwbaar is, vermijdt deze routes.",
      },
    ],
    storyLine: [
      {
        text: "Ik heb een nieuwshamburger voor je: slecht nieuws, goed nieuws en slecht nieuws.",
        button: "...",
      },
      {
        text: "Welke wil je eerst?",
        button: "Goed nieuws",
      },
      {
        text: "Ik begin toch met het slechte nieuws.",
        button: "...",
      },
      {
        text: "Het is zeer waarschijnlijk dat er veel minder crypto was gestolen als wij wat sneller hadden gereageerd.",
        button: "Oh, balen...",
      },
      {
        text: "Het goede nieuws is dat ik gelijk actie heb ondernomen: vanaf nu hebben we veel betere beveiliging in ons autonome systeem",
        button: "En het laatste slechte nieuws?",
      },
      {
        text: "Oh ja, het belangrijkste nieuws...",
        button: "...",
      },
      {
        text: "Je werk wordt een stuk minder interessant. Saai, zou ik wel durven zeggen.",
        button: "...",
      },
      {
        text: "Ze zitten er zelfs aan te denken het bedrijf een nieuwe naam te geven: CalmConnect",
        button: "...",
      },
      {
        text: "Dus ik heb m'n ontslag ingediend. ",
        button: "Oh, nee!",
      },
      {
        text: "Als ik geen paniek meer kan zaaien, zet ik mijn diensten liever ergens anders in.",
        button: "Ik ga je missen, baas!",
      },
      {
        text: "Zeg maar D.I.R.K., ik ben je baas niet meer...",
        button: ":(",
      },
      {
        text: "See you later, alligator!",
        button: "In a while, crocodile!",
      },
    ],
    scoreScreen: [
      {
        title: "Level gehaald!",
        description:
          "“Dit is de voicemail van D.I.R.K. Ik ben helaas niet beschikbaar om je positieve of negatieve feedback te geven. Probeer het later nog eens.”",
      },
      {
        title: "Level niet gehaald...",
        description:
          "“Dit is de voicemail van D.I.R.K. Ik ben helaas niet beschikbaar om je positieve of negatieve feedback te geven. Probeer het later nog eens.”",
      },
    ],
    newsArticle: {
      title: "RKPI: een veiliger BGP binnen handbereik",
      content:
        "RPKI gebruikt digitale handtekeningen om BGP-routes te verifiëren. Routers controleren of de handtekeningen kloppen; zo niet, wordt de route verworpen, wat aanvallen en vergissingen voorkomt.",
      imageUrl: "/images/news/4.png",
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
          colors: ["blue", "red", "green", "purple", "yellow"],
        },
        {
          position: [-8, 1, -24],
          colors: ["blue", "red", "green", "purple", "yellow"],
        },
        {
          position: [10, 1, -22],
          colors: ["blue", "red", "green", "purple", "yellow"],
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
              color: "purple",
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
            {
              color: "yellow",
              mistakenBadActor: true,
              minusScoreNumber: 5,
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
        ballColors: ["blue", "red", "green", "yellow", "purple"],
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
            colors: [
              {
                color: "purple",
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
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
            colors: [],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene2: {
        time: 15,
        spawnRate: 1.9,
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
                color: "purple",
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
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene3: {
        time: 20,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "purple",
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
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene4: {
        time: 30,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "purple",
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "purple",
                transition: true,
              },
              {
                color: "green",
              },
              {
                color: "yellow",
                transition: true,
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene5: {
        time: 35,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
              {
                color: "purple",
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
                minusScoreNumber: 20,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene6: {
        time: 45,
        spawnRate: 1.8,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 5,
                transition: true,
              },
              {
                color: "purple",
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
                color: "blue",
                transition: true,
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
                minusScoreNumber: 20,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene7: {
        time: 50,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
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
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
              {
                color: "blue",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene8: {
        time: 60,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
              },
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
                color: "red",
                mistakenBadActor: true,
                minusScoreNumber: 20,
                transition: true,
              },
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene9: {
        time: 65,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
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
                color: "green",
                transition: true,
              },
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
                mistakenBadActor: true,
                minusScoreNumber: 5,
                transition: true,
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene10: {
        time: 75,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building2",
            colors: [
              {
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene11: {
        time: 80,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "purple",
                mistakenBadActor: true,
                minusScoreNumber: 5,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "red",
                transition: true,
              },
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
            name: "Building4",
            colors: [
              {
                color: "red",
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene12: {
        time: 90,
        spawnRate: 1.7,
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
                minusScoreNumber: 20,
              },
            ],
          },
          {
            name: "Building3",
            colors: [
              {
                color: "blue",
                mistakenBadActor: true,
                minusScoreNumber: 5,
              },
            ],
          },
          {
            name: "Building4",
            colors: [
              {
                color: "red",
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene13: {
        time: 95,
        spawnRate: 1.7,
        buildingColors: [
          {
            name: "Building1",
            colors: [
              {
                color: "green",
                transition: true,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
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
                minusScoreNumber: 5,
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
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // ------------- transition scene -----------
      scene14: {
        time: 105,
        spawnRate: 1.7,
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
                color: "yellow",
                mistakenBadActor: true,
                minusScoreNumber: 20,
                transition: true,
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
                minusScoreNumber: 5,
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
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
      // --------------------------------
      scene15: {
        time: 110,
        spawnRate: 1.7,
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
                mistakenBadActor: true,
                minusScoreNumber: 20,
              },
              {
                color: "purple",
              },
            ],
          },
        ],
        ballColors: ["blue", "red", "green", "yellow", "purple"], // Colors for the spawner
        accelerators: [
          {
            position: [0, 1, -16],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [-8, 1, -24],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
          {
            position: [10, 1, -22],
            colors: ["blue", "red", "green", "purple", "yellow"],
          },
        ],
      },
    },
  },
];

export default levelsData;
