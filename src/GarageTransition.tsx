import React, { useEffect, useState, useRef } from "react";
import { useModels } from "./stores/useModels";
import { motion, AnimatePresence } from "framer-motion";
import useGame from "./stores/useGame";

declare global {
  interface Window {
    initiatePhaseTransition?: (targetPhase: string) => void;
    isTransitioning?: boolean;
  }
}

export default function GarageTransition() {
  const loaded = useModels((state) => state.loaded);
  const phase = useGame((state) => state.phase);
  const startFromIntro = useGame((state) => state.startFromIntro);
  const startTutorial = useGame((state) => state.startTutorial); // Add this if it doesn't exist
  const playSound = useGame((state) => state.playSound);

  // Track states
  const [showGarage, setShowGarage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingPhaseRef = useRef<string | null>(null);
  const sourcePhaseRef = useRef<string | null>(null);

  // Function to initiate phase transition with garage animation
  const initiateTransition = (targetPhase: string) => {
    // Allow transitions from both intro and explanation phases
    if (
      (phase === "intro" || phase === "explanation" || phase === "tutorial") &&
      !isTransitioning
    ) {
      sourcePhaseRef.current = phase; // Store source phase
      setIsTransitioning(true);
      window.isTransitioning = true;
      setShowGarage(true);
      pendingPhaseRef.current = targetPhase;
    }
  };

  // Make the transition function available globally
  useEffect(() => {
    window.initiatePhaseTransition = initiateTransition;

    return () => {
      window.initiatePhaseTransition = undefined;
    };
  }, [phase, isTransitioning, loaded]);

  // Handle the transition when models are loaded
  useEffect(() => {
    if (showGarage && isTransitioning && pendingPhaseRef.current) {
      playSound("garageClose");

      setTimeout(() => {
        // Handle different target phases
        if (
          pendingPhaseRef.current === "explanation" &&
          sourcePhaseRef.current === "intro"
        ) {
          startFromIntro();
        } else if (
          pendingPhaseRef.current === "tutorial" &&
          sourcePhaseRef.current === "explanation"
        ) {
          // Transition to tutorial
          if (typeof startTutorial === "function") {
            startTutorial();
          } else {
            console.warn("startTutorial function not found in useGame");
          }
        } else if (
          pendingPhaseRef.current === "ready" &&
          sourcePhaseRef.current === "tutorial"
        ) {
          useGame.setState({ phase: "ready" });
        }

        if (loaded) {
          // Then wait before starting the exit animation
          const timer = setTimeout(() => {
            playSound("garageOpen");
            setShowGarage(false);

            // Reset states after animation completes
            const cleanupTimer = setTimeout(() => {
              setIsTransitioning(false);
              window.isTransitioning = false;
              pendingPhaseRef.current = null;
              sourcePhaseRef.current = null;
            }, 200);

            return () => clearTimeout(cleanupTimer);
          }, 500);
          return () => clearTimeout(timer);
        }
      }, 1000);
    }
  }, [loaded, showGarage, isTransitioning, startFromIntro, startTutorial]);

  // Animation variants
  const garageVariants = {
    hidden: { y: "-100vh" },
    visible: { y: 0 },
    exit: { y: "-100vh", transition: { duration: 1.2, ease: "easeInOut" } },
  };

  return (
    <AnimatePresence>
      {showGarage && (
        <motion.div
          key="garage"
          className="garage-transition"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={garageVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
        >
          <img
            src="/images/garage.png"
            alt="Loading transition"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
