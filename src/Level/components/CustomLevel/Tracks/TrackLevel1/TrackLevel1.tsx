import { RigidBody } from "@react-three/rapier";
import React from "react";
import Accelerator from "../../Accelerator/Accelerator";
import Building from "../../Building/Building";
import Corner from "../../Corner";
import Junction from "../..//Junction";
import Straight from "../../Straight";
import useGame from "../../../../../stores/useGame";
import StraightShort from "../../StraightShort";
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
          <Straight position={[0, 0, -2]} />
          <Straight position={[0, 0, -4]} />
          <Straight position={[0, 0, -6]} />
          <Junction position={[0, 0, -10]} />
          {/* Left */}
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-5, 0, -12]} />
          <Straight length={0.5} position={[-6, 0, -15]} />
          <Curve position={[-5, 0, -18]} />
          <Straight length={0.5} position={[-4, 0, -21]} />
          <Straight length={0.5} position={[-4, 0, -21]} />

          {/* Right */}
          <Straight position={[5, 0, -11]} rotation={[0, Math.PI * 0.5, 0]} />
          <Corner rotation={[0, Math.PI * 1, 0]} position={[9, 0, -12]} />
          <Straight position={[10, 0, -16]} />
        </RigidBody>
      )}

      {/* Dynamic elements based on level config */}
      {currentLevel.trackConfig.accelerators.map((acc, index) => (
        <Accelerator
          key={`accelerator-${index}`}
          position={acc.position.map((value) => value * 2)} // Verdubbel de positie
          colors={acc.colors}
        />
      ))}

      {currentLevel.trackConfig.buildings.map((building, index) => (
        <Building
          key={`building-${index}`}
          position={building.position.map((value) => value * 2)} // Verdubbel de positie
          colors={building.colors}
        />
      ))}
      <Platform rotation={[0, Math.PI * 1.5, 0]} position={[0.6, 0, -12]} />
      <BuildingsPlatform
        rotation={[0, Math.PI * 1.5, 0]}
        position={[0.6, 0, -12]}
      />

      {/* <Building
      position={currentLevel.trackConfig.spawner.position.map((value) => value * 2)} // Verdubbel de positie
      type="spawner"
    /> */}
    </group>
  );
}
