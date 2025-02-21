import { RigidBody } from "@react-three/rapier";
import React from "react";
import TrackStraight from "./Straight";
import TrackToRight from "./TrackToRight";
import TrackToLeft from "./Junction";
import Building from "./Building";
import Bar from "./Bar";
import Accelerator from "./Accelerator";
import Junction from "./Junction";
import Straight from "./Straight";
import { useGLTF } from "@react-three/drei";
import Corner from "./Corner";

export default function Track({}) {
  const { scene: straightModel } = useGLTF(
    "/assets/models/tube_straight_a02.glb"
  );

  const { scene: cornerModel } = useGLTF("/assets/models/tube_corner_a02.glb");
  const { scene: junctionModel } = useGLTF(
    "/assets/models/tube_junction_a02.glb"
  );

  return (
    <group rotation={[-0.05, 0, 0]}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.2}
        friction={0}
      >
        <Straight position={[0, 0, 1]} model={straightModel} length={3} />
        <Straight
          rotation={[0, Math.PI * 0.5, 0]}
          position={[1, 0, -1]}
          model={straightModel}
        />
        <Straight
          rotation={[0, Math.PI * 0.5, 0]}
          position={[-1, 0, -1]}
          model={straightModel}
        />
        <Junction model={junctionModel} position={[0, 0, -1]} />
        <Corner
          model={cornerModel}
          rotation={[0, Math.PI * 0.5, 0]}
          position={[-2, 0, -1]}
        />
        <Straight
          rotation={[0, 0, 0]}
          position={[-2, 0, -2]}
          model={straightModel}
        />
        <Corner
          model={cornerModel}
          rotation={[0, Math.PI * 1, 0]}
          position={[2, 0, -1]}
        />
        <Straight
          rotation={[0, 0, 0]}
          position={[2, 0, -2]}
          model={straightModel}
        />
        {/* <Splitter /> */}
        {/* <Bar position={[0, -0.2, -7]} /> */}
        <TrackToRight length={2} />
      </RigidBody>

      <Accelerator />
      <Building />
    </group>
  );
}
