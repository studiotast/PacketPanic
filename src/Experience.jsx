import Lights from "./Lights.jsx";
import Level from "./Level/Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";
import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import React, { useRef } from "react";
import Balls from "./Level/components/CustomLevel/Balls";
import { Perf } from "r3f-perf";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  const ballRef = useRef();

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <color args={["#bdedfc"]} attach="background" />
      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
        <Balls ref={ballRef} />
      </Physics>
    </>
  );
}
