import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../../components/Button/Button";
import Layout from "../../Layout";
import styles from "./AboutPacketPanic.module.scss";
import useGame from "../../stores/useGame";
import { useTranslation } from "react-i18next";

export default function AboutPacketPanic() {
  const { t } = useTranslation();
  const playSound = useGame((state) => state.playSound);
  const prevPhase = useGame((state) => state.prevPhase);

  const paragraphs = [
    t('about-packet-panic.paragraph1'),
    t('about-packet-panic.paragraph2'),
    t('about-packet-panic.paragraph3'),
  ];

  const textContainer = {
    initial: { opacity: 0, y: "100%" },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const handleBackClick = () => {
    playSound("button");

    // Go back to the previous phase, or default to intro if no prevPhase is set
    const targetPhase = prevPhase || "playing";
    useGame.setState({
      phase: targetPhase,
      prevPhase: null, // Clear the prevPhase
    });
  };

  return (
    <Layout>
      <div className={styles.pauseContent}>
        <h2 className={styles.title}>{t('about-packet-panic.title')}</h2>
        <motion.div
          className={styles.textContainer}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textContainer}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.textParagraph}>
              {paragraph}
            </p>
          ))}
        </motion.div>
        <Button onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
          {t('global.back')}
        </Button>
      </div>
    </Layout>
  );
}
