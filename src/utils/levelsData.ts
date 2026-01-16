import * as THREE from "three";
import type { TranslatedString } from "./getTranslated";

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
  description: TranslatedString;
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
  text: TranslatedString;
}

interface SceneData {
  time: number;
  spawnRate: number;
  buildingColors: BuildingConfig[];
  ballColors: string[];
  accelerators?: AcceleratorConfig[];
}

interface Tutorial {
  text: TranslatedString;
}

interface ScoreScreen {
  title: TranslatedString;
  description: TranslatedString;
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
  text: TranslatedString;
  button: TranslatedString;
}

interface NewsArticle {
  title: TranslatedString;
  content: TranslatedString;
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
    description: {
      nl: "Stuur de gekleurde pakketjes naar de juiste gebouwen!",
      en: "Direct the colored packets to their matching buildings!",
    },
    tutorial: [
      {
        text: {
          nl: "Stuur de pakketjes de goede kant op.",
          en: "Direct the packets the right way.",
        },
      },
      {
        text: {
          nl: "De pakketjes volgen richting van de wegwijzer.",
          en: "The packets follow the direction of the signpost.",
        },
      },
      {
        text: {
          nl: "De vlaggetjes geven aan wat de beste route is volgens het BGP.",
          en: "The flags indicate the best route according to BGP.",
        },
      },
      {
        text: {
          nl: "Wat de beste route is kan tijdens het level veranderen. Nieuwe vlaggetjes geven de nieuwe route aan, de oude worden doorzichtig en verdwijnen vervolgens.",
          en: "The best route can change during the level. New flags indicate the new route, the old ones become transparent and then disappear.",
        },
      },
      {
        text: {
          nl: "Beweeg de muis met de linkermuisknop ingedrukt om de camera te draaien.",
          en: "Move the mouse with the left mouse button pressed to rotate the camera.",
        },
      },
      {
        text: {
          nl: "Scroll met je muiswiel om in en uit te zoomen.",
          en: "Scroll with your mouse wheel to zoom in and out.",
        },
      },
    ],
    storyLine: [
      {
        text: {
          nl: "Welkom op je eerste werkdag als verkeersleider bij Packet Panic B.V.",
          en: "Welcome to your first day as a traffic controller at Packet Panic Inc.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Het meest prestigieuze autonome systeem van Nederland.",
          en: "The most prestigious autonomous system in the Netherlands.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Mijn naam is D.I.R.K (Digitale Interne Routing Kracht). Maar jij mag me gewoon 'baas' noemen.",
          en: "My name is D.I.R.K (Digital Internal Routing Force). But you can just call me 'boss'.",
        },
        button: {
          nl: "Ja, baas...",
          en: "Yes, boss...",
        },
      },
      {
        text: {
          nl: "Je hebt het simpelste baantje op aarde. Het BGP vertelt je de beste route voor ieder pakketje.",
          en: "You have the simplest job on earth. BGP tells you the best route for each packet.",
        },
        button: {
          nl: "Oké!",
          en: "Okay!",
        },
      },
      {
        text: {
          nl: "Jij hoeft alleen maar te zorgen dat iedere wegwijzer de goede kant op wijst. Makkie toch?",
          en: "You just need to make sure every signpost points in the right direction. Easy, right?",
        },
        button: {
          nl: "Ik snap het",
          en: "I understand",
        },
      },
      {
        text: {
          nl: "Tenzij het BGP je de verkeerde route doorgeeft. Dan wordt het ingewikkeld. ",
          en: "Unless BGP gives you the wrong route. Then it gets complicated.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Maar dat gebeurt waarschijnlijk niet...",
          en: "But that probably won't happen...",
        },
        button: {
          nl: "Eh...",
          en: "Uh...",
        },
      },
      {
        text: {
          nl: "Oké. Dan kom je er wel uit hé. Succes!",
          en: "Okay. You'll figure it out. Good luck!",
        },
        button: {
          nl: "Bedankt...",
          en: "Thanks...",
        },
      },
    ],
    scoreScreen: [
      {
        title: {
          nl: "Level gehaald!",
          en: "Level completed!",
        },
        description: {
          nl: "Lekker gewerkt zeg! Maar zonder mijn hulp was het natuurlijk niet gelukt. Toch?",
          en: "Great work! But without my help, you wouldn't have made it, right?",
        },
      },
      {
        title: {
          nl: "Level niet gehaald...",
          en: "Level not completed...",
        },
        description: {
          nl: "Dat is ook een manier om het te doen. Maar niet de goede. Blijkbaar was het toch niet zo simpel...",
          en: "That's one way to do it. But not the right way. Apparently, it wasn't so simple after all...",
        },
      },
    ],
    newsArticle: {
      title: {
        nl: "BGP: de achilleshiel van het internet",
        en: "BGP: the Achilles heel of the internet",
      },
      content: {
        nl: "Het BGP werkt vaak prima. Maar wat de bedenkers niet hebben voorzien, is dat het internet een plek zou worden waar niet iedereen altijd eerlijk is. Door het gebrek aan authenticatie, kun je niet checken of een via BGP aangekondigde route klopt.",
        en: "BGP often works fine. But what the creators didn't foresee is that the internet would become a place where not everyone is always honest. Due to the lack of authentication, you can't verify if a route announced via BGP is correct.",
      },
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
    description: {
      nl: "Stuur de gekleurde pakketjes naar de juiste gebouwen!",
      en: "Direct the colored packets to their matching buildings!",
    },
    notifications: [
      {
        text: {
          nl: "YouTube is niet bereikbaar.",
          en: "YouTube is not reachable.",
        },
      },
      {
        text: {
          nl: "Krijg foutmelding bij YouTube.",
          en: "Getting error message on YouTube.",
        },
      },
      {
        text: {
          nl: "Kan YouTube niet laden.",
          en: "Can't load YouTube.",
        },
      },
      {
        text: {
          nl: "Website niet bereikbaar.",
          en: "Website not reachable.",
        },
      },
    ],
    tutorial: [
      {
        text: {
          nl: "Pakketje gaan nu langs meerdere wegwijzers, zet ze allemaal goed als een route wijzigt.",
          en: "Packets now pass multiple signposts, set them all correctly when a route changes.",
        },
      },
    ],
    storyLine: [
      {
        text: {
          nl: "Dus je hebt gister helemaal geen problemen met het BGP ervaren?",
          en: "So you didn't experience any problems with BGP yesterday?",
        },
        button: {
          nl: "Nee",
          en: "No",
        },
      },
      {
        text: {
          nl: "Alles wat mis ging was je eigen fout?",
          en: "Everything that went wrong was your own fault?",
        },
        button: {
          nl: "Ja?",
          en: "Yes?",
        },
      },
      {
        text: {
          nl: "De wonderen zijn de wereld nog niet uit...",
          en: "Wonders never cease...",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Laten we hopen dat dat vandaag zo blijft!",
          en: "Let's hope it stays that way today!",
        },
        button: {
          nl: "Verder",
          en: "Continue",
        },
      },
    ],
    scoreScreen: [
      {
        title: {
          nl: "Level gehaald!",
          en: "Level completed!",
        },
        description: {
          nl: "Yes! Gelukt. Wat zijn we toch een fantastisch team! Vind je ook niet?",
          en: "Yes! Success. What a fantastic team we are! Don't you think?",
        },
      },
      {
        title: {
          nl: "Level niet gehaald...",
          en: "Level not completed...",
        },
        description: {
          nl: "Helaas pindakaas... Maar we geven de moed niet op en proberen het gewoon nog een keer. Toch? Toch?",
          en: "Too bad... But we won't give up and just try again. Right? Right?",
        },
      },
    ],
    newsArticle: {
      title: {
        nl: "BGP-foutje Pakistan legt Youtube plat",
        en: "Pakistan BGP error takes down YouTube",
      },
      content: {
        nl: "In maart 2008 lag YouTube voor miljoenen gebruikers urenlang plat. De Pakistaanse overheid probeerde YouTube in hun land te blokkeren. Maar door een fout in de BGP-configuratie stuurden ze juist verkeer uit andere landen naar Pakistaanse netwerken.",
        en: "In March 2008, YouTube was down for millions of users for hours. The Pakistani government tried to block YouTube in their country. But due to an error in the BGP configuration, they redirected traffic from other countries to Pakistani networks.",
      },
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
    description: {
      nl: "Stuur de gekleurde pakketjes naar de juiste gebouwen!",
      en: "Direct the colored packets to their matching buildings!",
    },
    notifications: [
      {
        text: {
          nl: "Kan de website niet laden.",
          en: "Can't load the website.",
        },
      },
      {
        text: {
          nl: "Website niet bereikbaar.",
          en: "Website not reachable.",
        },
      },
    ],
    seriousNotifications: [
      {
        text: {
          nl: "Mijn crypto is verdwenen door deze nepwebsite!",
          en: "My crypto disappeared through this fake website!",
        },
      },
      {
        text: {
          nl: "Mijn digitale munten zijn weg! Dit was een scam!",
          en: "My digital coins are gone! This was a scam!",
        },
      },
      {
        text: {
          nl: "Ik ben opgelicht! Al mijn crypto is verdwenen!",
          en: "I've been scammed! All my crypto is gone!",
        },
      },
      {
        text: {
          nl: "Mijn crypto is weg! Dit was een nepwebsite!",
          en: "My crypto is gone! This was a fake website!",
        },
      },
    ],
    warnings: [
      {
        text: {
          nl: "Let op, deze site lijkt onveilig!",
          en: "Warning, this site seems unsafe!",
        },
      },
      {
        text: {
          nl: "Waarschuwing: Website niet helemaal oké.",
          en: "Warning: Website not quite right.",
        },
      },
      {
        text: {
          nl: "De website komt niet helemaal betrouwbaar over.",
          en: "The website doesn't seem completely trustworthy.",
        },
      },
      {
        text: {
          nl: "Deze website lijkt verdacht.",
          en: "This website looks suspicious.",
        },
      },
    ],
    tutorial: [
      {
        text: {
          nl: "Vermijd strafpunten! Leidt het verkeer om zodra je ziet dat verkeer niet aankomt bij een nieuwe route.",
          en: "Avoid penalties! Redirect traffic as soon as you see that traffic isn't arriving at a new route.",
        },
      },
    ],
    storyLine: [
      {
        text: {
          nl: "Één klein foutje...",
          en: "One small mistake...",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "YouTube urenlang onbereikbaar.",
          en: "YouTube unreachable for hours.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Nouja, gelukkig was het niet onze schuld! Go team Packet Panic!",
          en: "Well, fortunately it wasn't our fault! Go team Packet Panic!",
        },
        button: {
          nl: "YEAH!",
          en: "YEAH!",
        },
      },
      {
        text: {
          nl: "Maar ontevreden klanten zijn wel een probleem.",
          en: "But unhappy customers are still a problem.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Dus als je merkt dat BGP het bij het verkeerde eind heeft.",
          en: "So if you notice that BGP is wrong.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Negeer de vlaggetjes en stuur het verkeer via een andere route.",
          en: "Ignore the flags and send the traffic via another route.",
        },
        button: {
          nl: "Oké!",
          en: "Okay!",
        },
      },
      {
        text: {
          nl: "Go get 'm tiger!",
          en: "Go get 'em tiger!",
        },
        button: {
          nl: "RAAAWR!",
          en: "RAAAWR!",
        },
      },
    ],
    scoreScreen: [
      {
        title: {
          nl: "Level gehaald!",
          en: "Level completed!",
        },
        description: {
          nl: "Wauw, je bent hier goed in. Daar zou je iets mee moeten doen. Verkeersleider. Of pakketjesbezorger!",
          en: "Wow, you're good at this. You should do something with that. Traffic controller. Or package deliverer!",
        },
      },
      {
        title: {
          nl: "Level niet gehaald...",
          en: "Level not completed...",
        },
        description: {
          nl: "Oh jee... Volgens mij heb je het internet kapotgemaakt. Wil je misschien even een momentje voor jezelf?",
          en: "Oh dear... I think you broke the internet. Would you like a moment to yourself?",
        },
      },
    ],
    newsArticle: {
      title: {
        nl: "$235,000 aan cryptocurrency gestolen door BGP-hijack",
        en: "$235,000 in cryptocurrency stolen through BGP hijack",
      },
      content: {
        nl: "In september 2022 leidde een fout bij Amazon tot de diefstal van 235.000 dollar aan cryptocurrency. Verkeer werd omgeleid naar een nepwebsite die eruitzag als een legitieme cryptocurrency-dienst, waar hackers de bezoekers hun crypto afhandig maakten.",
        en: "In September 2022, an error at Amazon led to the theft of $235,000 in cryptocurrency. Traffic was redirected to a fake website that looked like a legitimate cryptocurrency service, where hackers stole visitors' crypto.",
      },
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
    description: {
      nl: "Stuur de gekleurde pakketjes naar de juiste gebouwen!",
      en: "Direct the colored packets to their matching buildings!",
    },
    notifications: [
      {
        text: {
          nl: "Kan de website niet laden.",
          en: "Can't load the website.",
        },
      },
      {
        text: {
          nl: "Website niet bereikbaar.",
          en: "Website not reachable.",
        },
      },
    ],
    seriousNotifications: [
      {
        text: {
          nl: "Mijn crypto is verdwenen door deze nepwebsite!",
          en: "My crypto disappeared through this fake website!",
        },
      },
      {
        text: {
          nl: "Mijn digitale munten zijn weg! Dit was een scam!",
          en: "My digital coins are gone! This was a scam!",
        },
      },
      {
        text: {
          nl: "Ik ben opgelicht! Al mijn crypto is verdwenen!",
          en: "I've been scammed! All my crypto is gone!",
        },
      },
      {
        text: {
          nl: "Mijn crypto is weg! Dit was een nepwebsite!",
          en: "My crypto is gone! This was a fake website!",
        },
      },
    ],
    warnings: [
      {
        text: {
          nl: "Let op, deze site lijkt onveilig!",
          en: "Warning, this site seems unsafe!",
        },
      },
      {
        text: {
          nl: "Waarschuwing: Website niet helemaal oké.",
          en: "Warning: Website not quite right.",
        },
      },
      {
        text: {
          nl: "De website komt niet helemaal betrouwbaar over.",
          en: "The website doesn't seem completely trustworthy.",
        },
      },
      {
        text: {
          nl: "Deze website lijkt verdacht.",
          en: "This website looks suspicious.",
        },
      },
    ],
    tutorial: [
      {
        text: {
          nl: "Een uitroepteken geeft aan dat de route niet betrouwbaar is, vermijdt deze routes.",
          en: "An exclamation mark indicates that the route is not trustworthy, avoid these routes.",
        },
      },
    ],
    storyLine: [
      {
        text: {
          nl: "Ik heb een nieuwshamburger voor je: slecht nieuws, goed nieuws en slecht nieuws.",
          en: "I have a news hamburger for you: bad news, good news, and bad news.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Welke wil je eerst?",
          en: "Which one do you want first?",
        },
        button: {
          nl: "Goed nieuws",
          en: "Good news",
        },
      },
      {
        text: {
          nl: "Ik begin toch met het slechte nieuws.",
          en: "I'll start with the bad news anyway.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Het is zeer waarschijnlijk dat er veel minder crypto was gestolen als wij wat sneller hadden gereageerd.",
          en: "It's very likely that much less crypto would have been stolen if we had reacted faster.",
        },
        button: {
          nl: "Oh, balen...",
          en: "Oh, that's unfortunate...",
        },
      },
      {
        text: {
          nl: "Het goede nieuws is dat ik gelijk actie heb ondernomen: vanaf nu hebben we veel betere beveiliging in ons autonome systeem",
          en: "The good news is that I took immediate action: from now on we have much better security in our autonomous system",
        },
        button: {
          nl: "En het laatste slechte nieuws?",
          en: "And the last bad news?",
        },
      },
      {
        text: {
          nl: "Oh ja, het belangrijkste nieuws...",
          en: "Oh yes, the most important news...",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Je werk wordt een stuk minder interessant. Saai, zou ik wel durven zeggen.",
          en: "Your work is going to be a lot less interesting. Boring, I would dare to say.",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Ze zitten er zelfs aan te denken het bedrijf een nieuwe naam te geven: CalmConnect",
          en: "They're even thinking about giving the company a new name: CalmConnect",
        },
        button: {
          nl: "...",
          en: "...",
        },
      },
      {
        text: {
          nl: "Dus ik heb m'n ontslag ingediend.",
          en: "So I've handed in my resignation.",
        },
        button: {
          nl: "Oh, nee!",
          en: "Oh, no!",
        },
      },
      {
        text: {
          nl: "Als ik geen paniek meer kan zaaien, zet ik mijn diensten liever ergens anders in.",
          en: "If I can't cause panic anymore, I'd rather use my services elsewhere.",
        },
        button: {
          nl: "Ik ga je missen, baas!",
          en: "I'm going to miss you, boss!",
        },
      },
      {
        text: {
          nl: "Zeg maar D.I.R.K., ik ben je baas niet meer...",
          en: "Just call me D.I.R.K., I'm not your boss anymore...",
        },
        button: {
          nl: ":(",
          en: ":(",
        },
      },
      {
        text: {
          nl: "See you later, alligator!",
          en: "See you later, alligator!",
        },
        button: {
          nl: "In a while, crocodile!",
          en: "In a while, crocodile!",
        },
      },
    ],
    scoreScreen: [
      {
        title: {
          nl: "Level gehaald!",
          en: "Level completed!",
        },
        description: {
          nl: "Dit is de voicemail van D.I.R.K. Ik ben helaas niet beschikbaar om je positieve of negatieve feedback te geven. Probeer het later nog eens.",
          en: "This is D.I.R.K.'s voicemail. I'm unfortunately not available to give you positive or negative feedback. Please try again later.",
        },
      },
      {
        title: {
          nl: "Level niet gehaald...",
          en: "Level not completed...",
        },
        description: {
          nl: "Dit is de voicemail van D.I.R.K. Ik ben helaas niet beschikbaar om je positieve of negatieve feedback te geven. Probeer het later nog eens.",
          en: "This is D.I.R.K.'s voicemail. I'm unfortunately not available to give you positive or negative feedback. Please try again later.",
        },
      },
    ],
    newsArticle: {
      title: {
        nl: "RPKI: een veiliger BGP binnen handbereik",
        en: "RPKI: a safer BGP within reach",
      },
      content: {
        nl: "RPKI gebruikt digitale handtekeningen om BGP-routes te verifiëren. Routers controleren of de handtekeningen kloppen; zo niet dan wordt de route verworpen, wat aanvallen en vergissingen voorkomt.",
        en: "RPKI uses digital signatures to verify BGP routes. Routers check if the signatures are correct; if not, the route is rejected, which prevents attacks and mistakes.",
      },
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
