import { RigidBody } from "@react-three/rapier";
import React from "react";
import useGame from "../../../../../stores/useGame";
import Junction from "../..//Junction";
import Accelerator from "../../Accelerator/Accelerator";
import Building from "../../Building/Building";
import Corner from "../../Corner";
import Curve from "../../Curve";
import Straight from "../../Straight";
import StraightShort from "../../StraightShort";
import PlatformLevel2 from "./PlatformLevel2";

export default function TrackLevel2() {
  const currentLevel = useGame((state) => state.currentLevel);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Level 1 Track Layout */}
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.2}
        friction={0}
      >
        <StraightShort position={[0, 0, 2]} />
        <Straight position={[0, 0, -1]} />
        <Junction position={[0, 0, -5]} />
        {/* Left */}
        <StraightShort
          rotation={[0, Math.PI * 0.5, 0]}
          position={[-4, 0, -6]}
        />
        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-7, 0, -7]} />
        <Curve
          scale={[-1, 1, 1]}
          rotation={[0, Math.PI, 0]}
          position={[-9, 0, -11]}
        />
        <Straight position={[-10, 0, -15]} />
        <Straight position={[-10, 0, -19]} />
        {/* Right */}
        <Corner rotation={[0, Math.PI * 1, 0]} position={[5, 0, -7]} />
        <Junction position={[6, 0, -11]} />
        {/* Left */}
        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[1, 0, -13]} />
        <Curve
          scale={[-1, 1, 1]}
          rotation={[0, Math.PI, 0]}
          position={[-1, 0, -17]}
        />
        <StraightShort rotation={[0, 0, 0]} position={[-2, 0, -20]} />
        <Straight position={[-2, 0, -23]} />
        {/* Right */}
        <Corner rotation={[0, Math.PI * 1, 0]} position={[11, 0, -13]} />{" "}
        <Curve
          rotation={[0, Math.PI, 0]}
          position={[11, 0, -17]}
          scale={[-1, 1, 1]}
        />
        <Straight position={[10, 0, -21]} />
      </RigidBody>

      {/* Dynamic elements based on level config */}
      {currentLevel.trackConfig.accelerators.map((acc, index) => (
        <Accelerator
          key={`accelerator-${index}`}
          position={acc.position.map((value) => value)}
          colors={acc.colors}
        />
      ))}

      {currentLevel.trackConfig.buildings.map((building, index) => (
        <Building
          key={`building-${index}`}
          name={building.name}
          position={building.position.map((value) => value)}
          colors={building.colors}
        />
      ))}

      <PlatformLevel2 rotation={[0, Math.PI * 1.5, 0]} position={[0, 0, -12]} />
      {/* <BuildingsPlatform
        rotation={[0, Math.PI * 1.5, 0]}
        position={[0.6, 0, -12]}
      /> */}
    </group>
  );
}
