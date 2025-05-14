// SpeechBubble.tsx
import { motion } from "framer-motion";
import styles from "../Explanation.module.scss";

interface SpeechBubbleProps {
  text: string;
}

export default function SpeechBubble({ text }: SpeechBubbleProps) {
  // Framer Motion variants for animations
  const bubbleVariants = {
    hidden: { scale: 1.15 }, // Start position (invisible and smaller)
    visible: {
      scale: 1, // End position (fully visible and normal size)
    },
    exit: { scale: 0.8 }, // Exit animation
  };

  return (
    <div className={styles.speechBubble}>
      <motion.div
        variants={bubbleVariants} // Use animation variants
        initial="hidden" // Start with "hidden" variant
        animate="visible" // Animate to "visible" variant
        exit="exit" // Optional exit animation
        className={styles.speechBubbleContent}
      >
        <p className={styles.speechBubbleText}>{text}</p>
      </motion.div>
    </div>
  );
}
