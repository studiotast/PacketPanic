import {
  faArrowRight,
  faCircleInfo,
  faForward,
  faPlay,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import Button from "../Button/Button.tsx";
import Layout from "../../Layout.tsx";
import useGame from "../../stores/useGame.ts";
import levelsData from "../../utils/levelsData.ts";
import styles from "./IntroScreen.module.scss";
import LeftCornerPiece from "../CornerPiece/LeftCornerPiece.tsx";
import RightCornerPiece from "../CornerPiece/RightCornerPiece.tsx";
import { useGLTF } from "@react-three/drei";

// Tooltip component for interactive terms
interface InteractiveTermProps {
  term: string;
  explanation: string;
  image: string;
}

const InteractiveTerm: React.FC<InteractiveTermProps> = ({
  term,
  explanation,
  image,
}) => (
  <Tippy
    content={
      <div className={styles.tooltipContent}>
        {image && (
          <img src={image} alt={term} className={styles.tooltipImage} />
        )}
        <div className={styles.tooltipText}>{explanation}</div>
      </div>
    }
    animation="scale"
    arrow={true}
    placement="top"
    theme="custom"
  >
    <span className={styles.interactiveTerm}>{term}</span>
  </Tippy>
);

export default function IntroScreen() {
  useEffect(() => {
    // Start met preloaden van alle modellen zodra het scherm zichtbaar is
    useGLTF.preload("assets/models/track_straight_long_a03.glb");
    useGLTF.preload("assets/models/track_straight_short_a05.glb");
    useGLTF.preload("assets/models/track_corner_a03.glb");
    useGLTF.preload("assets/models/track_curve_a03.glb");
    useGLTF.preload("assets/models/track_junction_a06.glb");
    useGLTF.preload("assets/models/signpost_sign_a03.glb");
    useGLTF.preload("assets/models/signpost_pole_2signs_a01.glb");
    useGLTF.preload("assets/models/signpost_pole_3signs_a01.glb");
    useGLTF.preload("assets/models/signpost_pole_4signs_a01.glb");
    useGLTF.preload("assets/models/signpost_pole_5signs_a01.glb");
    useGLTF.preload("assets/models/house_a02.glb");
    useGLTF.preload("assets/models/house_flag_a02.glb");
    useGLTF.preload("assets/models/house_flag_attention_a01.glb");
    useGLTF.preload("assets/models/platform_level1_a03.glb");
    useGLTF.preload("assets/models/platform_level2_a03.glb");
    useGLTF.preload("assets/models/platform_level3&4_a01.glb");
  }, []);

  const startFromIntro = useGame((state) => state.startFromIntro);
  const loadSavedLevel = useGame((state) => state.loadSavedLevel);
  const hasSavedLevel = useGame((state) => state.hasSavedLevel);
  const getSavedLevelId = useGame((state) => state.getSavedLevelId);
  const [page, setPage] = useState(0);
  const playSound = useGame((state) => state.playSound);
  const stopSound = useGame((state) => state.stopSound);
  const aboutPage = useGame((state) => state.aboutPage);
  const isMuted = useGame((state) => state.isMuted);

  // Check if there's a saved game on mount
  const [savedGame, setSavedGame] = useState(false);
  const [savedLevel, setSavedLevel] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Check for saved level
    const hasLevel = hasSavedLevel();
    setSavedGame(hasLevel);

    if (hasLevel) {
      const levelId = getSavedLevelId();
      const level = levelsData.find((l) => l.id === levelId);
      if (level) {
        setSavedLevel({
          id: level.id,
          name: level.name,
        });
      }
    }
  }, [hasSavedLevel, getSavedLevelId]);

  // Handle continue game click
  const handleContinue = () => {
    // Play button sound
    playSound("button");

    // Load the saved level
    loadSavedLevel();

    if (typeof window.initiatePhaseTransition === "function") {
      window.initiatePhaseTransition("explanation");
    } else {
      // Fallback if transition isn't available
      startFromIntro();
    }
  };

  useEffect(() => {
    // Play menu sound when the component mounts
    if (!isMuted) {
      playSound("menu");
    }

    // Return cleanup function to stop sound on unmount
    return () => {
      stopSound("menu");
    };
  }, [playSound, stopSound, isMuted]);

  // Split text into paragraphs
  const paragraphs = [
    "Iedere seconde zijn miljarden pakketjes op weg naar hun eindbestemming op het internet. Deze stukjes data reizen van router naar router, vaak over de grenzen van meerdere autonome systemen. Ze vertrouwen blind op het Border Gateway Protocol (BGP) om de beste route te kiezen. Maar het BGP werkt op basis van informatie die het krijgt van andere netwerken, en die informatie is niet altijd correct…",
  ];

  // Handle button click
  const handleClick = () => {
    if (page === 0) {
      setPage(1);
    } else {
      // Type-safe check and call
      if (typeof window.initiatePhaseTransition === "function") {
        window.initiatePhaseTransition("explanation");
      } else {
        // Fallback if transition isn't available
        startFromIntro();
      }
    }
  };

  // Animation variants with dynamic values
  const logoVariants = {
    initial: { opacity: 0, y: "-100vh" },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const trackVariants = {
    initial: { opacity: 1, y: "-100%" },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  // Staggered paragraph animation
  const textContainer = {
    initial: { opacity: 0, y: "100%" },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const renderParagraphWithTerms = (text: string, index: number) => {
    // For each term, create a React component replacement
    const parts = [];
    let remainingText = text;

    // Create a collection of terms and their tooltips
    const terms = [
      {
        term: "pakketjes",
        explanation:
          "Een pakketje is een stukje data, bijvoorbeeld: een e-mail, een videostream of een verzoek om een website te bezoeken.",
        image: "./assets/images/tooltips/tooltippakketjes_a02.png",
      },
      {
        term: "router naar router",
        explanation:
          "Een router stuurt pakketjes door naar de volgende halte op basis van instructies van protocollen zoals het BGP.",
        image: "./assets/images/tooltips/tooltiprouter_a04.png",
      },
      {
        term: "autonome systemen",
        explanation:
          "Een autonoom systeem is een verzameling netwerken onder het beheer van één organisatie, zoals een internetprovider of een groot bedrijf.",
        image: "./assets/images/tooltips/tooltipAS_a02.png",
      },
      {
        term: "Border Gateway Protocol",
        explanation:
          "Het BGP is het protocol dat gebruikt wordt om de beste route te bepalen naar een bestemming die buiten het huidige autonome systeem ligt",
        image: "./assets/images/tooltips/tooltipBGP_a02.png",
      },
    ];

    // Find each term in order of appearance
    while (remainingText.length > 0) {
      let foundTerm = null;
      let foundPos = Infinity;

      // Find the earliest occurrence of any term
      for (const termObj of terms) {
        const pos = remainingText.indexOf(termObj.term);
        if (pos !== -1 && pos < foundPos) {
          foundPos = pos;
          foundTerm = termObj;
        }
      }

      // If we found a term
      if (foundTerm && foundPos !== Infinity) {
        // Add text before the term
        if (foundPos > 0) {
          parts.push(remainingText.substring(0, foundPos));
        }

        // Add the interactive term
        parts.push(
          <InteractiveTerm
            key={`term-${index}-${foundPos}`}
            term={foundTerm.term}
            explanation={foundTerm.explanation}
            image={foundTerm.image}
          />
        );

        // Update the remaining text (skip past the term completely)
        remainingText = remainingText.substring(
          foundPos + foundTerm.term.length
        );
      } else {
        // No more terms found, add the rest of the text
        parts.push(remainingText);
        break;
      }
    }

    return (
      <p key={index} className={styles.textParagraph}>
        {parts}
      </p>
    );
  };

  return (
    <Layout>
      <div className={styles.content}>
        <AnimatePresence>
          {page === 0 && (
            <motion.img
              key="logo"
              alt="PacketPanic"
              src="./images/packet-panic.svg"
              className={styles.logo}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={logoVariants}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {page === 0 && (
            <motion.div
              variants={trackVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={styles.trackContainer}
            >
              <motion.img
                alt="track"
                src="./images/intro.png"
                className={styles.track}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Only show text after track animation completes */}
        {page === 1 && (
          <AnimatePresence>
            <motion.div
              className={styles.textContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textContainer}
            >
              {paragraphs.map((paragraph, index) =>
                renderParagraphWithTerms(paragraph, index)
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <div className={styles.buttonsColumn}>
          {page === 0 && savedGame ? (
            <>
              <div className={styles.buttonContainerRow}>
                <div className={styles.buttonPositionWrapper}>
                  <Button color="yellow" onClick={handleClick}>
                    Nieuw spel
                    <FontAwesomeIcon icon={faPlay} />
                  </Button>
                </div>

                <div className={styles.buttonPositionWrapper}>
                  <Button color="yellow" onClick={handleContinue}>
                    Doorgaan (Level {savedLevel ? savedLevel.id : "?"})
                    <FontAwesomeIcon icon={faForward} />
                  </Button>
                </div>
              </div>
              <div className={styles.buttonPositionWrapper}>
                <Button color="grey" onClick={() => aboutPage("intro")}>
                  Over Packet Panic
                  <FontAwesomeIcon icon={faCircleInfo} />
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.buttonContainerRow}>
              {page === 0 && (
                <div className={styles.buttonPositionWrapper}>
                  <Button color="grey" onClick={() => aboutPage("intro")}>
                    Over Packet Panic
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </Button>
                </div>
              )}
              <div className={styles.buttonPositionWrapper}>
                <Button color="yellow" onClick={handleClick}>
                  Beginnen
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <LeftCornerPiece />
      <RightCornerPiece />
    </Layout>
  );
}
