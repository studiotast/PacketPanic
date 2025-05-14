import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import Button from "./Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import "../../style.css";

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
        duration: 1, // Duur van de animatie
        ease: "easeInOut",
        // delay: 0.2, // Vertraging van 1 seconde
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
      <div className="pause-content">
        <h2>Over Packet Panic</h2>
        <motion.div
          className="intro-text-container"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textContainer}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="about-text-paragraph">
              {paragraph}
            </p>
          ))}
        </motion.div>
        <Button
          className="pause-button"
          onClick={() => {
            useGame.setState({ phase: "pause" });
          }}
          shadowColor="#dc9329"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Terug
        </Button>
      </div>
    </Layout>
  );
}
