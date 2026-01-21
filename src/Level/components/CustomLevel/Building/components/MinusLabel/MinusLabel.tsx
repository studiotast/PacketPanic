import useGame from "@stores/useGame";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { NotificationsData } from "@utils/levelsData";
import { userNamesList } from "@utils/userNamesList";
import styles from "./MinusLabel.module.scss";
import { getColor } from "@/utils/getColor";
import { useTranslation } from "react-i18next";
import { getTranslated } from "@/utils/getTranslated";

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
  isWarning?: boolean; // Optional warning prop
  warningsExceeded?: boolean; // Optional warningsExceeded prop
  color?: string; // Optional color prop
}

export default function MinusLabel({
  id,
  onRemove,
  info,
  isWarning,
  warningsExceeded,
  color,
}: MinusLabelProps) {
  const { t } = useTranslation();
  const groupRef = useRef<THREE.Group>(null); // Ref for the group
  const currentLevel = useGame((state) => state.currentLevel); // Get the current level from the store
  const notifications = currentLevel?.notifications; // Get notifications from the current level
  const warnings = currentLevel?.warnings; // Get warnings from the current level
  const seriousNotifications = currentLevel?.seriousNotifications; // Get serious warnings from the current level
  const [notification, setNotification] = useState<NotificationsData | null>(
    null
  ); // State for the notification
  const [userName, setUserName] = useState<string | null>(null); // State for the username

  useEffect(() => {
    if (notifications && isWarning === false && info.minusScoreNumber <= 5) {
      setNotification(
        notifications[Math.floor(Math.random() * notifications.length)]
      );
    } else if (warnings && isWarning === true && warningsExceeded === false) {
      setNotification(warnings[Math.floor(Math.random() * warnings.length)]);
    } else if (
      seriousNotifications &&
      warningsExceeded === true &&
      info.minusScoreNumber > 5
    ) {
      setNotification(
        seriousNotifications[
          Math.floor(Math.random() * seriousNotifications.length)
        ]
      );
    }
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
      <Html name={id} center wrapperClass={styles.buildingLabelMinus}>
        <div className={styles.wrapper}>
          <div
            style={{ color: getColor(color ? color : "blue") }}
            className={styles.label}
          >
            {isWarning ? <b>!</b> : <b>- {info?.minusScoreNumber}</b>}
          </div>
          <div className={styles.comment}>
            <p style={{ color: getColor(color ? color : "blue") }}>
              {userName}
            </p>
            <p>{notification?.text ? getTranslated(notification.text) : ""}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}
