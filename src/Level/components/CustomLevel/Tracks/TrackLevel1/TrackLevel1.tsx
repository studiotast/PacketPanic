import { RigidBody } from "@react-three/rapier";
import React from "react";
import Accelerator from "../../Accelerator/Accelerator";
import Building from "../../Building";
import Corner from "../../Corner";
import Junction from "../..//Junction";
import Straight from "../../Straight";
import useGame from "../../../../../stores/useGame";
import StraightShort from "../../StraightShort";
import Curve from "../../Curve";

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
          <Straight position={[0, 0, 0]} length={2} />
          <Junction position={[0, 0, -3]} />
          {/* Left */}
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-2.5, 0, -4]} />
          <Straight length={0.5} position={[-3, 0, -5.5]} />
          <Curve position={[-2.5, 0, -7]} />
          <Straight length={0.5} position={[-2, 0, -8.5]} />

          {/* Right */}
          <Straight
            position={[2.5, 0, -3.5]}
            rotation={[0, Math.PI * 0.5, 0]}
          />
          <Corner rotation={[0, Math.PI * 1, 0]} position={[4.5, 0, -4]} />
          <Straight position={[5, 0, -6]} />
        </RigidBody>
      )}

      {/* Dynamic elements based on level config */}
      {currentLevel.trackConfig.accelerators.map((acc, index) => (
        <Accelerator
          key={`accelerator-${index}`}
          position={acc.position}
          colors={acc.colors}
        />
      ))}

      {currentLevel.trackConfig.buildings.map((building, index) => (
        <Building
          key={`building-${index}`}
          position={building.position}
          colors={building.colors}
        />
      ))}

      {/* <Building
        position={currentLevel.trackConfig.spawner.position}
        type="spawner"
      /> */}
    </group>
  );
}
