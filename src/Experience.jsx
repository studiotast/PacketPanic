import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useRef } from "react";
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
  const ballRef = useRef();

  const { player } = useControls({
    player: false,
  });

  useFrame((state, delta) => {
    if (phase === "playing" && !isPaused) {
      updateTimer(delta);
    }
  });
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <color args={["#bdedfc"]} attach="background" />
      <Physics
        debug={false}
        paused={
          isPaused ||
          phase === "ended" ||
          phase === "ready" ||
          phase === "levelComplete"
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
