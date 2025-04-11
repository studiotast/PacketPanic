import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../../../style.css";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import { motion } from "framer-motion";

type CardProps = {
  title: string;
  icon: IconDefinition;
  action: () => void;
};

export default function Card({ title, icon, action }: CardProps) {
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
      <div className="card" onClick={action}>
        <div className="card-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="card-title">{title}</div>
      </div>
    </motion.div>
  );
}
