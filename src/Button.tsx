import React from "react";
import { motion } from "framer-motion";
import "./style.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  const buttonVariants = {
    initial: {
      x: "-50%",
      scale: 1,
    },
    tap: {
      x: "-50%",
      scale: 0.95,
    },
  };
  return (
    <motion.button
      className="start-button"
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );
}
