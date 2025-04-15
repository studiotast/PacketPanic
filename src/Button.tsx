import React from "react";
import { motion } from "framer-motion";
import "./style.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
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
      className={className}
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );
}
