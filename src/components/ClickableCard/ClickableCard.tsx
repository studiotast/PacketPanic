import React from "react";
import { motion } from "framer-motion";
import useGame from "../../stores/useGame";
import styles from "./ClickableCard.module.scss";

type ClickableCardProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  [key: string]: any;
};

export default function ClickableCard({
  onClick,
  children,
  className = "",
  style = {},
  wrapperClassName = "",
  ...props
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
    if (onClick) {
      playSound("button");
      onClick();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${wrapperClassName}`}
      onClick={handleClick}
      style={style}
      {...props}
    >
      <motion.div
        className={`${styles.card} ${className}`}
        variants={buttonVariants}
        initial="initial"
        whileTap="tap"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={style}
      >
        {children}
      </motion.div>
      <div className={styles.shadow}></div>
    </div>
  );
}
