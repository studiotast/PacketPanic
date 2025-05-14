import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";
import useGame from "../../stores/useGame";

type ButtonProps = {
  onClick: () => void;
  color?: string;
  children: React.ReactNode;
  responsive?: boolean;
  [key: string]: any;
};

export default function Button({
  onClick,
  color = "yellow",
  children,
  responsive = false,
  ...props
}: ButtonProps) {
  const playSound = useGame((state) => state.playSound);

  const buttonVariants = {
    hover: {
      y: "-24%",
    },
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
      className={`${styles.buttonWrapper} ${styles[color]} ${
        responsive ? styles.responsive : ""
      }`}
      onClick={handleClick}
      {...props}
    >
      <motion.div
        className={styles.button}
        variants={buttonVariants}
        initial="initial"
        whileTap="tap"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.div>
      <div className={styles.buttonShadow} />
    </div>
  );
}
