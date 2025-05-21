import useGame from "@stores/useGame";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { NotificationsData } from "@utils/levelsData";
import { userNamesList } from "@utils/userNamesList";

export type MinusLabelInfo = {
  isMistakeBadActor: boolean;
  isMaliciousBadActor: boolean;
  minusScoreNumber: number;
};
interface MinusLabelProps {
  id: string;
  onRemove: (id: string) => void; // Callback om het label te verwijderen
  number?: number; // Optional number prop
  info: MinusLabelInfo; // Optional info prop
}

export default function MinusLabel({ id, onRemove, info }: MinusLabelProps) {
  const groupRef = useRef<THREE.Group>(null); // Ref for the group
  const currentLevel = useGame((state) => state.currentLevel); // Get the current level from the store
  const notifications = currentLevel?.notifications; // Get notifications from the current level
  const [notification, setNotification] = useState<NotificationsData | null>(
    null
  ); // State for the notification
  const [userName, setUserName] = useState<string | null>(null); // State for the username

  useEffect(() => {
    if (notifications)
      setNotification(
        notifications[Math.floor(Math.random() * notifications.length)]
      );
    setUserName(
      userNamesList[Math.floor(Math.random() * userNamesList.length)]
    ); // Set a random username from the list
  }, [notifications]); // Set a random notification from the list

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y += 5 * delta;
    }
  });

  useEffect(() => {
    // Verwijder het label na 1 seconde
    const timeout = setTimeout(() => {
      onRemove(id);
    }, 2200);

    return () => clearTimeout(timeout); // Opruimen bij unmount
  }, [id, onRemove]);

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <Html name={id} center wrapperClass="building-label-minus">
        <div className="wrapper">
          <div className="label">
            <b>- {info?.minusScoreNumber}</b>
          </div>
          <div className="comment">
            <p>{userName}</p>
            <p>{notification?.text}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}
