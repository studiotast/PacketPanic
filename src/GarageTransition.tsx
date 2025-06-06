import { useEffect, useState, useRef } from "react";
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
  const startTutorial = useGame((state) => state.startTutorial);
  const playSound = useGame((state) => state.playSound);

  // Track states
  const [showGarage, setShowGarage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingPhaseRef = useRef<string | null>(null);
  const sourcePhaseRef = useRef<string | null>(null);

  // Function to initiate phase transition with garage animation
  const initiateTransition = (targetPhase: string) => {
    // Allow transitions from these phases
    if (
      (phase === "intro" ||
        phase === "explanation" ||
        phase === "tutorial" ||
        phase === "ended" ||
        phase === "levelPicker" ||
        phase === "gameFinished") &&
      !isTransitioning
    ) {
      sourcePhaseRef.current = phase; // Store source phase
      setIsTransitioning(true);
      window.isTransitioning = true;
      setShowGarage(true);
      pendingPhaseRef.current = targetPhase;
    } else {
      console.warn(`Transition not allowed from ${phase} to ${targetPhase}`);
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
      // Play garage closing sound
      playSound("garageClose");

      // Wait for door to close before changing state
      setTimeout(() => {
        // Handle different transition scenarios based on source and target phases
        switch (pendingPhaseRef.current) {
          case "explanation":
            if (sourcePhaseRef.current === "intro") {
              // From intro to explanation (first level)
              startFromIntro();
            } else if (
              sourcePhaseRef.current === "levelPicker" ||
              sourcePhaseRef.current === "ended"
            ) {
              // From level picker or end screen to explanation
              const pendingLevelId = localStorage.getItem(
                "pendingLevelSelection"
              );
              if (pendingLevelId) {
                const levelId = parseInt(pendingLevelId, 10);
                useGame.getState().levelSelect(levelId);
                localStorage.removeItem("pendingLevelSelection");
              } else {
                // Just transition without changing level
                useGame.setState({ phase: "explanation" });
              }
            }
            break;

          case "tutorial":
            if (sourcePhaseRef.current === "explanation") {
              // From explanation to tutorial
              if (typeof startTutorial === "function") {
                startTutorial();
              } else {
                console.warn("startTutorial function not found in useGame");
                useGame.setState({ phase: "tutorial" });
              }
            }
            break;

          case "ready":
            if (sourcePhaseRef.current === "tutorial") {
              // From tutorial to ready (game starts)
              useGame.setState({ phase: "ready" });
            }
            break;

          case "ended":
            if (sourcePhaseRef.current === "playing") {
              // From playing to ended (game over)
              useGame.setState({ phase: "ended" });
            }
            break;

          case "gameFinished":
            if (sourcePhaseRef.current === "ended") {
              // From playing to gameFinished (game over)
              useGame.setState({ phase: "gameFinished" });
            }
            break;

          case "levelPicker":
            // To level picker
            useGame.setState({ phase: "levelPicker" });
            break;

          default:
            console.warn(
              `Unhandled transition: ${sourcePhaseRef.current} → ${pendingPhaseRef.current}`
            );
        }

        // Only handle animation exit if models are loaded
        if (loaded) {
          // Wait before opening garage door
          const timer = setTimeout(() => {
            // Play sound for door opening
            playSound("garageOpen");

            // Hide the garage door
            setShowGarage(false);

            // Reset transition states after animation is complete
            const cleanupTimer = setTimeout(() => {
              setIsTransitioning(false);
              window.isTransitioning = false;
              pendingPhaseRef.current = null;
              sourcePhaseRef.current = null;
            }, 1200); // Match this to the exit animation duration

            return () => clearTimeout(cleanupTimer);
          }, 500); // Delay before opening door

          return () => clearTimeout(timer);
        }
      }, 1000); // Time for door to close and fully cover screen
    }
  }, [
    loaded,
    showGarage,
    isTransitioning,
    startFromIntro,
    startTutorial,
    playSound,
  ]);

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
            src="/images/garagedeur_a02.png"
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
