import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import Balls from "./Level/components/CustomLevel/Balls";
import Level from "./Level/Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  const updateTimer = useGame((state) => state.updateTimer);
  const phase = useGame((state) => state.phase);
  const isPaused = useGame((state) => state.isPaused);
  const playSound = useGame((state) => state.playSound);
  const stopSound = useGame((state) => state.stopSound);
  const isMuted = useGame((state) => state.isMuted);
  const ballRef = useRef();

  // Keep track of previous phase to detect changes
  const prevPhaseRef = useRef(phase);

  const { player } = useControls({
    player: false,
  });

  useFrame((state, delta) => {
    // Handle timer update
    if (phase === "playing" && !isPaused) {
      updateTimer(delta);
    }
  });

  useEffect(() => {
    // Stop all game sounds when transitioning to a new phase
    stopSound("menu");
    stopSound("level");

    // Start appropriate sounds for the new phase
    if (phase === "playing" || phase === "explanation") {
      if (!isPaused && !isMuted) {
        // Playing phase - start level music
        const levelSound = playSound("level");
        if (levelSound) levelSound.loop = true;
      }
    }

    // Update the previous phase ref
    prevPhaseRef.current = phase;
  }, [phase, isPaused, playSound, stopSound, isMuted]);

  return (
    <>
      <ambientLight intensity={1.6} /> // Omgevingslicht voor algemene
      helderheid
      <directionalLight intensity={1.5} position={[10, 10, 10]} castShadow />
      <pointLight intensity={1} position={[0, 5, 0]} />
      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />
      <color args={["#bdedfc"]} attach="background" />
      <Physics
        gravity={[0, -5, -0.2]}
        debug={false}
        paused={
          isPaused ||
          phase === "ended" ||
          phase === "ready" ||
          phase === "levelComplete" ||
          phase === "explanation"
        }
      >
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        {player && <Player />}
        <Balls ref={ballRef} />
      </Physics>
    </>
  );
}
