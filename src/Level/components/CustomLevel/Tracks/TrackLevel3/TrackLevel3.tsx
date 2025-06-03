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
import PlatformLevel3 from "./PlatformLevel3";

export default function TrackLevel3() {
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
        <StraightShort position={[0, 0, 1]} />
        <Straight position={[0, 0, -2]} />
        <Straight position={[0, 0, -6]} />
        <Straight position={[0, 0, -10]} />
        <Junction position={[0, 0, -14]} />
        {/* Left */}
        <StraightShort
          rotation={[0, Math.PI * 0.5, 0]}
          position={[-4, 0, -15]}
        />
        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-7, 0, -16]} />
        <StraightShort position={[-8, 0, -19]} />
        <Junction position={[-8, 0, -22]} />

        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-13, 0, -24]} />
        <StraightShort position={[-14, 0, -27]} />

        <Corner rotation={[0, Math.PI, 0]} position={[-3, 0, -24]} />
        <Curve
          scale={[-1, 1, 1]}
          rotation={[0, Math.PI, 0]}
          position={[-3, 0, -28]}
        />
        <Straight position={[-4, 0, -32]} />

        {/* Right */}
        <Straight rotation={[0, Math.PI * 0.5, 0]} position={[5, 0, -15]} />
        <Corner rotation={[0, Math.PI, 0]} position={[9, 0, -16]} />
        <Junction position={[10, 0, -20]} />

        <Corner rotation={[0, Math.PI * 0.5, 0]} position={[5, 0, -22]} />
        <StraightShort position={[4, 0, -25]} />
        <Curve rotation={[0, Math.PI, 0]} position={[5, 0, -28]} />
        <Straight position={[6, 0, -32]} />

        <Corner rotation={[0, Math.PI, 0]} position={[15, 0, -22]} />
        <StraightShort position={[16, 0, -25]} />
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

      <PlatformLevel3 rotation={[0, Math.PI * 1.5, 0]} position={[0, 0, -17]} />
      {/* <BuildingsPlatform
        rotation={[0, Math.PI * 1.5, 0]}
        position={[0.6, 0, -12]}
      /> */}
    </group>
  );
}
