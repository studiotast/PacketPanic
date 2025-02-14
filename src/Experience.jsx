import Lights from "./Lights.jsx";
import Level from "./Level/Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";
import { OrbitControls } from "@react-three/drei";
import Ball from "./Level/components/CustomLevel/Ball";
import { useControls, button } from "leva";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  const { clickMe } = useControls({
    clickMe: button(() => {
      console.log("clicked");
    }),
  });
  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#bdedfc"]} attach="background" />
      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
        <Ball />
      </Physics>
    </>
  );
}
