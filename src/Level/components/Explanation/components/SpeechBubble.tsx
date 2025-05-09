import { motion } from "framer-motion";

export default function SpeechBubble({ text }: { text: string }) {
  // Framer Motion Variants voor animaties
  const bubbleVariants = {
    hidden: { scale: 1.15 }, // Startpositie (onzichtbaar en kleiner)
    visible: {
      scale: 1, // Eindpositie (volledig zichtbaar en normale grootte)
    },
    exit: { scale: 0.8 }, // Exit-animatie
  };

  return (
    <div className="speech-bubble">
      <motion.div
        // style={{ transformOrigin: "left bottom" }} // Zet de origin linksonder
        variants={bubbleVariants} // Gebruik de animatie-varianten
        initial="hidden" // Start met de "hidden"-variant
        animate="visible" // Animeer naar de "visible"-variant
        exit="exit" // Optionele exit-animatie
        className="speech-bubble-content"
      >
        <p className="speech-bubble-text">{text}</p>
      </motion.div>
    </div>
  );
}
