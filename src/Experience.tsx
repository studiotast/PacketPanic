import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import Balls from "./Level/components/CustomLevel/Balls";
import Level from "./Level/Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const updateTimer = useGame((state) => state.updateTimer);
  const phase = useGame((state) => state.phase);
  const isPaused = useGame((state) => state.isPaused);
  const playSound = useGame((state) => state.playSound);
  const stopSound = useGame((state) => state.stopSound);
  const isMuted = useGame((state) => state.isMuted);
  const ballRef = useRef(null);

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
    if (phase === "explanation" || phase === "tutorial" || phase === "ended") {
      // Play menu music (Howler.js handles looping automatically based on sound config)
      if (!isMuted) {
        playSound("menu");
      }
    } else if (phase === "playing") {
      // Playing phase - start level music
      if (!isPaused && !isMuted) {
        playSound("level");
      }
    }

    // Update the previous phase ref
    prevPhaseRef.current = phase;
  }, [phase, isPaused, playSound, stopSound, isMuted]);

  // set camera position and look at
  const currentLevel = useGame((state) => state.currentLevel);
  const controls = useThree((state) => state.controls);
  const { camera } = useThree();

  useEffect(() => {
    if (currentLevel?.trackConfig) {
      const { cameraStartPosition, cameraStartLookAt } =
        currentLevel.trackConfig;

      // Set camera position
      camera.position.set(
        cameraStartPosition[0],
        cameraStartPosition[1],
        cameraStartPosition[2]
      );

      // Set OrbitControls target
      if (controls) {
        controls.target.set(...cameraStartLookAt);
        controls.update();
      }
    }
  }, [camera, controls, currentLevel]);

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight intensity={1.5} position={[10, 10, 10]} />
      {/* <Perf position="bottom-left" /> */}
      <OrbitControls makeDefault />
      <color args={["#A2BDFC"]} attach="background" />
      <Physics
        gravity={[0, -10, -0.2]}
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
        <Level />
        {player && <Player />}
        <Balls ref={ballRef} />
      </Physics>
    </>
  );
}
