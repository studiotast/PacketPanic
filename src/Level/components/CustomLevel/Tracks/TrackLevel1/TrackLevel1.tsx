import { RigidBody } from "@react-three/rapier";
import React from "react";
import Accelerator from "../../Accelerator/Accelerator";
import Building from "../../Building/Building";
import Corner from "../../Corner";
import Junction from "../..//Junction";
import Straight from "../../Straight";
import StraightShort from "../../StraightShort";
import useGame from "../../../../../stores/useGame";
import Curve from "../../Curve";
import Platform from "../../Platform";
import BuildingsPlatform from "../../BuildingsPlatfrom";

export default function TrackLevel1() {
  // Get current level configuration from game state
  const currentLevel = useGame((state) => state.currentLevel);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Level 1 Track Layout */}
      {currentLevel.id === 1 && (
        <RigidBody
          type="fixed"
          colliders="trimesh"
          restitution={0.2}
          friction={0}
        >
          <Straight position={[0, 0, 0]} />
          <Straight position={[0, 0, -4]} />
          <Straight position={[0, 0, -8]} />
          <Junction position={[0, 0, -12]} />
          {/* Left */}
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-5, 0, -14]} />
          <StraightShort position={[-6, 0, -17]} />
          <Curve position={[-5, 0, -20]} />
          <Straight position={[-4, 0, -24]} />

          {/* Right */}
          <Straight position={[5, 0, -13]} rotation={[0, Math.PI * 0.5, 0]} />
          <Corner rotation={[0, Math.PI * 1, 0]} position={[9, 0, -14]} />
          <StraightShort position={[10, 0, -17]} />
          <Straight position={[10, 0, -20]} />
        </RigidBody>
      )}

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
      <Platform rotation={[0, Math.PI * 1.5, 0]} position={[0, 0, -13]} />
      {/* <BuildingsPlatform
        rotation={[0, Math.PI * 1.5, 0]}
        position={[0.6, 0, -12]}
      /> */}
    </group>
  );
}
