import React, { useEffect } from "react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import Layout from "../../Layout";
import Button from "../Button/Button";
import { getAllNewsArticles } from "../../utils/levelsData";
import ClickableCard from "../ClickableCard/ClickableCard";
import styles from "./EndScreen.module.scss";
import LeftCornerPiece from "../CornerPiece/LeftCornerPiece";
import RightCornerPiece from "../CornerPiece/RightCornerPiece";
import useGame from "../../stores/useGame";
import { useTranslation } from "react-i18next";
import { getTranslated, TranslatedString } from "../../utils/getTranslated";

// Define interfaces for the news article
type NewsArticle = {
  title: TranslatedString;
  content: TranslatedString;
  imageUrl: string;
  readMoreLink: string;
  date: string;
};

export default function EndScreen(): React.ReactElement {
  const { t } = useTranslation();
  const newsArticles = getAllNewsArticles();

  const playSound = useGame((state) => state.playSound);
  const isMuted = useGame((state) => state.isMuted);
  const stopSound = useGame((state) => state.stopSound);

  const completeRestart = useGame((state) => state.completeRestart);

  useEffect(() => {
    // Play menu sound when the component mounts
    if (!isMuted) {
      playSound("menu");
    }

    // Return cleanup function to stop sound on unmount
    return () => {
      stopSound("menu");
    };
  }, [playSound, stopSound, isMuted]);

  const handleRestart = () => {
    playSound("button");
    completeRestart();
    window.location.pathname = "/";
  };

  return (
    <Layout>
      <div className={styles.endScreen}>
        <h1>{t("end-screen.title")}</h1>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>{t("end-screen.paragraph1")}</p>
            <p>{t("end-screen.paragraph2")}</p>
            <p>{t("end-screen.paragraph3")}</p>
            <p>{t("end-screen.paragraph4")}</p>
          </div>
          <div className={styles.blueCard}>
            <h2>{t("end-screen.what-to-do.title")}</h2>
            <span>
              <p className={styles.subtitle}>
                {t("end-screen.what-to-do.check-rpki.title")}
              </p>
              <p>
                {t("end-screen.go-to")}{" "}
                <a target="_blank" href="https://internet.nl">
                  www.internet.nl
                </a>{" "}
                {t("end-screen.what-to-do.check-rpki.description")}
              </p>
            </span>
            <span>
              <p className={styles.subtitle}>
                {t("end-screen.what-to-do.share-knowledge.title")}
              </p>
              <p>{t("end-screen.what-to-do.share-knowledge.description")}</p>
            </span>
            <span>
              <p className={styles.subtitle}>
                {t("end-screen.what-to-do.deepen-knowledge.title")}
              </p>
              <p>{t("end-screen.what-to-do.deepen-knowledge.description")}</p>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <h2>{t("end-screen.news-review-title")}</h2>
          <div className={styles.news}>
            {newsArticles.map((article: NewsArticle, idx: number) => (
              <ClickableCard
                className={styles.newsArticle}
                onClick={() => window.open(article.readMoreLink, "_blank")}
                key={idx}
                wrapperClassName="newsArticleWrapper"
              >
                <div className={styles.image}>
                  <img
                    src={article.imageUrl}
                    alt={getTranslated(article.title)}
                  />
                </div>
                <h3>{getTranslated(article.title)}</h3>
              </ClickableCard>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button onClick={handleRestart}>{t("end-screen.play-again")}</Button>
          <Button
            color="blue"
            onClick={() => window.open("https://hoehetnetwerkt.nl", "_blank")}
          >
            {t("left-corner-piece.view-how-the-net-works")}
          </Button>
        </div>
      </div>
      <LeftCornerPiece />
      <RightCornerPiece />
    </Layout>
  );
}
