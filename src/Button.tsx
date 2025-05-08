import { motion } from "framer-motion";
import React from "react";
import useGame from "./stores/useGame";
import "./style.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  responsive?: boolean;
  color?: "yellow" | "blue" | "red" | "purple" | "grey";
};

export default function Button({
  children,
  onClick,
  style,
  responsive,
  color = "yellow",
}: ButtonProps) {
  const playSound = useGame((state) => state.playSound);

  const buttonVariants = {
    initial: {
      y: "-18%",
    },
    tap: {
      y: 0,
    },
  };

  const handleClick = () => {
    playSound("button");
    onClick();
  };

  return (
    <div
      className={`button-wrapper ${color} ${responsive ? "responsive" : ""}`}
      onClick={handleClick}
    >
      <motion.div
        className="button"
        variants={buttonVariants}
        initial="initial"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          ...style,
        }}
      >
        {children}
      </motion.div>
      <div className="button-shadow" />
    </div>
  );
}
