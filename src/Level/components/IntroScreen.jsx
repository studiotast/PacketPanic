import { faArrowRight, faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import Button from "../../Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame.js";
import "../../style.css";

// Tooltip component for interactive terms
const InteractiveTerm = ({ term, explanation }) => (
  <Tippy
    content={explanation}
    animation="scale"
    arrow={true}
    placement="top"
    theme="custom"
  >
    <span className="interactive-term">{term}</span>
  </Tippy>
);

export default function IntroScreen() {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const [page, setPage] = useState(0);
  const [delayedTextShow, setDelayedTextShow] = useState(false);

  // Constants for animation timing
  const LOGO_EXIT_DURATION = 0.4; // Slowed down
  const TRACK_ANIMATION_DURATION = 0.4; // Slowed down

  // Split text into paragraphs
  const paragraphs = [
    "Het internet bestaat uit pakketjes die op weg zijn naar hun eindbestemming. De weg van de pakketjes gaan van router naar router. Vaak gaat de reis over de grenzen van meerdere autonome systemen.",
    "Pakketjes vertrouwen op het Border Gateway Protocol (BGP) om de beste route te kiezen. Maar het BGP werkt op basis van informatie die het krijgt van andere netwerken, en die informatie is niet altijd correct...",
  ];

  // Handle button click
  const handleClick = () => {
    if (page === 0) {
      setPage(1);
      setDelayedTextShow(false); // Reset text visibility
    } else {
      startFromIntro();
    }
  };

  // Trigger text animation after track has moved
  useEffect(() => {
    if (page === 1) {
      // Wait for logo to fade and track to move up
      const timer = setTimeout(() => {
        setDelayedTextShow(true);
      }, (LOGO_EXIT_DURATION + TRACK_ANIMATION_DURATION) * 1000); // Convert to ms

      return () => clearTimeout(timer); // Clean up
    }
  }, [page, LOGO_EXIT_DURATION, TRACK_ANIMATION_DURATION]);

  // Animation variants
  const logoVariants = {
    visible: { opacity: 1, y: -160 },
    hidden: {
      opacity: 0,
      y: -250,
      transition: {
        duration: LOGO_EXIT_DURATION,
        ease: "easeInOut",
      },
    },
  };

  const trackVariants = {
    initial: { opacity: 1, y: 20 },
    animate: {
      opacity: 1,
      y: page === 0 ? 20 : -350,
      transition: {
        duration: TRACK_ANIMATION_DURATION,
        ease: "easeInOut",
      },
    },
  };

  // Staggered paragraph animation
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      y: 200,
      transition: {
        staggerChildren: 0.3, // Longer delay between paragraphs
        delayChildren: 0.2,
      },
    },
  };

  const paragraphAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  const renderParagraphWithTerms = (text, index) => {
    // For each term, create a React component replacement
    const parts = [];
    let remainingText = text;

    // Create a collection of terms and their tooltips
    const terms = [
      {
        term: "router naar router",
        explanation:
          "Routers zijn apparaten die pakketjes doorsturen tussen netwerken. Pakketjes reizen van de ene router naar de andere om hun bestemming te bereiken.",
      },
      {
        term: "autonome systemen",
        explanation:
          "Een autonoom systeem (AS) is een netwerk of verzameling van netwerken onder beheer van één organisatie, zoals een internetprovider of groot bedrijf.",
      },
      {
        term: "Border Gateway Protocol",
        explanation:
          "BGP is het routeringsprotocol dat wordt gebruikt om te bepalen hoe pakketjes tussen autonome systemen op het internet worden doorgestuurd.",
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
      <motion.p
        key={index}
        variants={paragraphAnimation}
        className="intro-text-paragraph"
      >
        {parts}
      </motion.p>
    );
  };

  return (
    <Layout>
      <div className="intro-content">
        <AnimatePresence>
          {page === 0 && (
            <motion.img
              key="logo"
              alt="PacketPanic"
              src="./images/packet-panic.svg"
              className="intro-logo"
              initial="visible"
              animate="visible"
              exit="hidden"
              variants={logoVariants}
            />
          )}
        </AnimatePresence>

        <motion.img
          alt="track"
          src="./images/intro.png"
          className="intro-track"
          variants={trackVariants}
          initial="initial"
          animate="animate"
        />

        {/* Only show text after track animation completes */}
        {page === 1 && delayedTextShow && (
          <motion.div
            className="intro-text-container"
            variants={textContainer}
            initial="hidden"
            animate="show"
          >
            {paragraphs.map((paragraph, index) =>
              renderParagraphWithTerms(paragraph, index)
            )}
          </motion.div>
        )}

        <Button onClick={handleClick}>
          {page === 0 ? "Volgende" : "Beginnen"}
          <FontAwesomeIcon
            icon={page === 0 ? faArrowRight : faPlay}
            style={{ marginLeft: "10px" }}
          />
        </Button>
      </div>
    </Layout>
  );
}
