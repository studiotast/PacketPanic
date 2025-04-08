import React, { useState, useEffect } from "react";
import "../../style.css";
import useGame from "../../stores/useGame.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const [page, setPage] = useState(0);
  const [delayedTextShow, setDelayedTextShow] = useState(false);

  // Constants for animation timing
  const LOGO_EXIT_DURATION = 0.6; // Logo fade out
  const TRACK_ANIMATION_DURATION = 0.8; // Track movement

  // Text for the second page
  const introText =
    "Het internet bestaat uit pakketjes die op weg zijn naar hun eindbestemming. De weg van de pakketjes gaan van router naar router. Vaak gaat de reis over de grenzen van meerdere autonome systemen.Pakketjes vertrouwen op het Border Gateway Protocol (BGP) om de beste route te kiezen. Maar het BGP werkt op basis van informatie die het krijgt van andere netwerken, en die informatie is niet altijd correct...";

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
    visible: { opacity: 1, y: 0 },
    hidden: {
      opacity: 0,
      y: -50,
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
      y: page === 0 ? 20 : -300,
      transition: {
        duration: TRACK_ANIMATION_DURATION,
        ease: "easeInOut",
        // Start track animation when logo is partially faded
        delay: page === 1 ? 0.05 : 0,
      },
    },
  };

  const buttonVariants = {
    initial: {
      x: "-50%",
      scale: 1,
    },
    tap: {
      x: "-50%",
      scale: 0.95,
    },
    hover: {
      x: "-50%",
      backgroundColor: "#dc9329",
      boxShadow: "0 9px 0 0 #a5701f",
    },
  };

  // Staggered text animation - no delay needed here anymore
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      y: 300,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textLine = {
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

  // Split the text into lines
  const textLines = introText
    .split(". ")
    .map((line) => line.trim() + (line.endsWith(".") ? "" : "."));

  return (
    <div className="intro-screen">
      <div className="intro-inner">
        <img alt="bg" src="/images/bg.jpg" className="intro-bg" />
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
              {textLines.map((line, index) => (
                <motion.p
                  key={index}
                  variants={textLine}
                  className="intro-text-line"
                  style={{
                    color: "#fff",
                    marginBottom: "12px",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}

          <motion.button
            className="start-button"
            onClick={handleClick}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Beginnen
            <FontAwesomeIcon
              icon={page === 0 ? faArrowRight : faPlay}
              style={{ marginLeft: "10px" }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
