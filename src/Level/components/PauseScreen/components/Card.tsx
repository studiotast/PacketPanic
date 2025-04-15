import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../../../style.css";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import { motion } from "framer-motion";
import useGame from "../../../../stores/useGame";

type CardProps = {
  title: string;
  icon: IconDefinition;
  action: string;
};

export default function Card({ title, icon, action }: CardProps) {
  const startFromIntro = useGame((state) => state.startFromIntro);

  const buttonVariants = {
    initial: {
      scale: 1,
    },
    tap: {
      scale: 0.95,
    },
  };
  return (
    <motion.div
      className="card-container"
      variants={buttonVariants}
      initial="initial"
      whileTap="tap"
    >
      <div
        className="card"
        onClick={action === "startFromIntro" ? startFromIntro : undefined}
      >
        <div className="card-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="card-title">{title}</div>
      </div>
    </motion.div>
  );
}
