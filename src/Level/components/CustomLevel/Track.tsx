import { RigidBody } from "@react-three/rapier";
import React from "react";
import Accelerator from "./Accelerator/Accelerator";
import Building from "./Building";
import Corner from "./Corner";
import Junction from "./Junction";
import Straight from "./Straight";
import useGame from "../../../stores/useGame";

export default function Track() {
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
          <Straight position={[0, 0, 0]} length={3} />
          {/* <Straight rotation={[0, Math.PI * 0.5, 0]} position={[1, 0, -1]} />
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[-1, 0, -1]} />
          <Junction position={[0, 0, -1]} />
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-2, 0, -1]} />
          <Straight rotation={[0, 0, 0]} position={[-2, 0, -2]} />
          <Corner rotation={[0, Math.PI * 1, 0]} position={[2, 0, -1]} />
          <Straight rotation={[0, 0, 0]} position={[2, 0, -2]} /> */}
        </RigidBody>
      )}

      {/* Level 2 Track Layout - More complex with triple junction */}
      {currentLevel.id === 2 && (
        <RigidBody
          type="fixed"
          colliders="trimesh"
          restitution={0.2}
          friction={0}
        >
          {/* Main path from spawner to first junction */}
          <Straight position={[0, 0, 1]} length={3} />
          {/* First junction */}
          <Junction position={[0, 0, -1]} />
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[1, 0, -1]} />
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[-1, 0, -1]} />
          {/* Right branch */}
          <Corner rotation={[0, Math.PI * 1, 0]} position={[2, 0, -1]} />
          <Straight
            rotation={[0, 0, 0]}
            position={[2, 0, -2.25]}
            length={1.5}
          />
          <Junction position={[2, 0, -3.5]} /> {/* Second junction */}
          {/* <Straight rotation={[0, 0, 0]} position={[2, 0, -4.5]} />{" "} */}
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[1, 0, -3.5]} />
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[3, 0, -3.5]} />
          <Corner rotation={[0, Math.PI * 1, 0]} position={[4, 0, -3.5]} />
          <Straight rotation={[0, 0, 0]} position={[4, 0, -4.5]} />
          {/* Left branch */}
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-2, 0, -1]} />
          <Straight rotation={[0, 0, 0]} position={[-2, 0, -2.25]} length={2} />
          <Junction position={[-2, 0, -3.5]} /> Third junction
          {/* <Straight rotation={[0, 0, 0]} position={[-2, 0, -4.5]} /> */}
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[-3, 0, -3.5]} />
          <Straight rotation={[0, Math.PI * 0.5, 0]} position={[-1, 0, -3.5]} />
          <Corner rotation={[0, Math.PI * 0.5, 0]} position={[-4, 0, -3.5]} />
          <Straight rotation={[0, 0, 0]} position={[-4, 0, -4.5]} />
          {/* Central connection between second and third junctions */}
          <Junction rotation={[0, 3.15, 0]} position={[0, 0, -3.5]} />
          {/* Central path to destination */}
          <Straight rotation={[0, 0, 0]} position={[0, 0, -4.5]} />
        </RigidBody>
      )}

      {/* Dynamic elements based on level config */}
      {/* {currentLevel.trackConfig.accelerators.map((acc, index) => (
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

      <Building
        position={currentLevel.trackConfig.spawner.position}
        type="spawner"
      /> */}
    </group>
  );
}
