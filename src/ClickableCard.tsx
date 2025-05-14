import { motion } from "framer-motion";
import React from "react";
import useGame from "./stores/useGame";
import "./style.css";

type ClickableCardProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  className?: string;
};

export default function ClickableCard({
  children,
  onClick,
  style,
  className,
  wrapperClassName,
}: ClickableCardProps) {
  const playSound = useGame((state) => state.playSound);

  const buttonVariants = {
    hover: {
      y: "-8%",
    },
    initial: {
      y: "-6%",
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
      className={`clickable-card-wrapper ${wrapperClassName || ""}`}
      onClick={handleClick}
      style={{
        ...style,
      }}
    >
      <motion.div
        className={`clickable-card ${className || ""}`}
        variants={buttonVariants}
        initial="initial"
        whileTap="tap"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          ...style,
        }}
      >
        {children}
      </motion.div>
      <div className="clickable-card-shadow" />
    </div>
  );
}
