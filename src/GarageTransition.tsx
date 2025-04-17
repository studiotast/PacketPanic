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

  // Track states
  const [showGarage, setShowGarage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingPhaseRef = useRef<string | null>(null);

  // Function to initiate phase transition with garage animation
  const initiateTransition = (targetPhase: string) => {
    if (phase === "intro" && !isTransitioning) {
      console.log("Starting transition to", targetPhase);
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
      console.log("Models loaded, initiating phase change");

      setTimeout(() => {
        // First trigger the phase change - IMPORTANT: Do this before animation
        if (pendingPhaseRef.current === "explanation") {
          startFromIntro();
        }
        if (loaded) {
          // Then wait before starting the exit animation
          const timer = setTimeout(() => {
            console.log("Starting garage exit animation");
            setShowGarage(false);

            // Reset states after animation completes
            const cleanupTimer = setTimeout(() => {
              setIsTransitioning(false);
              window.isTransitioning = false;
              pendingPhaseRef.current = null;
            }, 200); // Match exit animation duration

            return () => clearTimeout(cleanupTimer);
          }, 200);
          return () => clearTimeout(timer);
        }
      }, 1000);
    }
  }, [loaded, showGarage, isTransitioning, startFromIntro]);

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
