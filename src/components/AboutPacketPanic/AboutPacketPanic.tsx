import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../../components/Button/Button";
import Layout from "../../Layout";
import styles from "./AboutPacketPanic.module.scss";
import useGame from "../../stores/useGame";

export default function AboutPacketPanic() {
  const paragraphs = [
    "Packet Panic is een educatief spel dat is ontwikkeld door Studio Tast SIDN-call 'Internet in beeld' om de onderliggende infrastructuur van het internet begrijpelijk uit te leggen.",
    "Packet Panic focust op de gevaren van BGP-hijacking: het manipuleren en onderscheppen van internetverkeer door cybercriminelen. Het BGP is een essentieel, maar kwetsbaar onderdeel van het internet. Het internet is ontwikkeld door een groep onderzoekers die op basis van vertrouwen met elkaar samenwerkten. Het BGP gaat nog steeds uit van datzelfde onderlinge vertrouwen. Er zijn manieren om het BGP minder kwetsbaar te maken. Maar die zijn alleen effectief als die breed geimplementeerd worden. ",
    "Het doel van Packet Panic is om meer mensen bewust te maken van de kwetsbaarheden van het Border Gateway Protocol (BGP). Via het spel krijgen spelers een inzicht in hoe BGP-hijacking werkt, wat de gevaren zijn en welke oplossingen er beschikbaar zijn.",
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

  return (
    <Layout>
      <div className={styles.pauseContent}>
        <h2 className={styles.title}>Over Packet Panic</h2>
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
        <Button
          onClick={() => {
            useGame.setState({ phase: "playing" });
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Terug
        </Button>
      </div>
    </Layout>
  );
}
