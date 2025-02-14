import { RigidBody } from "@react-three/rapier";
import React from "react";
import TrackStraight from "./TrackStraight";
import TrackToRight from "./TrackToRight";
import TrackToLeft from "./TrackToLeft";
import Building from "./Building";

export default function Track({}) {
  return (
    <group rotation={[-0.1, 0, 0]}>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <TrackStraight length={2} />
        <TrackToRight length={2} />
        <TrackToLeft length={2} />
      </RigidBody>
      <Building />
    </group>
  );
}
