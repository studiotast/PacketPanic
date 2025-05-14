import {
  faArrowRight,
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

// Tooltip component for interactive terms
interface InteractiveTermProps {
  term: string;
  explanation: string;
}

const InteractiveTerm: React.FC<InteractiveTermProps> = ({
  term,
  explanation,
}) => (
  <Tippy
    content={explanation}
    animation="scale"
    arrow={true}
    placement="top"
    theme="custom"
  >
    <span className={styles.interactiveTerm}>{term}</span>
  </Tippy>
);

export default function IntroScreen() {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const loadSavedLevel = useGame((state) => state.loadSavedLevel);
  const hasSavedLevel = useGame((state) => state.hasSavedLevel);
  const getSavedLevelId = useGame((state) => state.getSavedLevelId);
  const [page, setPage] = useState(0);
  const playSound = useGame((state) => state.playSound);
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
    // Play sound when the component mounts
    const sound = playSound("menu");

    // Return cleanup function to stop sound on unmount
    return () => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    };
  }, [playSound, isMuted, page]);

  // Split text into paragraphs
  const paragraphs = [
    "Het internet bestaat uit pakketjes die op weg zijn naar hun eindbestemming. De weg van de pakketjes gaan van router naar router. Vaak gaat de reis over de grenzen van meerdere autonome systemen.",
    "Pakketjes vertrouwen op het Border Gateway Protocol (BGP) om de beste route te kiezen. Maar het BGP werkt op basis van informatie die het krijgt van andere netwerken, en die informatie is niet altijd correct...",
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
        duration: 0.8, // Duur van de animatie
        ease: "easeInOut",
        // delay: 0.2, // Vertraging van 1 seconde
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
        duration: 1, // Duur van de animatie
        ease: "easeInOut",
        // delay: 0.2, // Vertraging van 1 seconde
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
          "Een stukje data dat over het internet reist, zoals een e-mail, een videostream een website of een verzoek om een website te bezoeken.",
      },
      {
        term: "router naar router",
        explanation:
          "Routers zijn apparaten die pakketjes doorsturen binnen en tussen netwerken.",
      },
      {
        term: "autonome systemen",
        explanation:
          "Een autonoom systeem (AS) is een netwerk of verzameling netwerken onder het beheer van één organisatie, zoals een internetprovider of een groot bedrijf.",
      },
      {
        term: "Border Gateway Protocol",
        explanation:
          "Het BGP is het routeringsprotocol dat gebruikt wordt om de beste route te bepalen naar een bestemming die buiten het huidige autonome systeem ligt.",
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
            key={`term-${index}-${foundTerm.term}`}
            term={foundTerm.term}
            explanation={foundTerm.explanation}
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

        {page === 0 && savedGame ? (
          <div className={styles.buttonContainerRow}>
            <div className={styles.buttonPositionWrapper}>
              <Button color="yellow" onClick={handleClick}>
                Nieuw spel
                <FontAwesomeIcon icon={faPlay} style={{ marginLeft: "10px" }} />
              </Button>
            </div>

            <div className={styles.buttonPositionWrapper}>
              <Button
                color="yellow"
                onClick={handleContinue}
                className={styles.button}
              >
                Doorgaan (Level {savedLevel ? savedLevel.id : "?"})
                <FontAwesomeIcon
                  icon={faForward}
                  style={{ marginLeft: "10px" }}
                />
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.buttonPositionWrapper}>
            <Button color="yellow" onClick={handleClick}>
              {page === 0 ? "Volgende" : "Beginnen"}
              <FontAwesomeIcon
                icon={page === 0 ? faArrowRight : faPlay}
                style={{ marginLeft: "10px" }}
              />
            </Button>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <LeftCornerPiece />
        <RightCornerPiece />
      </div>
    </Layout>
  );
}
